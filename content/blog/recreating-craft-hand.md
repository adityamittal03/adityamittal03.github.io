---
title: "Recreating CRAFT: Hardware Lessons for Dexterous Manipulation"
date: 2026-06-23T14:50:27-04:00
draft: false
description: "A hands-on build log for recreating CRAFT, a tendon-driven robot hand with hybrid hard-soft compliance."
image: "/blog/craft-hand/craft-completed-hand.png"
images:
  - "/blog/craft-hand/craft-completed-hand.png"
---

<p class="post-subcaption">A hands-on walkthrough of my experience rebuilding CRAFT and its integration with a bimanual robot setup for complex real-world manipulation tasks.</p>

<div class="craft-hero-pair" aria-label="CRAFT build teaser">
  <figure class="craft-hero-primary">
    <img src="/blog/craft-hand/craft-completed-hand.png" alt="Assembled CRAFT robot hand with fingers extended on a lab bench">
    <figcaption>Completed CRAFT hand with compliant fingers, routed tendons, and compact actuators.</figcaption>
  </figure>
  <div class="craft-hero-stack">
    <figure>
      <img src="/blog/craft-hand/craft-mounted-i2rt-yam-front.jpg" alt="CRAFT hand mounted on the left I2RT Yam arm in the bimanual tabletop setup">
      <figcaption>CRAFT integration with the I2RT Yam setup for tabletop bimanual manipulation.</figcaption>
    </figure>
    <figure class="craft-hero-video">
      <video controls preload="metadata" playsinline muted data-playback-rate="2" src="/blog/craft-hand/videos/craft-orange-pick-place-teleop.mp4?v=20260709c"></video>
      <span class="video-speed-badge">2x</span>
      <figcaption>Quest-based teleoperation for an orange pick-and-place task.</figcaption>
    </figure>
  </div>
</div>

