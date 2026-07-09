import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

const MODEL_ROOT = "/models/yam-ultra-gripper/assets";

const canvas = document.querySelector("#robot-canvas");
const loaderEl = document.querySelector("#loader");
const loaderDetail = document.querySelector("#loader-detail");
const labelsEl = document.querySelector("#labels");
const phaseButtons = [...document.querySelectorAll(".phase-tab")];
const playToggle = document.querySelector("#play-toggle");
const resetViewButton = document.querySelector("#reset-view");

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xf6f3ee, 2.0, 5.4);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.01, 10);
camera.up.set(0, 0, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.rotateSpeed = 0.55;
controls.zoomSpeed = 0.75;
controls.panSpeed = 0.55;
controls.minDistance = 0.18;
controls.maxDistance = 2.8;
controls.screenSpacePanning = true;

const robotRoot = new THREE.Group();
robotRoot.name = "yam-ultra-gripper";
robotRoot.rotation.z = Math.PI / 2;
scene.add(robotRoot);

const grid = new THREE.GridHelper(1.35, 27, 0xa9aaa4, 0xd9d5cf);
grid.rotation.x = Math.PI / 2;
grid.material.transparent = true;
grid.material.opacity = 0.56;
scene.add(grid);

scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b2a7, 2.7));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
keyLight.position.set(0.44, -0.55, 0.82);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x9ad7d3, 1.15);
rimLight.position.set(-0.48, 0.42, 0.38);
scene.add(rimLight);

const fillLight = new THREE.PointLight(0xffc489, 0.7, 1.8);
fillLight.position.set(0.25, 0.32, 0.22);
scene.add(fillLight);

const manager = new THREE.LoadingManager();
const stlLoader = new STLLoader(manager);
const clock = new THREE.Clock();

const state = {
  ready: false,
  autoPlay: true,
  userCamera: false,
  time: 0,
  duration: 9,
  phase: "assembled",
};

const cameraViews = {
  assembledPos: new THREE.Vector3(0.74, -0.88, 0.52),
  assembledTarget: new THREE.Vector3(0, 0, 0.12),
  explodedPos: new THREE.Vector3(0.9, -1.02, 0.66),
  explodedTarget: new THREE.Vector3(0, 0, 0.12),
};

const parts = [
  {
    key: "ultra_base",
    file: "ultra_base.stl",
    label: "ultra base",
    color: 0x5b2a84,
    explode: [-0.09, -0.04, -0.01],
  },
  {
    key: "link1",
    file: "link1.stl",
    label: "link1",
    color: 0xb97151,
    explode: [-0.045, -0.02, 0.045],
  },
  {
    key: "link2",
    file: "link2.stl",
    label: "link2",
    color: 0x007099,
    explode: [0.0, 0.01, 0.105],
  },
  {
    key: "link3",
    file: "link3.stl",
    label: "link3",
    color: 0x8f9634,
    explode: [0.04, 0.05, 0.095],
  },
  {
    key: "link4",
    file: "link4.stl",
    label: "link4",
    color: 0x8e8870,
    explode: [0.085, 0.075, 0.055],
  },
  {
    key: "link5",
    file: "link5.stl",
    label: "wrist link",
    color: 0xd39fc8,
    explode: [0.12, 0.09, 0.025],
  },
  {
    key: "gripper",
    file: "gripper.stl",
    label: "linear gripper",
    color: 0x255d16,
    explode: [0.18, 0.08, -0.012],
  },
  {
    key: "tip_left",
    file: "tip_left.stl",
    label: "left fingertip",
    color: 0x8fc6e8,
    explode: [0.235, 0.12, -0.055],
  },
  {
    key: "tip_right",
    file: "tip_right.stl",
    label: "right fingertip",
    color: 0x8fc6e8,
    explode: [0.235, 0.035, -0.055],
  },
];

const meshes = new Map();
const labels = [];

manager.onProgress = (url, loaded, total) => {
  loaderDetail.textContent = `${loaded}/${total || "?"} ${url.split("/").pop()}`;
};

manager.onError = (url) => {
  loaderDetail.textContent = `Could not load ${url.split("/").pop()}`;
};

function makeMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.58,
    metalness: 0.04,
    side: THREE.DoubleSide,
  });
}

