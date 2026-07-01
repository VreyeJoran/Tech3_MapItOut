import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelection, type SelectedMesh } from "../context/SelectionContext";

gsap.registerPlugin(useGSAP);

interface RadarIconProps {
  x: number;
  y: number;
  icon: string;
  label: string;
  delay: number;
  rotation: number;
}

const RadarIcon = ({ x, y, icon, label, delay, rotation }: RadarIconProps) => {
  const pingRef = useRef<HTMLDivElement>(null);

  const { select } = useSelection();

  useGSAP(
    () => {
      if (!pingRef.current) return;

      gsap.to(pingRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 4,
        repeat: -1,
        ease: "linear",
        delay: delay,
      });
    },
    {
      scope: pingRef,
    }
  );

  const selection: SelectedMesh = label.startsWith("Solar")
    ? "SolarArray"
    : (label.replace(/\s+/g, "") as SelectedMesh);

  const clickSound = useRef<HTMLAudioElement | null>(null);

  if (!clickSound.current) {
    clickSound.current = new Audio("/sounds/click.mp3");
    clickSound.current.volume = 0.6;
  }

  return (
    <div
      className="absolute flex justify-center items-center group"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `rotate(${rotation}rad)`,
      }}
      onClick={() => {
        if (clickSound.current) {
          clickSound.current.currentTime = 0;
          clickSound.current.play();
        }
        select(selection);
      }}
    >
      <img src={icon} alt={label} className="w-6 h-6" />
      <div
        ref={pingRef}
        className="absolute w-2/1 h-2/1 rounded-full border-2 border-cyan-400/50"
      ></div>
      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        <div className="bg-black/80 border border-cyan-400/50 px-2 py-1 rounded text-cyan-300 text-xs">
          {label}
        </div>
      </div>
    </div>
  );
};

export default RadarIcon;
