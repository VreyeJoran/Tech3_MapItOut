import { useRef } from "react";
import { useSelection } from "../context/SelectionContext";

const BackButton = () => {
  const { clear } = useSelection();

  const clickSound = useRef<HTMLAudioElement | null>(null);

  if (!clickSound.current) {
    clickSound.current = new Audio("/sounds/click.mp3");
    clickSound.current.volume = 0.6;
  }

  return (
    <button
      className="absolute top-10 left-10 bg-black/30 backdrop-blur-sm border border-cyan-400/50 rounded-sm px-2 py-2 shadow-lg shadow-cyan-400/10 pointer-events-auto hover:bg-black/50 hover:border-cyan-400/80 active:bg-black/70 active:scale-95 transition-colors"
      onClick={() => {
        if (clickSound.current) {
          clickSound.current.currentTime = 0;
          clickSound.current.play();
        }
        clear();
      }}
    >
      <img
        src="images/arrow-left-icon.svg"
        alt="Go Back"
        className="w-10 h-10"
      />
    </button>
  );
};

export default BackButton;
