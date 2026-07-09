import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

const MODEL_ROOT = "/models/yam-ultra-craft-hand";
const YAM_ROOT = `${MODEL_ROOT}/yam-ultra/assets`;
const HAND_ROOT = `${MODEL_ROOT}/craft-hand`;
const MOUNT_ROOT = `${MODEL_ROOT}/mount`;

const canvas = document.querySelector("#robot-canvas");
const loaderEl = document.querySelector("#loader");
const loaderDetail = document.querySelector("#loader-detail");
const labelsEl = document.querySelector("#labels");
const timelineFill = document.querySelector("#timeline-fill");
const phaseButtons = [...document.querySelectorAll(".phase-tab")];
const playToggle = document.querySelector("#play-toggle");
const resetViewButton = document.querySelector("#reset-view");

const manager = new THREE.LoadingManager();
const stlLoader = new STLLoader(manager);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xf6f2ec, 2.1, 5.2);

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
renderer.toneMappingExposure = 1.03;

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.01, 10);
camera.up.set(0, 0, 1);
camera.position.set(0.62, -0.72, 0.43);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.02, -0.08, 0.08);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.rotateSpeed = 0.55;
controls.zoomSpeed = 0.75;
controls.panSpeed = 0.55;
controls.minDistance = 0.16;
controls.maxDistance = 2.2;
controls.screenSpacePanning = true;
controls.update();

const robotRoot = new THREE.Group();
robotRoot.name = "yam-ultra-craft-hand-root";
scene.add(robotRoot);

const softShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.ShadowMaterial({ color: 0x283033, opacity: 0.08 })
);
softShadow.rotation.x = Math.PI / 2;
softShadow.position.z = -0.002;
scene.add(softShadow);

const grid = new THREE.GridHelper(1.4, 28, 0xa9aaa4, 0xd7d3cb);
grid.rotation.x = Math.PI / 2;
grid.material.transparent = true;
grid.material.opacity = 0.55;
scene.add(grid);

scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b1a4, 2.7));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
keyLight.position.set(0.45, -0.5, 0.82);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x9ad7d3, 1.15);
rimLight.position.set(-0.5, 0.42, 0.38);
scene.add(rimLight);

const fillLight = new THREE.PointLight(0xffc489, 0.75, 1.8);
fillLight.position.set(0.24, 0.3, 0.2);
scene.add(fillLight);

const state = {
  ready: false,
  autoPlay: true,
  time: 0,
  duration: 17,
  currentPhase: "assembled",
};

const animatedParts = [];
const materialGroups = {
  originalTool: [],
  replacement: [],
};

const linkFrames = new Map();
const anchors = new Map();
let wristFrame;
let replacementGroup;
let originalToolGroup;
let mountPart1;
let mountPart2;
let handGroup;
let wristRing;
let labels = [];

const cameraViews = {
  basePos: new THREE.Vector3(0.72, -0.86, 0.52),
  baseTarget: new THREE.Vector3(0.02, -0.08, 0.12),
  explodedPos: new THREE.Vector3(0.9, -1.0, 0.64),
  explodedTarget: new THREE.Vector3(0.02, -0.05, 0.12),
};

const phaseTimes = {
  assembled: 0.08,
  exploded: 0.48,
  focus: 0.77,
};

