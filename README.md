# Lunar Frontier

## Concept

Lunar Frontier is an interactive 3D web experience where users can explore a futuristic lunar base.

The project combines React Three Fiber, rapier physics, and a dynamic user interface to create a calm yet technologically advanced environment.

Users can freely navigate around the lunar base, select different locations, and view contextual information through direct interaction or a live minimap. The experience also features an animated lunar rover driving around the base and a physics-based meteorite interaction that adds an extra layer of dynamism to the world.

The project focuses on creating a sense of exploration, control, and presence within a digital environment.

---

## Technical Approach

Lunar Frontier is built as a web-based 3D application using modern front-end technologies.

### Technologies Used

- **React** – Overall application structure
- **React Three Fiber** – Integration between React and Three.js
- **@react-three/drei** – Helpers for model loading, environments, and UI
- **Rapier Physics** – Real-time physics simulation
- **GSAP** – Animations and UI transitions
- **Leva** – Debugging and parameter controls during development
- **Blender** – Modeling the 3D environment and assets

---

## Interaction

Users can:

- Interact with locations within the 3D environment
- Navigate using a live minimap
- View information for each location
- Trigger a meteorite impact through location-based interaction

---

## Assets & Credits

### Original Work

The following models were created entirely by me in Blender:

- The lunar surface
- The lunar habitat:
  - The corridor
  - The glass dome
  - The circular building
- The rocket tower
- The launch platform

### External Models (Sketchfab)

- **Rocket (SpaceX Starship)**  
  https://sketchfab.com/3d-models/spacex-starship-a8a0b69f776841a1a465cd9fb3762fd2

- **Rover (modified)**  
  https://sketchfab.com/3d-models/mars-rover-2-51650fa1c23c48818a05aa1ece9f712e  
  _Colors were modified and several parts were removed._

- **Meteorite / Asteroid**  
  https://sketchfab.com/3d-models/asteroid-d3b95b50c02a482d927f224b623bb83d

- **Potted Plants**  
  https://sketchfab.com/3d-models/optimized-potted-plants-967b4bf23fac4098993776fcfc2d3318

- **Solar Panel**  
  https://sketchfab.com/3d-models/solar-panel-83483a66f8974d7e8f2e7bbde518d606

- **Satellite Tower**  
  Royalty-free

### Textures & HDRI

**Textures**

- AmbientCG
- Poliigon

(All royalty-free.)

**HDRI**

- BlenderKit (royalty-free)

### Audio

**Application Background Music**

_Morning Light_ — Epic Spectrum  
Source: https://freetouse.com/music

**Promotional Video Music**

_Dawn_ — Alegend  
Source: https://freetouse.com/music

**Sound Effects (click & meteorite impact)**

Royalty-free

All assets are used for **educational purposes**.

---

## Running the Project Locally

### Requirements

- **Node.js** (v18 or later recommended)
- **npm**

### Installation

```bash
npm install
npm run dev
```

The application will then be available at:

```
http://localhost:5173
```
