import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";

interface CometProps {
  position: [number, number, number];
  velocity: [number, number, number];
  onRemove: () => void;
}

const Comet = ({ position, velocity, onRemove }: CometProps) => {
  const comet = useGLTF("models/Comet.glb");

  //Auto remove comet
  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemove();
    }, 8000);

    return () => clearTimeout(timeout);
  }, [onRemove]);

  const thudSound = useRef<HTMLAudioElement | null>(null);

  if (!thudSound.current) {
    thudSound.current = new Audio("/sounds/thud.mp3");
    thudSound.current.volume = 1;
  }

  return (
    <RigidBody
      type="dynamic"
      position={position}
      linearVelocity={velocity}
      colliders="ball"
      restitution={0.4}
      friction={2}
      onCollisionEnter={() => {
        if (thudSound.current) {
          thudSound.current.currentTime = 0;
          thudSound.current.play();
        }
      }}
    >
      <primitive object={comet.scene} scale={0.1} />
    </RigidBody>
  );
};

export default Comet;
