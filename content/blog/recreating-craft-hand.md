---
title: "Recreating CRAFT: Hardware Lessons for Dexterous Manipulation"
date: 2026-06-23T14:50:27-04:00
draft: false
description: "A hands-on build log for recreating CRAFT, a tendon-driven robot hand with hybrid hard-soft compliance."
image: "/blog/craft-hand/craft-hand-1.png"
images:
  - "/blog/craft-hand/craft-hand-1.png"
---

<p class="post-subcaption">Rebuilding CRAFT from the hardware up: compliant fingers, tendon routing, robot mounting, Quest-based teleoperation, and early policy rollouts.</p>

<div class="craft-hero-pair" aria-label="CRAFT build teaser">
  <figure class="craft-hero-primary">
    <img src="/blog/craft-hand/craft-hand-1.png" alt="Assembled CRAFT robot hand with fingers extended on a lab bench">
    <figcaption>Completed CRAFT build: compliant fingers, routed tendons, compact actuators.</figcaption>
  </figure>
  <div class="craft-hero-stack">
    <figure>
      <img src="/blog/craft-hand/i2rt-yam-craft-mounted-front.jpg" alt="CRAFT hand mounted on the left I2RT Yam arm in the bimanual tabletop setup">
      <figcaption>CRAFT mounted on the Yam arm in the bimanual workspace.</figcaption>
    </figure>
    <figure class="craft-hero-video">
      <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/vision-teleop-basket-test.mp4?v=20260709b"></video>
      <figcaption>Vision teleoperation: orange pick-and-place.</figcaption>
    </figure>
  </div>
</div>

