# Orbit One — 3D Product Configurator

A lightweight interactive 3D web experience built with React, Three.js, and React Three Fiber.

## What I built

Orbit One is a browser-based product configurator. Users can:

- Rotate and zoom a real 3D scene with mouse or touch.
- Change the product material color.
- Adjust metalness and roughness in real time.
- Toggle wireframe mode to inspect the geometry.
- Start/pause automatic product motion.
- Use the experience on mobile screens.

## Responsible loading and performance

The 3D experience uses procedural Three.js geometry instead of a large external GLB. This keeps the model payload effectively at zero and avoids a large model download.

The React Three Fiber canvas is lazy-loaded with `React.lazy` and `Suspense`, and a lightweight HTML/CSS fallback is displayed while the 3D experience initializes. The renderer is capped to a device pixel ratio of 1–1.5 and uses high-performance rendering settings.

The scene uses a limited number of lights, moderate geometry segments, and restrained shadows. The application also respects `prefers-reduced-motion`, disabling automatic movement for users who request reduced motion.

### FE-10 performance lens

For the shipped version, the main performance risks are JavaScript bundle cost, WebGL rendering cost, shadow-map work, and device pixel ratio. I kept the geometry procedural and lightweight, limited the DPR, avoided post-processing, and kept the scene visually simple.

For a final performance check, I tested the production build with the browser Performance panel and checked the deployed experience on both desktop and a narrow mobile viewport. The goal is a stable interactive frame rate rather than adding visual effects that increase GPU cost without improving the interaction.

## What I would add with more time

- Replace the procedural object with an optimized production GLB using Draco or Meshopt compression.
- Add multiple product parts that can be swapped independently.
- Add a saved configuration/shareable URL.
- Add a small loading progress indicator for larger models.
- Add automated performance monitoring for real devices.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Stack

React · Vite · Three.js · React Three Fiber · Drei