const yamLinks = [
  {
    name: "ultra_base",
    mesh: "ultra_base.stl",
    color: 0x5b2a84,
    visual: {
      pos: [-0.0374966, -0.0464005, 0.193801],
      rpy: [0, 1.5708, 0],
    },
    explode: [-0.035, -0.04, 0],
  },
  {
    name: "link1",
    parent: "ultra_base",
    mesh: "link1.stl",
    color: 0xb97151,
    joint: {
      pos: [0, 0, 0.0733],
      rpy: [0, 0, 0],
      angle: -0.4,
    },
    visual: {
      pos: [0.0374968, 0.0464, 0.119501],
      rpy: [-3.14159, 1.5708, 0],
    },
    explode: [0.045, -0.01, 0.025],
  },
  {
    name: "link2",
    parent: "link1",
    mesh: "link2.stl",
    color: 0x007099,
    joint: {
      pos: [0.02, 0.0329, 0.0455],
      rpy: [1.5708, 0, 3.14159],
      angle: 1.02,
    },
    visual: {
      pos: [-0.0174977, -0.0740001, -0.07925],
      rpy: [1.5708, 0, 1.5708],
    },
    explode: [0.07, 0.02, 0.045],
  },
  {
    name: "link3",
    parent: "link2",
    mesh: "link3.stl",
    color: 0x8f9634,
    joint: {
      pos: [0.264, 4.08431e-7, -0.06375],
      rpy: [-3.14159, 0, 1.5708],
      angle: 1.18,
    },
    visual: {
      pos: [0.0740003, -0.281499, -0.0813],
      rpy: [1.5708, 0, 3.14159],
    },
    explode: [0.075, 0.055, 0.035],
  },
  {
    name: "link4",
    parent: "link3",
    mesh: "link4.stl",
    color: 0x8e8870,
    joint: {
      pos: [0.0600003, -0.244999, -0.00205],
      rpy: [0, 0, -3.14159],
      angle: -0.48,
    },
    visual: {
      pos: [-0.0138003, 0.0364989, -0.0787882],
      rpy: [1.5708, 0, 0],
    },
    explode: [0.035, 0.075, 0.02],
  },
  {
    name: "link5",
    parent: "link4",
    mesh: "link5.stl",
    color: 0xd39fc8,
    joint: {
      pos: [-0.0403003, 0.0703851, -0.0323887],
      rpy: [-3.14159, -1.5708, 0],
      angle: 0.52,
    },
    visual: {
      pos: [-0.0463995, 0.0311519, 0.0265],
      rpy: [-1.5708, -1.5708, 0],
    },
    explode: [0.02, 0.1, 0.045],
  },
];

const gripperReference = {
  wristPoint: [0.014, 0.0464, -0.0626],
  joint: {
    pos: [2.39858e-7, -0.0419481, 0.0404996],
    rpy: [-1.5708, -1.5708, 0],
    angle: 0,
  },
  gripper: {
    mesh: "gripper.stl",
    visual: {
      pos: [-0.014, -0.0463995, 0.0731],
      rpy: [0, 0, 0],
    },
  },
  tips: [
    {
      name: "tip_left",
      mesh: "tip_left.stl",
      joint: {
        pos: [-0.0226681, 0.0450619, -0.0545599],
        rpy: [-1.5708, -1.5708, 0],
        slide: -0.018,
      },
      visual: {
        pos: [0.129783, 0.00999321, -0.0914614],
        rpy: [1.5708, 0, 1.5708],
      },
    },
    {
      name: "tip_right",
      mesh: "tip_right.stl",
      joint: {
        pos: [0.0226681, -0.0450619, -0.0545599],
        rpy: [1.5708, 0, 0],
        slide: -0.018,
      },
      visual: {
        pos: [-0.0379932, 0.129783, 0.00133753],
        rpy: [-1.5708, 0, 0],
      },
    },
  ],
};

const handMeshes = [
  "base.stl",
  "ThumbMCP.stl",
  "index1.stl",
  "index2.stl",
  "index3.stl",
  "index4.stl",
  "middle1.stl",
  "middle2.stl",
  "middle3.stl",
  "middle4.stl",
  "ring1.stl",
  "ring2.stl",
  "ring3.stl",
  "ring4.stl",
  "pinky1.stl",
  "pinky2.stl",
  "pinky3.stl",
  "pinky4.stl",
  "thumb2.stl",
  "thumb3.stl",
  "thumb4.stl",
];

manager.onProgress = (url, loaded, total) => {
  const name = url.split("/").pop();
  loaderDetail.textContent = `${loaded}/${total || "?"} ${name}`;
};

manager.onError = (url) => {
  loaderDetail.textContent = `Could not load ${url.split("/").pop()}`;
};

function eulerFromRpy(rpy) {
  return new THREE.Euler(rpy[0], rpy[1], rpy[2], "XYZ");
}

function quaternionFromRpy(rpy) {
  return new THREE.Quaternion().setFromEuler(eulerFromRpy(rpy));
}

function applyOrigin(object, origin) {
  object.position.fromArray(origin.pos);
  object.quaternion.copy(quaternionFromRpy(origin.rpy));
}

function setJointTransform(object, joint) {
  object.position.fromArray(joint.pos);
  const originQuat = quaternionFromRpy(joint.rpy);
  const jointQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), joint.angle || 0);
  object.quaternion.copy(originQuat.multiply(jointQuat));
}

function setSlideTransform(object, joint) {
  object.position.fromArray(joint.pos);
  object.quaternion.copy(quaternionFromRpy(joint.rpy));
  const slide = new THREE.Group();
  slide.position.set(0, 0, joint.slide || 0);
  object.add(slide);
  return slide;
}

function makeMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.58,
    metalness: options.metalness ?? 0.04,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    side: THREE.DoubleSide,
  });
}

function makeLabel(text, object, kind = "default") {
  const element = document.createElement("div");
  element.className = "model-label";
  element.dataset.kind = kind;
  const span = document.createElement("span");
  span.textContent = text;
  element.append(span);
  labelsEl.append(element);
  const label = { element, object, world: new THREE.Vector3() };
  labels.push(label);
  return label;
}

async function loadStl(url, material, options = {}) {
  const geometry = await stlLoader.loadAsync(url);

  if (options.center) {
    geometry.computeBoundingBox();
    const center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);
  }

  if (options.handCoordinates) {
    geometry.applyMatrix4(
      new THREE.Matrix4().set(
        1, 0, 0, 0,
        0, 0, -1, 0,
        0, 1, 0, 0,
        0, 0, 0, 1
      )
    );
    geometry.scale(0.001, 0.001, 0.001);
  }

  if (options.scale) {
    geometry.scale(options.scale, options.scale, options.scale);
  }

  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

function trackPart(object, explode = [0, 0, 0], multiplier = 1) {
  object.userData.basePosition = object.position.clone();
  object.userData.explode = new THREE.Vector3(...explode).multiplyScalar(multiplier);
  animatedParts.push(object);
}

function setObjectOpacity(root, opacity) {
  root.traverse((child) => {
    if (!child.isMesh) return;
    const material = child.material;
    material.transparent = opacity < 0.999;
    material.opacity = opacity;
    material.depthWrite = opacity > 0.4;
  });
}

function handColorFor(name) {
  if (name === "base.stl") return 0xf3efe6;
  if (name.includes("Thumb") || name.includes("thumb")) return 0x2f7f87;
  if (name.endsWith("1.stl")) return 0xf4f2ea;
  if (name.endsWith("2.stl")) return 0xded8cd;
  if (name.endsWith("3.stl")) return 0x202a2c;
  if (name.endsWith("4.stl")) return 0x121719;
  return 0xe6e0d5;
}

async function buildYamArm() {
  for (const link of yamLinks) {
    const linkFrame = new THREE.Group();
    linkFrame.name = `${link.name}-frame`;

    robotRoot.add(linkFrame);
    linkFrames.set(link.name, linkFrame);

    const material = makeMaterial(link.color);
    const mesh = await loadStl(`${YAM_ROOT}/${link.mesh}`, material);
    mesh.name = link.name;
    linkFrame.add(mesh);

    const anchor = new THREE.Group();
    const center = new THREE.Vector3();
    mesh.geometry.boundingBox.getCenter(center);
    anchor.position.copy(center);
    linkFrame.add(anchor);
    anchors.set(link.name, anchor);

    trackPart(mesh, link.explode);
  }
}

async function buildOriginalGripperReference() {
  wristFrame = new THREE.Group();
  wristFrame.name = "joint6-wrist-frame";
  wristFrame.position.fromArray(gripperReference.wristPoint);
  robotRoot.add(wristFrame);

  originalToolGroup = new THREE.Group();
  originalToolGroup.name = "original-linear-gripper-reference";
  robotRoot.add(originalToolGroup);

  const ghostMaterial = makeMaterial(0x909a9d, {
    transparent: true,
    opacity: 0.18,
    roughness: 0.7,
  });

  const gripperMesh = await loadStl(`${YAM_ROOT}/${gripperReference.gripper.mesh}`, ghostMaterial);
  originalToolGroup.add(gripperMesh);
  materialGroups.originalTool.push(gripperMesh);

  await Promise.all(
    gripperReference.tips.map(async (tip) => {
      const tipMesh = await loadStl(`${YAM_ROOT}/${tip.mesh}`, ghostMaterial.clone());
      tipMesh.name = `${tip.name}-ghost`;
      originalToolGroup.add(tipMesh);
      materialGroups.originalTool.push(tipMesh);
    })
  );

  trackPart(originalToolGroup, [0.19, 0.025, -0.035]);
}