Most robot grippers are effective clamps: they open, close, and work well when the object
is already in the right place. Dexterous hands support more complex forms of
manipulation: rotating objects in-hand, wrapping around fragile items, using tools, and
recovering grasps when contact is imperfect. This post documents my experience building
the [CRAFT](https://craft-hand.github.io/) hand at the UNVEIL Lab, originally developed
by Leo Lin et al. at UIUC. The design principle is simple and appealing: passive
compliance helps the hand adapt to contact, while tendon-driven actuation keeps the
hardware compact.

## The Original CRAFT Hand

<div class="craft-overview-layout">
<div>
<p>CRAFT stands out because it combines low-cost hardware with passive compliance. The
hand costs under $600, weighs 800 g, and can be built mostly from 3D-printed parts and
off-the-shelf components. It uses rigid PLA where the hand needs structure and soft TPU in
the finger joints, where impacts and contact uncertainty matter most. This makes the hand
more forgiving around fragile, deformable, or irregularly shaped objects without turning
the whole finger into a soft, hard-to-control appendage.</p>
<p>The hand remains dexterous: each finger has base flexion/extension, base
abduction/adduction, and coupled middle/fingertip flexion, giving the hand 15 active
degrees of freedom plus 5 passive degrees of freedom. The motors sit away from the fingers
and pull through tendons, which keeps the fingers light and close to human scale. The
original paper reports coverage of all 33 Feix grasp types and demonstrates teleoperation
with delicate objects such as eggs, raspberries, chips, and wine glasses.</p>
  </div>
  <figure>
    <video controls autoplay loop muted playsinline preload="metadata" aria-label="Original CRAFT robot hand from the project paper" src="/blog/craft-hand/original-craft-hand.mp4"></video>
    <figcaption>Original CRAFT prototype from the project paper, showing the compact tendon-driven layout and hybrid rigid-soft fingers.</figcaption>
  </figure>
</div>

## Step 1: Building the Compliant Fingers

The build started with the compliant fingers. Each finger combines white PLA link shells
with black TPU joint pieces. The PLA provides structure and clean mounting interfaces,
while the TPU forms the bending regions so the finger can deflect during contact instead
of behaving like a fully rigid linkage. During assembly, the main constraint was
alignment: the pins, fasteners, and printed interfaces had to seat cleanly without
compressing the TPU enough to restrict joint motion.

I first built a single finger to validate the PIP/DIP stack before repeating the process
across all five fingers. The finger needed to bend smoothly by hand, return without
obvious binding, and avoid side-loading between the printed parts. Once that validation
passed, I assembled the remaining finger modules and staged them around the palm for
tendon integration.

<div class="craft-process-gallery" aria-label="Compliant finger build process">
  <figure>
    <img src="/blog/craft-hand/compliant-finger-bend-test.jpg" alt="Single compliant CRAFT finger module bent by hand during assembly">
    <figcaption>Single finger module: PLA forms the rigid links, while TPU adds compliance
    at the joints.</figcaption>
  </figure>
  <figure>
    <img src="/blog/craft-hand/compliant-finger-modules.jpg" alt="Several assembled CRAFT compliant finger modules laid out on a workbench">
    <figcaption>Finger modules during assembly. The flexible TPU joints made alignment
    important before tendon routing.</figcaption>
  </figure>
  <figure>
    <img src="/blog/craft-hand/compliant-fingers-palm-layout.jpg" alt="CRAFT finger modules laid out around the palm plate before final assembly">
    <figcaption>Finger modules staged around the PLA palm plate before tendon routing and
    final mounting.</figcaption>
  </figure>
</div>

Tendon routing turned the finger modules into actuated fingers. Pulling the flexion tendon
curls the finger, while the rolling-contact geometry keeps the PIP and DIP joints moving
together instead of letting the fingertip fold independently. The key requirement was not
just motion, but repeatable force transmission. A small rubbing point or sharp exit angle
can produce weak, delayed, or inconsistent fingertip motion from the same motor command.

<div class="craft-finger-motion" aria-label="Tendon-driven compliant finger motion videos">
  <figure>
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/tendon-driven-finger-motion.mp4?v=20260709b"></video>
    <figcaption>Manual tendon test during assembly, checking side-to-side motion, finger
    bend, and curl before motor integration.</figcaption>
  </figure>
  <figure class="craft-finger-motion__teleop">
    <div class="craft-finger-motion__teleop-frame">
      <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/desktop-first-teleop-2.mp4?v=20260709a"></video>
    </div>
    <figcaption>First desktop teleoperation test, mapping tracked hand motion to CRAFT
    motor commands.</figcaption>
  </figure>
</div>

## Step 2: Mounting CRAFT on the Existing Bimanual Setup

After bench assembly, the next step was integrating CRAFT with the existing bimanual I2RT
Yam Ultra setup. The original setup used stock parallel-jaw grippers, which are reliable
for simple pick-and-place tasks but reduce the end-effector command to opening and
closing. Mounting CRAFT on the wrist turned the hand from a standalone build into part of
the robot platform. The payload budget was sufficient: the Yam Ultra is rated for 4 kg,
while CRAFT is reported at about 800 g, leaving margin for the adapter, fasteners, and
wiring.

<figure class="craft-mount-before">
  <img src="/blog/craft-hand/i2rt-yam-original-gripper-arm.jpg" alt="I2RT Yam robot arm with its original gripper before mounting the CRAFT hand">
  <figcaption>Yam Ultra arm with the stock parallel-jaw gripper before the CRAFT
  retrofit.</figcaption>
</figure>

To adapt the arm, I used Autodesk Fusion and the available I2RT STL files as the starting
geometry for a printable wrist mount. The design requirements were mostly mechanical:
match the Yam wrist pattern, interface cleanly with the CRAFT mount, keep the fingers
oriented toward the workspace, preserve wrist clearance, and leave a usable path for
wiring. I checked the wrist motion in MuJoCo before printing, then mounted the hand on the
left arm and staged the workspace for teleoperation.

<div class="craft-mount-gallery" aria-label="CRAFT mounted on the I2RT Yam setup">
  <figure class="craft-mount-gallery__wide">
    <img src="/blog/craft-hand/i2rt-yam-craft-mounted-front.jpg" alt="CRAFT hand mounted on the left I2RT Yam arm in the bimanual tabletop setup">
    <figcaption>CRAFT mounted on the left Yam arm, with the bimanual workspace staged for teleoperation.</figcaption>
  </figure>
  <figure class="craft-mount-gallery__portrait">
    <img src="/blog/craft-hand/i2rt-yam-mounted-hand-top-view.png?v=20260709c" alt="Top view of CRAFT hand mounted on the I2RT Yam setup near tabletop task objects">
    <figcaption>Top view of the mounted hand, showing its position relative to the tabletop objects.</figcaption>
  </figure>
</div>

## Step 3: Quest-Based VR Teleoperation

<div class="craft-teleop-layout">
  <div>
    <p>With the hand mounted, the next requirement was a control interface for collecting
    demonstrations. We used Quest-based VR teleoperation: the headset tracks the
    operator's hand pose, and the retargeting layer maps that motion into CRAFT's motor
    limits. The thumb mapping required additional calibration because small tracking or
    frame errors produced large changes in the commanded thumb motion.</p>
    <p>For arm motion, we used an <a href="https://robot-tv.github.io/">Open-TeleVision</a>-style
    setup in which the operator's wrist pose commands the robot wrist and guides the arm.
    When the wrist frame was aligned, the arm and hand could be controlled as one
    coordinated system rather than as two separate interfaces. The early demonstrations
    included simple pick-and-place tasks, followed by a wine-pouring setup assisted by
    <a href="https://guardrail-policy.github.io/">GLIDE</a> guardrails. In that setting,
    GLIDE filters unstable commands around the glass grasp and pour while the operator
    still provides the task-level motion.</p>
  </div>
  <figure class="craft-teleop-featured craft-teleop-featured--vertical">
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/physical-vr-teleop.mp4"></video>
    <figcaption>Quest-based VR teleoperation with CRAFT mounted on the robot wrist.</figcaption>
  </figure>
</div>

<div class="craft-video-grid craft-video-grid--duo" aria-label="Quest-based VR teleoperation task videos">
  <figure>
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/vision-teleop-table-grasp.mp4?v=20260709b"></video>
    <figcaption>Pick-and-place with a white cup, where compliance helps the fingers
    conform without over-squeezing the object.</figcaption>
  </figure>
  <figure>
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/vision-teleop-pour-setup.mp4"></video>
    <figcaption>More complex wine-pouring setup with GLIDE guardrails, where the hand,
    robot, camera, and workspace must stay coordinated.</figcaption>
  </figure>
</div>

### Pi0.5 Policy Rollout

After collecting human demonstrations, we tested a rollout using
<a href="https://arxiv.org/abs/2504.16054">pi0.5</a> with
<a href="https://guardrail-policy.github.io/">GLIDE</a> assistance. This setup changes the
role of the operator: instead of directly commanding every motion, the learned policy
attempts the wine-serving behavior while GLIDE filters unstable commands around the grasp
and pour.

<div class="craft-video-grid" aria-label="Pi0.5 policy rollout video">
  <figure>
    <video controls preload="metadata" playsinline muted src="/blog/craft-hand/videos/wine-serving.mp4"></video>
    <figcaption>Pi0.5 wine-serving policy rollout with GLIDE guardrails filtering unstable commands.</figcaption>
  </figure>
</div>

## Challenges and Lessons Learned

As a beginner, some lessons were obvious only after the fact. The hard part was turning a
printed hand into a dependable robot system: parts, assembly, calibration, contact, and
real-robot debugging.

- Spares matter more than expected. The parts list was not the issue; my assumption was
  that exact quantities would be enough. A broken motor, missing screw, or failed print can
  turn into a one- or two-week delay without extra screws, bearings, tendons, inserts, and
  at least one spare actuator.
- Retargeting was not plug-and-play. The Quest gave us a usable hand pose, but the mapping
  to CRAFT still needed calibration. Thumb motion needed more useful side-to-side control,
  and even a small wrist-frame mismatch could make the robot feel unintuitive.
- Contact was more than closing the fingers. The hand could wrap around a bottle and still
  slip during pouring, which made it clear that enclosing an object is not the same as
  gripping it. Friction tape helped temporarily, but better fingertip pads or coatings would
  make contact more reliable.
- Motor torque became a real hardware limit. The small DYNAMIXEL servos keep CRAFT compact
  and affordable, but they limit grasp strength during stronger holds, slip recovery, and
  tasks where the object applies a moment to the fingers.
- Simulation stopped short of the full system. Once CRAFT was mounted on the Yam arm with
  the adapter and tendon routing, many issues only appeared on hardware. A better Yam +
  CRAFT simulation would make it easier to test retargeting, wrist alignment, and policy
  rollouts before real-robot trials.

## Next Steps

The next goal is to turn the build from a working prototype into a repeatable experiment
platform. That means reducing the amount of manual adjustment needed between runs and
making failures easier to diagnose.

- Standardize maintenance. Keep a small spare-parts kit for screws, bearings, tendons,
  inserts, and actuators, then document the assembly order and common failure points so
  repairs do not depend on memory.
- Make tendon routing more repeatable. Cleaner exits, better retensioning points, and less
  rubbing would make finger motion more consistent. Finger modules should also be easier to
  remove without disturbing the rest of the hand.
- Improve fingertip contact. Replace the temporary friction tape with pads or coatings that
  provide repeatable grip without making the fingers too stiff. This would make pouring and
  heavier grasps less sensitive to slip.
- Turn calibration into a procedure. Thumb retargeting and wrist-frame alignment should use
  a short routine with saved parameters, rather than being adjusted by feel each session.
- Build an integrated Yam + CRAFT simulation. The simulation should include the adapter,
  wrist limits, approximate hand geometry, and task objects, so retargeting and simple
  policy changes can be tested before hardware trials.
- Add contact feedback. Fingertip tactile sensing, or even simpler slip/contact indicators,
  would make it easier to understand why a grasp fails instead of relying only on camera
  views and visual inspection.

## Citations

- [CRAFT: A Tendon-Driven Hand with Hybrid Hard-Soft Compliance][craft-paper]
  ([arXiv][craft-arxiv])
- [Open-TeleVision: Teleoperation with Immersive Active Visual Feedback][open-television]
  ([code][open-television-code])
- [GLIDE: Guardrails for Learning from Infeasible Demonstrations Efficiently][glide]
- [pi0.5: a Vision-Language-Action Model with Open-World Generalization][pi05]

[craft-paper]: https://craft-hand.github.io/
[craft-arxiv]: https://arxiv.org/abs/2603.12120
[open-television]: https://robot-tv.github.io/
[open-television-code]: https://github.com/OpenTeleVision/TeleVision
[glide]: https://guardrail-policy.github.io/
[pi05]: https://arxiv.org/abs/2504.16054
