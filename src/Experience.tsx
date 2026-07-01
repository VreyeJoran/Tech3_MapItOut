import { BakeShadows, Environment, OrbitControls } from "@react-three/drei";
import { Moon } from "./components/meshes/Moon";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CameraController } from "./components/helpers/CameraController";
import { useSelection } from "./context/SelectionContext";
import { Physics } from "@react-three/rapier";

interface ExperienceProps {
  onYawChange: (yaw: number) => void;
}

const Experience = ({ onYawChange }: ExperienceProps) => {
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const { camera } = useThree();
  const direction = useRef(new THREE.Vector3());
  const lastYaw = useRef(0);

  const { selected } = useSelection();

  useFrame(() => {
    camera.getWorldDirection(direction.current);
    const yaw = Math.atan2(direction.current.x, direction.current.z);

    //Update only when yaw changes 1.1deg
    if (Math.abs(yaw - lastYaw.current) > (Math.PI / 180) * 1.1) {
      lastYaw.current = yaw;
      onYawChange(yaw);
    }
  });

  const controlsRef = useRef<any>(null);

  //Check is zooming out
  useEffect(() => {
    const onWheelScroll = (event: WheelEvent) => {
      setIsZoomingOut(event.deltaY > 0);
    };

    window.addEventListener("wheel", onWheelScroll);
    return () => window.removeEventListener("wheel", onWheelScroll);
  }, []);

  //Zoom back to center
  useFrame(() => {
    if (!controlsRef.current || !isZoomingOut || selected) return;

    if (isZoomingOut) {
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      controlsRef.current.update();
    }

    if (controlsRef.current.target.length() < 0.01) {
      controlsRef.current.panOffset?.set(0, 0, 0);
      controlsRef.current.sphericalDelta?.set(0, 0, 0);
      controlsRef.current.zoomDelta = 0;

      setIsZoomingOut(false);
    }
  });

  return (
    <>
      <Physics gravity={[0, -1.62, 0]}>
        <Environment
          background
          files={"/HDRI/earth-from-space4K.exr"}
          backgroundRotation={[(Math.PI / 180) * -12, (Math.PI / 180) * -80, 0]}
          resolution={256}
        />
        <BakeShadows />
        <fog attach="fog" args={["#000", 65, 95]} />

        <OrbitControls
          ref={controlsRef}
          zoomToCursor
          enableDamping
          dampingFactor={0.1}
          maxDistance={20}
          minDistance={8}
          maxPolarAngle={(Math.PI / 180) * 82}
          enablePan={false}
          enableRotate={!selected}
          enableZoom={!selected}
        />
        <CameraController controlsRef={controlsRef} />

        <directionalLight
          position={[2, 1, 1]}
          intensity={5}
          castShadow
          shadow-mapSize={2048}
          shadow-camera-left={-11}
          shadow-camera-right={9.5}
          shadow-camera-top={8}
          shadow-camera-bottom={-4}
          shadow-camera-near={-3.5}
          shadow-camera-far={17}
          shadow-normalBias={0.05}
          shadow-bias={-0.0002}
        />

        <Moon />
      </Physics>
    </>
  );
};

export default Experience;