async function buildReplacementTool() {
  replacementGroup = new THREE.Group();
  replacementGroup.name = "wrist-adapter-craft-hand";
  wristFrame.add(replacementGroup);

  wristRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.046, 0.0015, 12, 72),
    makeMaterial(0xc45d2a, { transparent: true, opacity: 0.72 })
  );
  wristRing.name = "joint6-highlight-ring";
  replacementGroup.add(wristRing);

  const mountMaterialA = makeMaterial(0x2f3839, { roughness: 0.46, metalness: 0.05 });
  const mountMaterialB = makeMaterial(0x4f5a5c, { roughness: 0.48, metalness: 0.05 });

  mountPart1 = await loadStl(`${MOUNT_ROOT}/mount_part1.stl`, mountMaterialA, {
    center: true,
    scale: 0.001,
  });
  mountPart1.name = "wrist-side-mount-plate";
  mountPart1.position.set(0, 0, -0.017);
  replacementGroup.add(mountPart1);
  trackPart(mountPart1, [-0.075, -0.02, 0.035]);
  materialGroups.replacement.push(mountPart1);

  mountPart2 = await loadStl(`${MOUNT_ROOT}/mount_part_2.stl`, mountMaterialB, {
    center: true,
    scale: 0.001,
  });
  mountPart2.name = "hand-side-mount-plate";
  mountPart2.position.set(0, 0, -0.047);
  replacementGroup.add(mountPart2);
  trackPart(mountPart2, [0.075, 0.02, -0.025]);
  materialGroups.replacement.push(mountPart2);

  handGroup = new THREE.Group();
  handGroup.name = "craft-hand";
  replacementGroup.add(handGroup);

  await Promise.all(
    handMeshes.map(async (name) => {
      const mesh = await loadStl(`${HAND_ROOT}/${name}`, makeMaterial(handColorFor(name)), {
        handCoordinates: true,
      });
      mesh.name = name.replace(".stl", "");
      handGroup.add(mesh);
      materialGroups.replacement.push(mesh);
    })
  );

  const handBounds = new THREE.Box3().setFromObject(handGroup);
  const handCenter = new THREE.Vector3();
  handBounds.getCenter(handCenter);
  handGroup.position.set(-handCenter.x, -handCenter.y, -0.068 - handBounds.max.z);
  trackPart(handGroup, [0.005, 0.045, -0.07], 0.72);
}

function createLabels() {
  makeLabel("joint6 wrist rotation", wristFrame, "replacement");
  makeLabel("two-piece wrist mount", mountPart2, "replacement");
  makeLabel("CRAFT hand", handGroup, "replacement");
  makeLabel("original gripper reference", originalToolGroup, "default");
  makeLabel("YAM Ultra arm", anchors.get("link3") || linkFrames.get("link3"), "default");
}

function fitSceneToView() {
  robotRoot.updateWorldMatrix(true, true);
  const initialBounds = new THREE.Box3().setFromObject(robotRoot);
  const center = new THREE.Vector3();
  initialBounds.getCenter(center);
  robotRoot.position.x -= center.x;
  robotRoot.position.y -= center.y;
  robotRoot.position.z -= initialBounds.min.z - 0.015;

  robotRoot.updateWorldMatrix(true, true);
  const bounds = new THREE.Box3().setFromObject(robotRoot);
  const framedCenter = new THREE.Vector3();
  const size = new THREE.Vector3();
  bounds.getCenter(framedCenter);
  bounds.getSize(size);

  const portraitBoost = camera.aspect < 0.8 ? 1.75 : 1;
  const distance = Math.max(1.05, size.length() * 1.7) * portraitBoost;
  cameraViews.baseTarget.copy(framedCenter).add(new THREE.Vector3(0, 0, size.z * 0.04));
  cameraViews.basePos.copy(cameraViews.baseTarget).add(new THREE.Vector3(distance * 0.62, -distance * 0.92, distance * 0.48));
  cameraViews.explodedTarget.copy(cameraViews.baseTarget).add(new THREE.Vector3(0, 0.02, 0.02));
  cameraViews.explodedPos.copy(cameraViews.baseTarget).add(new THREE.Vector3(distance * 0.76, -distance * 1.04, distance * 0.56));
}

function resetCamera(immediate = false) {
  const pos = cameraViews.basePos;
  const target = cameraViews.baseTarget;

  if (immediate) {
    camera.position.copy(pos);
    controls.target.copy(target);
  } else {
    camera.position.lerp(pos, 0.5);
    controls.target.lerp(target, 0.5);
  }
  controls.update();
}