function easeInOut(t) {
  return t * t * (3 - 2 * t);
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function makeLabel(text, object) {
  const element = document.createElement("div");
  element.className = "model-label";
  const span = document.createElement("span");
  span.textContent = text;
  element.append(span);
  labelsEl.append(element);
  labels.push({ element, object, world: new THREE.Vector3() });
}

async function loadMesh(part) {
  const geometry = await stlLoader.loadAsync(`${MODEL_ROOT}/${part.file}`);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  const mesh = new THREE.Mesh(geometry, makeMaterial(part.color));
  mesh.name = part.key;
  mesh.userData.basePosition = new THREE.Vector3();
  mesh.userData.explode = new THREE.Vector3(...part.explode);
  mesh.userData.part = part;
  robotRoot.add(mesh);
  meshes.set(part.key, mesh);

  const anchor = new THREE.Group();
  const center = new THREE.Vector3();
  geometry.boundingBox.getCenter(center);
  anchor.position.copy(center);
  mesh.add(anchor);
  mesh.userData.anchor = anchor;
}

async function buildRobot() {
  await Promise.all(parts.map(loadMesh));

  robotRoot.updateWorldMatrix(true, true);
  const bounds = new THREE.Box3().setFromObject(robotRoot);
  const center = new THREE.Vector3();
  bounds.getCenter(center);
  robotRoot.position.x -= center.x;
  robotRoot.position.y -= center.y;
  robotRoot.position.z -= bounds.min.z - 0.02;

  robotRoot.updateWorldMatrix(true, true);
  fitCamera();

  for (const part of parts) {
    if (["ultra_base", "link2", "link4", "link5", "gripper", "tip_left", "tip_right"].includes(part.key)) {
      makeLabel(part.label, meshes.get(part.key).userData.anchor);
    }
  }
}

function fitCamera() {
  const bounds = new THREE.Box3().setFromObject(robotRoot);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  bounds.getCenter(center);
  bounds.getSize(size);

  const portraitBoost = camera.aspect < 0.8 ? 1.5 : 1;
  const distance = Math.max(0.82, size.length() * 1.35) * portraitBoost;

  cameraViews.assembledTarget.copy(center).add(new THREE.Vector3(0, 0, -size.z * 0.14));
  cameraViews.assembledPos
    .copy(cameraViews.assembledTarget)
    .add(new THREE.Vector3(distance * 0.08, -distance * 1.08, distance * 0.46));
  cameraViews.explodedTarget.copy(cameraViews.assembledTarget).add(new THREE.Vector3(0.02, 0.02, 0.02));
  cameraViews.explodedPos
    .copy(cameraViews.assembledTarget)
    .add(new THREE.Vector3(distance * 0.12, -distance * 1.16, distance * 0.54));
}

function resetCamera(immediate = false) {
  state.userCamera = false;
  const pos = cameraViews.assembledPos;
  const target = cameraViews.assembledTarget;
  if (immediate) {
    camera.position.copy(pos);
    controls.target.copy(target);
  } else {
    camera.position.lerp(pos, 0.55);
    controls.target.lerp(target, 0.55);
  }
  controls.update();
}

function explodeAmountForTime(t) {
  const out = easeInOut(clamp01((t - 0.16) / 0.34));
  const back = easeInOut(clamp01((t - 0.78) / 0.18));
  return out * (1 - back);
}

function updateMeshes(explode) {
  for (const mesh of meshes.values()) {
    mesh.position
      .copy(mesh.userData.basePosition)
      .addScaledVector(mesh.userData.explode, explode);
  }
}

function updateCamera(explode) {
  const targetPos = cameraViews.assembledPos.clone().lerp(cameraViews.explodedPos, explode * 0.72);
  const targetLook = cameraViews.assembledTarget.clone().lerp(cameraViews.explodedTarget, explode * 0.72);
  camera.position.lerp(targetPos, 0.04);
  controls.target.lerp(targetLook, 0.05);
}

function updateLabels(explode) {
  const shouldShow = explode > 0.2;
  const width = renderer.domElement.clientWidth;
  const height = renderer.domElement.clientHeight;

  for (const label of labels) {
    label.object.getWorldPosition(label.world);
    const projected = label.world.clone().project(camera);
    const visible =
      shouldShow &&
      projected.z < 1 &&
      projected.x > -1.1 &&
      projected.x < 1.1 &&
      projected.y > -1.1 &&
      projected.y < 1.1;

    label.element.classList.toggle("is-visible", visible);
    label.element.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
    label.element.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
  }
}

function updatePhaseTabs(explode) {
  const nextPhase = explode > 0.35 ? "exploded" : "assembled";
  if (nextPhase === state.phase) return;
  state.phase = nextPhase;
  for (const button of phaseButtons) {
    button.classList.toggle("is-active", button.dataset.phase === nextPhase);
  }
}

function updatePlayIcon() {
  playToggle.setAttribute("aria-label", state.autoPlay ? "Pause animation" : "Play animation");
  playToggle.setAttribute("title", state.autoPlay ? "Pause animation" : "Play animation");
  playToggle.innerHTML = state.autoPlay
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z"></path></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>';
}

function setManualPhase(phase) {
  state.autoPlay = false;
  state.time = phase === "exploded" ? state.duration * 0.52 : 0;
  state.phase = phase;
  updatePlayIcon();
  for (const button of phaseButtons) {
    button.classList.toggle("is-active", button.dataset.phase === phase);
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (state.ready) {
    fitCamera();
  }
}

async function init() {
  try {
    await buildRobot();
    resetCamera(true);
    state.ready = true;
    loaderEl.classList.add("is-hidden");
  } catch (error) {
    loaderDetail.textContent = error.message || "Failed to load YAM Ultra";
    console.error(error);
  }
}

function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(0.05, clock.getDelta());
  if (state.ready && state.autoPlay) {
    state.time = (state.time + dt) % state.duration;
  }

  const normalized = (state.time % state.duration) / state.duration;
  const explode = explodeAmountForTime(normalized);

  updateMeshes(explode);
  if (!state.userCamera) {
    updateCamera(explode);
  }
  updateLabels(explode);
  updatePhaseTabs(explode);
  controls.update();
  renderer.render(scene, camera);
}

phaseButtons.forEach((button) => {
  button.addEventListener("click", () => setManualPhase(button.dataset.phase));
});

playToggle.addEventListener("click", () => {
  state.autoPlay = !state.autoPlay;
  updatePlayIcon();
});

controls.addEventListener("start", () => {
  state.userCamera = true;
});

resetViewButton.addEventListener("click", () => resetCamera());
window.addEventListener("resize", onResize);

updatePlayIcon();
init();
animate();
