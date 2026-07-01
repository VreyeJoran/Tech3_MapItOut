import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSelection } from "../../context/SelectionContext";
import { CAMERA_TARGETS } from "../../config/cameraTargets";

export function CameraController({
  controlsRef,
}: {
  controlsRef: React.RefObject<any>;
}) {
  const { camera } = useThree();
  const { selected } = useSelection();
  const lastTargetKey = useRef<string | null>(null);

  useEffect(() => {
    if (!controlsRef.current) return;

    const targetKey = selected ?? "Start";
    if (lastTargetKey.current === targetKey) return;
    lastTargetKey.current = targetKey;

    const { position, lookAt } = CAMERA_TARGETS[targetKey];
    const controls = controlsRef.current;

    const timeline = gsap.timeline();

    timeline.to(camera.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 2,
      ease: "power2.inOut",
    });

    timeline.to(
      controls.target,
      {
        x: lookAt[0],
        y: lookAt[1],
        z: lookAt[2],
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => controls.update(),
      },
      0
    );
  }, [selected]);

  return null;
}
