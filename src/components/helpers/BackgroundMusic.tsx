import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const BackgroundMusic = () => {
  const { camera } = useThree();
  const soundRef = useRef<THREE.Audio | null>(null);

  //Setup audio
  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);
    soundRef.current = sound;

    const loader = new THREE.AudioLoader();
    loader.load("sounds/background-music.mp3", (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.1);
      sound.play();
    });

    const startMusic = async () => {
      if (listener.context.state !== "running") {
        await listener.context.resume();
      }

      if (soundRef.current && !soundRef.current.isPlaying) {
        soundRef.current.play();
      }
      window.removeEventListener("pointerdown", startMusic);
    };

    window.addEventListener("pointerdown", startMusic);

    return () => {
      window.removeEventListener("pointerdown", startMusic);
      sound.stop();
      camera.remove(listener);
    };
  }, [camera]);

  return null;
};

export default BackgroundMusic;
