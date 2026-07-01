import { useRef, useState } from "react";
import {
  useSelection,
  type SelectedMesh,
} from "../../context/SelectionContext";
import { Html } from "@react-three/drei";

interface InteractiveMeshProps {
  mesh: {
    name: string;
    position: [number, number, number];
    size: [number, number, number];
    icon: string;
  };
}

const InteractiveMesh = ({ mesh }: InteractiveMeshProps) => {
  const { select, selected } = useSelection();
  const [hovered, setHovered] = useState<boolean>(false);

  const clickSound = useRef<HTMLAudioElement | null>(null);

  if (!clickSound.current) {
    clickSound.current = new Audio("/sounds/click.mp3");
    clickSound.current.volume = 0.6;
  }

  return (
    <mesh
      position={mesh.position}
      onPointerOver={(e) => {
        if (selected !== null) return;
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onDoubleClick={(e) => {
        if (selected !== null) return;
        e.stopPropagation();

        if (clickSound.current) {
          clickSound.current.currentTime = 0;
          clickSound.current.play();
        }

        select(mesh.name as SelectedMesh);
        document.body.style.cursor = "default";
        setHovered(false);
      }}
    >
      <boxGeometry args={mesh.size} />
      <meshBasicMaterial transparent opacity={0} />
      {hovered && selected === null && (
        <Html
          pointerEvents="none"
          center
          position={[
            0,
            mesh.name === "RocketLaunchPad" ? mesh.size[1] / 2 : mesh.size[1],
            0,
          ]}
        >
          <div className="pointer-events-none flex flex-col items-center">
            <div className="pointer-events-none flex items-center justify-center p-2 rounded-full bg-black/50 shadow shadow-cyan-400/50">
              <img
                src={mesh.icon}
                alt={mesh.name}
                className="pointer-events-none w-6 h-6"
              />
            </div>
            <div className="pointer-events-none mt-2 px-2 py-1 rounded bg-black/70 text-xs text-cyan-200 whitespace-nowrap">
              {mesh.name}
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default InteractiveMesh;
