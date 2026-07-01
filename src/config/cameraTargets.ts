import type { Vector3Tuple } from "three";

export type CameraTarget = {
  position: Vector3Tuple;
  lookAt: Vector3Tuple;
};

export const CAMERA_TARGETS: Record<string, CameraTarget> = {
  Start: {
    position: [-11.5, 6, -14.5],
    lookAt: [0, 0, 0],
  },
  RocketLaunchPad: {
    position: [4, 6, 0.8],
    lookAt: [-3.5, 3.5, 0.7],
  },
  MainHabitat: {
    position: [1.7, 2.4, -3.4],
    lookAt: [4.2, -0.9, 2.1],
  },
  SolarArray: {
    position: [8.5, 3.0, -1.1],
    lookAt: [1.7, 0, -4.4],
  },
  PlantNursery: {
    position: [1.7, 2.2, 0.2],
    lookAt: [0.4, 1.4, 1.4],
  },
  CommsArray: {
    position: [11.4, 2.1, -2.2],
    lookAt: [0.9, -3.2, -5],
  },
};