Most robot grippers serve as effective clamps: they open, close, and work well when the
object's shape and orientation are easy to work with. Dexterous hands support more
complex forms of manipulation: in-hand rotation, using small, delicate, or thin tools
(such as screwdrivers, wrenches, or tweezers), and recovering grasps when contact is
imperfect. This blog documents my experience building the
[CRAFT](https://craft-hand.github.io/) hand at the UNVEIL Lab, originally developed by
Leo Lin and team at UIUC. The design principle is simple and appealing: passive
compliance helps contact-rich manipulation, while tendon-driven actuation keeps the
fingers compact.

## The Original CRAFT Hand

<div class="craft-overview-layout">
<div>
<p>CRAFT stands out for its low-cost design and passive compliance. The hand costs under
$600, weighs 800 g, and can be built using 3D-printed parts and off-the-shelf components.
For compliance, CRAFT uses rigid PLA for the finger links and soft TPU at the joints to
preserve the hand's structure while absorbing contact forces. This helps the hand handle
fragile, deformable, or irregularly shaped objects without turning each finger into a
fully soft, hard-to-control structure.</p>
<p>The hand provides a wide range of dexterous capabilities: each finger has base
flexion/extension, base abduction/adduction, and coupled middle/fingertip flexion, giving
the hand 15 active degrees of freedom plus 5 passive degrees of freedom. The motors sit in
the forearm and pull the fingers through tendons, keeping the hand light and close to
human scale. The original paper reports coverage of all 33 Feix grasp types and
demonstrates teleoperation with delicate objects such as eggs, raspberries, chips, and
wine glasses.</p>
  </div>
  <figure>
    <video controls autoplay loop muted playsinline preload="metadata" aria-label="Original CRAFT robot hand from the project paper" src="/blog/craft-hand/craft-original-hand-demo.mp4"></video>
    <figcaption>Original CRAFT hand, showing the compact tendon-driven layout and compliant fingers.</figcaption>
  </figure>
</div>

## Step 1: Building the Compliant Fingers

I began by building the first finger. As shown in the images, each finger combines white
PLA link shells with black TPU joint pieces. The white PLA parts provide the rigid finger
links, and the black TPU pieces create the flexible joints between them. This gives the
finger enough structure to move predictably while still bending under contact. During
finger assembly, the main challenge was alignment: the pins, fasteners, and 3D-printed
parts had to seat cleanly without compressing the TPU so much that it restricted bending
motion.

Building one module first made it possible to test the PIP/DIP stack before repeating
the process across all five fingers. The finger needed to bend smoothly, return
without obvious binding, and minimize interference between the printed parts. Once this
validation passed, I assembled the remaining finger modules and staged them around the
palm for tendon integration.

<div class="craft-process-gallery" aria-label="Compliant finger build process">
  <figure>
    <img src="/blog/craft-hand/craft-single-finger-bend-test.jpg" alt="Single compliant CRAFT finger module bent by hand during assembly">
    <figcaption>Single finger module bent by hand: white PLA links preserve structure,
    while black TPU joints provide the compliant motion.</figcaption>
  </figure>
  <figure>
    <img src="/blog/craft-hand/craft-finger-modules-assembly.jpg" alt="Several assembled CRAFT compliant finger modules laid out on a workbench">
    <figcaption>Four completed fingers beside the fifth finger still in assembly. The
    unfinished module shows the alignment challenge: each pin, fastener, and TPU joint had
    to seat cleanly so the fingers could bend without binding.</figcaption>
  </figure>
  <figure>
    <img src="/blog/craft-hand/craft-fingers-palm-layout.jpg" alt="CRAFT finger modules laid out around the palm plate before final assembly">
    <figcaption>Finger modules staged around the PLA palm plate, checking spacing and
    orientation before tendon routing and final mounting.</figcaption>
  </figure>
</div>

Tendon routing turned the finger modules into actuated fingers. Pulling the flexion tendon
curls the finger, and the rolling-contact geometry keeps the PIP/DIP joints moving
together instead of letting the fingertip fold independently. The key requirement was to
produce smooth, repeatable actions and reduce delayed or inconsistent fingertip motion
from the same motor command.

<div class="craft-finger-motion" aria-label="Tendon-driven compliant finger motion videos">
  <figure>
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/craft-tendon-finger-motion.mp4?v=20260709c"></video>
    <figcaption>Manual tendon test during assembly. The bottom row of motors shows
    side-to-side motion, the middle row shows forward/backward finger bend, and the top
    motor shows finger curl.</figcaption>
  </figure>
  <figure class="craft-finger-motion__teleop">
    <div class="craft-finger-motion__teleop-frame">
      <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/craft-initial-hand-tracking-teleop.mp4?v=20260709b"></video>
    </div>
    <figcaption>Initial teleoperation test using hand tracking to send CRAFT motor
    commands.</figcaption>
  </figure>
</div>

## Step 2: Mounting CRAFT on the Existing Bimanual Setup

After assembly, the next step was integrating CRAFT with our lab's existing bimanual I2RT
Yam Ultra setup. The original setup used stock parallel-jaw grippers, which are reliable
for simple pick-and-place tasks but reduce the end-effector command to opening and
closing. Mounting CRAFT on the wrist turned the hand from a standalone build into part of
the robot platform. As an initial sanity check, the payload budget was sufficient: the Yam
Ultra is rated for 4 kg, while CRAFT is reported at about 800 g. This left enough margin
for the adapter, fasteners, and wiring.

<div class="craft-mount-before-row" aria-label="Yam Ultra wrist before the CRAFT retrofit">
  <figure class="craft-mount-before craft-mount-before__setup">
    <div class="craft-mount-before__frame">
      <img src="/blog/craft-hand/i2rt-yam-bimanual-setup.png?v=20260709e" alt="I2RT Yam bimanual robot setup before mounting the CRAFT hand">
    </div>
    <figcaption>I2RT Yam bimanual setup with the original gripper. The hexagonal wrist
    mount allows wrist rotation when attached to the arm.</figcaption>
  </figure>
  <figure class="craft-mount-before craft-mount-before__adapter">
    <div class="craft-mount-before__frame">
      <img src="/blog/craft-hand/craft-yam-wrist-mount-adapter.png?v=20260709e" alt="Printable wrist mount adapter for mounting CRAFT on the Yam Ultra arm">
    </div>
    <figcaption>3D CAD design of the wrist mount adapter used to connect CRAFT to the Yam
    Ultra wrist. Starting from the provided hand base, I attached the hexagonal adapter and
    printed the mount as one object.</figcaption>
  </figure>
</div>

To create an adapter, I used Autodesk Fusion and the available I2RT STL files as the
starting geometry for a printable wrist mount. The design requirements were mostly
mechanical: match the Yam wrist pattern, interface cleanly with the CRAFT mount, keep the
fingers oriented toward the workspace, preserve wrist clearance, and leave a usable path
for wiring. I checked the wrist motion in MuJoCo before printing, then mounted the hand on
the left arm and staged the workspace for teleoperation. The image shows our bimanual
teleoperation stack with one dexterous hand.

<div class="craft-mount-gallery" aria-label="CRAFT mounted on the I2RT Yam setup">
  <figure class="craft-mount-gallery__wide">
    <img src="/blog/craft-hand/craft-mounted-i2rt-yam-front.jpg" alt="CRAFT hand mounted on the left I2RT Yam arm in the bimanual tabletop setup">
    <figcaption>The bimanual I2RT Yam workspace staged for teleoperation and policy
    deployment, with CRAFT mounted on the left arm.</figcaption>
  </figure>
  <figure class="craft-mount-gallery__portrait">
    <img src="/blog/craft-hand/craft-mounted-i2rt-yam-top-view.png?v=20260709c" alt="Top view of CRAFT hand mounted on the I2RT Yam setup near tabletop task objects">
    <figcaption>Top view of the mounted hand, showing the wrist mount alignment with the
    existing arm mount.</figcaption>
  </figure>
</div>

## Step 3: Quest-Based VR Teleoperation

<div class="craft-teleop-layout">
  <div>
    <p>With the hand mounted, the next requirement was a control interface for collecting
    demonstrations. We used Quest-based VR teleoperation, where the headset tracks the
    operator's hand pose and a retargeting layer maps that motion into CRAFT's motor
    limits. The thumb needed extra calibration because small tracking or frame errors
    created large changes in the commanded thumb motion.</p>
    <p>For arm motion, we used an <a href="https://robot-tv.github.io/">Open-TeleVision</a>-style
    setup: the operator's wrist pose commands the robot wrist and guides the arm. Once the
    wrist frame was aligned, the arm and hand could be controlled together instead of as
    two separate systems. The early demonstrations started with simple pick-and-place tasks
    and then moved to a wine-pouring setup assisted by GLIDE guardrails. In that setting,
    GLIDE filters unstable commands around the glass grasp and pour while the operator
    still provides the task-level motion.</p>
  </div>
  <figure class="craft-teleop-featured craft-teleop-featured--vertical">
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/craft-quest-vr-teleop.mp4?v=20260709b"></video>
    <figcaption>Quest-based VR teleoperation uses Quest hand tracking to map operator
    hand motion to CRAFT motor commands.</figcaption>
  </figure>
</div>

<div class="craft-video-switcher" data-craft-video-switcher aria-label="Quest-based VR teleoperation task videos">
  <div class="craft-video-switcher__tabs" role="tablist" aria-label="Teleoperation task selection">
    <button class="craft-video-switcher__tab is-active" type="button" role="tab" id="craft-task-cup-tab" aria-controls="craft-task-cup-panel" aria-selected="true">Cup Pick-and-Place</button>
    <button class="craft-video-switcher__tab" type="button" role="tab" id="craft-task-pour-tab" aria-controls="craft-task-pour-panel" aria-selected="false">Wine Pouring</button>
  </div>
  <figure class="craft-video-switcher__panel is-active" id="craft-task-cup-panel" role="tabpanel" aria-labelledby="craft-task-cup-tab">
    <video controls preload="metadata" playsinline muted data-playback-rate="1.5" src="/blog/craft-hand/videos/craft-cup-pick-place-teleop.mp4?v=20260709c"></video>
    <span class="video-speed-badge">1.5x</span>
    <figcaption>Pick-and-place with a white cup, where compliance helps the fingers
    conform without over-squeezing the object.</figcaption>
  </figure>
  <figure class="craft-video-switcher__panel" id="craft-task-pour-panel" role="tabpanel" aria-labelledby="craft-task-pour-tab" hidden>
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/craft-wine-pouring-teleop.mp4?v=20260709c"></video>
    <figcaption>More complex wine-pouring setup with GLIDE guardrails, where the hand,
    robot, camera, and workspace must stay coordinated.</figcaption>
  </figure>
</div>

### Pi0.5 Policy Rollout

We also tested a rollout using <a href="https://arxiv.org/abs/2504.16054">pi0.5</a> with
GLIDE assistance using the collected human demonstrations. This setup changes the role of
the operator: instead of directly commanding every motion, the learned policy attempts the
wine-serving behavior while GLIDE filters unstable commands around the grasp and pour.

<div class="craft-video-grid" aria-label="Pi0.5 policy rollout video">
  <figure>
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/craft-wine-serving-policy-rollout.mp4"></video>
    <figcaption>Pi0.5 wine-serving policy rollout with GLIDE guardrails filtering unstable commands.</figcaption>
  </figure>
</div>

## Challenges and Lessons Learned

As a beginner to hardware projects, some lessons seem obvious in hindsight, but they are
still worth highlighting because others might run into similar challenges. For this
project, the hardest part was turning a printed hand into a dependable robot system:
parts, assembly, calibration, contact, and real-robot debugging.

- Buy spare parts! I made the mistake of ordering the exact quantity of components. First,
  I ran out of metal dowels after some were lost. Then, a motor broke during construction
  and I did not have a replacement. These unnecessary delays added over a week to the build
  and kept us from starting robot experiments earlier.
- Camera views matter. The initial arm setup did not provide a good view from the hand's
  perspective. We added a camera mount on top of CRAFT to visualize contact, but our setup
  still makes it hard to see grasp formation and slip clearly. It would be useful to add
  more cameras from other perspectives.
- Object slip was a recurring challenge. For example, the hand could wrap around the wine
  bottle and still slip during pouring. This showed that we needed a stronger grasp, not
  just finger closure. Friction tape reduced some slip, but we still want better grip
  assistance.
- Motor torque can become a hardware limit. The small DYNAMIXEL servos keep CRAFT compact
  and affordable, but they limit grasp strength during firm grasps, slip recovery, and
  tasks where the object applies a moment to the fingers.

The main lesson is that getting a full hardware setup working takes much more effort than
getting one part to move correctly. It also takes time to make the setup repeatable, since
small changes in assembly, calibration, contact, or object placement can change the
outcome.

## Next Steps

The next goal is to improve the retargeting and teleoperation infrastructure to create a
repeatable experiment platform for data collection. This includes reducing the amount of
manual adjustment needed between runs and making failures easier to diagnose.

- Make tendon routing more precise. Better retensioning points between experiments would
  make the mapping from motor commands to finger motion more consistent. Finger modules
  should also be easier to remove without disturbing the rest of the hand.
- Improve fingertip contact. Replace the temporary friction tape with pads or coatings that
  provide repeatable grip without making the fingers too stiff. It would also be useful to
  add fingertip contact feedback, so grasp failures are not diagnosed only from camera views
  and visual inspection.
- Improve the simulation environment. The current XML files have some errors, and we do not
  yet have infrastructure to train policies or collect data with simulation and RL. A better
  Yam + CRAFT simulation would support larger-scale data collection for manipulation tasks.
- Improve thumb calibration. Thumb retargeting should support more complex grasps and
  pinches; the current Quest retargeting still leaves room for improvement.

## Citations

- [CRAFT: A Tendon-Driven Hand with Hybrid Hard-Soft Compliance][craft-paper]
  ([arXiv][craft-arxiv])
- [Open-TeleVision: Teleoperation with Immersive Active Visual Feedback][open-television]
  ([code][open-television-code])
- GLIDE: Guardrails for Learning from Infeasible Demonstrations Efficiently. Anonymous
  Authors. Preprint.
- [pi0.5: a Vision-Language-Action Model with Open-World Generalization][pi05]
  ([arXiv][pi05])

[craft-paper]: https://craft-hand.github.io/
[craft-arxiv]: https://arxiv.org/abs/2603.12120
[open-television]: https://robot-tv.github.io/
[open-television-code]: https://github.com/OpenTeleVision/TeleVision
<!-- GLIDE project URL is temporarily disabled for double-blind review and will be restored later. -->
[glide]: https://guardrail-policy.github.io/
[pi05]: https://arxiv.org/abs/2504.16054
