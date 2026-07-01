import { Canvas, type CameraProps } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Loader from "./pages/Loader.tsx";
import Experience from "./Experience";
import { useProgress } from "@react-three/drei";
import UIOverlay from "./pages/UIOverlay.tsx";
import { SelectionProvider } from "./context/SelectionContext.tsx";
import BackgroundMusic from "./components/helpers/BackgroundMusic.tsx";

const cameraSettings: CameraProps = {
  fov: 45,
  near: 0.1,
  far: 100,
  position: [-11.5, 6, -14.5],
};

export default function App() {
  const { progress } = useProgress();
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [cameraYaw, setCameraYaw] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinTimePassed(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  const canHideLoader = progress === 100 && minTimePassed;
  return (
    <>
      <SelectionProvider>
        <div className="relative h-svh w-svw overflow-hidden">
          <Canvas dpr={[1, 2]} shadows camera={cameraSettings}>
            <Suspense fallback={null}>
              <Experience onYawChange={setCameraYaw} />
              <BackgroundMusic />
            </Suspense>
          </Canvas>

          {showLoader && (
            <Loader
              canHide={canHideLoader}
              onHidden={() => setShowLoader(false)}
            />
          )}

          {!showLoader && <UIOverlay yaw={cameraYaw} />}
        </div>
      </SelectionProvider>
    </>
  );
}