function easeInOut(t) {
  return t * t * (3 - 2 * t);
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function phaseForTime(t) {
  const explodeUp = easeInOut(clamp01((t - 0.2) / 0.22));
  const focusUp = easeInOut(clamp01((t - 0.58) / 0.18));
  const reset = easeInOut(clamp01((t - 0.9) / 0.1));
  const focusReset = easeInOut(clamp01((t - 0.86) / 0.12));

  const explodeHold = t < 0.68 ? 1 : 1 - 0.56 * easeInOut(clamp01((t - 0.68) / 0.18));
  const explode = (t < 0.42 ? explodeUp : explodeHold) * (1 - reset);
  const focus = focusUp * (1 - focusReset);

  return {
    explode: clamp01(explode),
    focus: clamp01(focus),
  };
}

function updateAnimatedParts(explode, focus) {
  const focusCollapse = 1 - focus * 0.52;
  for (const object of animatedParts) {
    const base = object.userData.basePosition;
    const offset = object.userData.explode;
    object.position.copy(base).addScaledVector(offset, explode * focusCollapse);
  }

  if (originalToolGroup) {
    const opacity = 0.08 + explode * 0.24;
    setObjectOpacity(originalToolGroup, opacity * (1 - focus * 0.35));
  }

  if (wristRing) {
    wristRing.rotation.z += 0.01 + focus * 0.02;
    wristRing.scale.setScalar(1 + focus * 0.1);
  }

  if (replacementGroup) {
    replacementGroup.scale.setScalar(1 + focus * 0.015);
  }
}

function updateCamera(explode, focus) {
  const basePos = cameraViews.basePos;
  const baseTarget = cameraViews.baseTarget;
  const explodedPos = cameraViews.explodedPos;
  const explodedTarget = cameraViews.explodedTarget;

  const wristWorld = new THREE.Vector3();
  if (wristFrame) {
    wristFrame.getWorldPosition(wristWorld);
  }
  const focusTarget = wristWorld.clone().add(new THREE.Vector3(0.0, 0.0, -0.045));
  const focusPos = wristWorld.clone().add(new THREE.Vector3(0.18, -0.23, 0.12));

  const cameraTargetPos = basePos.clone().lerp(explodedPos, explode * 0.65).lerp(focusPos, focus);
  const cameraTargetLook = baseTarget.clone().lerp(explodedTarget, explode * 0.65).lerp(focusTarget, focus);

  camera.position.lerp(cameraTargetPos, 0.035);
  controls.target.lerp(cameraTargetLook, 0.05);
}

function updatePhaseTabs(explode, focus) {
  let next = "assembled";
  if (focus > 0.35) next = "focus";
  else if (explode > 0.35) next = "exploded";

  if (next === state.currentPhase) return;
  state.currentPhase = next;
  for (const button of phaseButtons) {
    button.classList.toggle("is-active", button.dataset.phase === next);
  }
}

function updateLabels(explode, focus) {
  const shouldShow = explode > 0.18 || focus > 0.16;
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

function updatePlayIcon() {
  playToggle.setAttribute("aria-label", state.autoPlay ? "Pause animation" : "Play animation");
  playToggle.setAttribute("title", state.autoPlay ? "Pause animation" : "Play animation");
  playToggle.innerHTML = state.autoPlay
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z"></path></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>';
}

function setManualPhase(phase) {
  state.autoPlay = false;
  state.time = phaseTimes[phase] * state.duration;
  state.currentPhase = phase;
  updatePlayIcon();
  for (const button of phaseButtons) {
    button.classList.toggle("is-active", button.dataset.phase === phase);
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

async function init() {
  try {
    await buildYamArm();
    await buildOriginalGripperReference();
    await buildReplacementTool();
    createLabels();
    fitSceneToView();
    resetCamera(true);
    state.ready = true;
    loaderEl.classList.add("is-hidden");
  } catch (error) {
    loaderDetail.textContent = error.message || "Failed to load visualization";
    console.error(error);
  }
}

function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(0.05, clock.getDelta());
  if (state.ready && state.autoPlay) {
    state.time = (state.time + dt) % state.duration;
  }

  const normalizedTime = (state.time % state.duration) / state.duration;
  const { explode, focus } = phaseForTime(normalizedTime);

  updateAnimatedParts(explode, focus);
  updateCamera(explode, focus);
  updatePhaseTabs(explode, focus);
  updateLabels(explode, focus);

  timelineFill.style.width = `${normalizedTime * 100}%`;
  controls.update();
  renderer.render(scene, camera);
}

const clock = new THREE.Clock();

phaseButtons.forEach((button) => {
  button.addEventListener("click", () => setManualPhase(button.dataset.phase));
});

playToggle.addEventListener("click", () => {
  state.autoPlay = !state.autoPlay;
  updatePlayIcon();
});

resetViewButton.addEventListener("click", () => {
  resetCamera();
});

window.addEventListener("resize", onResize);

updatePlayIcon();
init();
animate();
