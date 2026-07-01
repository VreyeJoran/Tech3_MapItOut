import * as THREE from "three";
import { Suspense, useEffect, useState, type JSX } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { KTX2Loader } from "three-stdlib";
import { useThree } from "@react-three/fiber";
import InteractiveMesh from "./InteractiveMesh";
import { RigidBody } from "@react-three/rapier";
import Comet from "./Comet";
import { useSelection } from "../../context/SelectionContext";

// Preload the comet model to avoid first-time suspense/white flash
useGLTF.preload("models/Comet.glb");

const interactiveMeshes: {
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  icon: string;
}[] = [
  {
    name: "RocketLaunchPad",
    position: [-6.8, 0, 0.6],
    size: [4.6, 10.4, 4.1],
    icon: "images/rocket-icon.svg",
  },
  {
    name: "SolarArray",
    position: [-0.3, 0, -5.3],
    size: [10.9, 0.4, 4.8],
    icon: "images/solar-icon.svg",
  },
  {
    name: "CommsArray",
    position: [7.7, 0, -3.8],
    size: [1.5, 1.9, 3],
    icon: "images/radar-icon.svg",
  },
  {
    name: "MainHabitat",
    position: [3.8, 0, 2.9],
    size: [6, 1, 4.9],
    icon: "images/home-icon.svg",
  },
  {
    name: "PlantNursery",
    position: [-2.4, 0, 4.4],
    size: [3.7, 1, 3.6],
    icon: "images/plant-icon.svg",
  },
];

type CometData = {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
};

export function Moon(props: JSX.IntrinsicElements["group"]) {
  const { camera } = useThree();
  const [comet, setComet] = useState<CometData | null>(null);
  const { selected } = useSelection();

  //Load moon
  const gl = useThree((state) => state.gl);
  const { scene, animations } = useGLTF(
    "models/MoonSurfaceFinal_ktx2_optimized2.glb",
    true,
    undefined,
    (loader) => {
      const ktx2Loader = new KTX2Loader()
        .setTranscoderPath(
          "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/libs/basis/"
        )
        .detectSupport(gl);

      loader.setKTX2Loader(ktx2Loader);
    }
  );
  const { actions } = useAnimations(animations, scene);

  //Rover animation
  useEffect(() => {
    if (!actions) return;

    const roverAction = actions["MoonRover"];
    roverAction?.reset().setLoop(THREE.LoopRepeat, Infinity).play();

    return () => {
      roverAction?.stop();
    };
  }, [actions]);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      // Shadows
      if (child.name === "Moon") {
        child.castShadow = false;
        child.receiveShadow = true;
      } else if (child.name.startsWith("MoonRover")) {
        child.castShadow = false;
        child.receiveShadow = false;
      } else {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  //Spawn comet
  function spawnComet(target: THREE.Vector3) {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const spawnPos = camera.position
      .clone()
      .add(direction.multiplyScalar(20))
      .add(new THREE.Vector3(0, 12, 0));

    const velocity = target.clone().sub(spawnPos).normalize().multiplyScalar(5);

    setComet({
      id: Date.now(),
      position: spawnPos.toArray() as [number, number, number],
      velocity: velocity.toArray() as [number, number, number],
    });
  }

  //Remove comet
  useEffect(() => {
    if (selected !== null) {
      setComet(null);
    }
  }, [selected]);

  return (
    <>
      <RigidBody type="fixed" colliders="trimesh">
        <primitive
          object={scene}
          {...props}
          position={[2, -3, 6]}
          scale={0.1}
          onDoubleClick={(e: any) => {
            if (
              !e.intersections[0] &&
              selected !== null &&
              e.object.name === "Moon"
            )
              return;

            e.stopPropagation();
            spawnComet(e.intersections[0].point.clone());
          }}
        />
      </RigidBody>

      {interactiveMeshes.map((mesh, index) => (
        <InteractiveMesh key={index} mesh={mesh} />
      ))}

      {selected === null && (
        <Suspense fallback={null}>
          {comet && (
            <Comet
              key={comet.id}
              position={comet.position}
              velocity={comet.velocity}
              onRemove={() => setComet(null)}
            />
          )}
        </Suspense>
      )}
    </>
  );
}
