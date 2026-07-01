import { useEffect, useRef, useState } from "react";
import { useSelection } from "../context/SelectionContext";
import AccentCorners from "./AccentCorners";
import BlinkingDot from "./BlinkingDot";
import SystemStatus from "./SystemStatus";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const StatusBox = () => {
  const { selected } = useSelection();
  const containerRef = useRef<HTMLDivElement>(null);
  const [oxygenValue, setOxygenValue] = useState(66);
  const [commValue, setCommValue] = useState(23);
  const [powerValue, setPowerValue] = useState(89);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.to(containerRef.current, {
        opacity: selected === null ? 1 : 0,
        y: selected === null ? 0 : 20,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: selected === null ? "auto" : "none",
        delay: selected === null ? 0.4 : 0,
      });
    },
    { scope: containerRef, dependencies: [selected] }
  );

  useEffect(() => {
    const step = () => [-1, 0, 1][Math.floor(Math.random() * 3)];
    const clamp = (n: number) => Math.max(10, Math.min(100, n));

    const interval = setInterval(() => {
      setOxygenValue((value) => clamp(value + step()));
      setCommValue((value) => clamp(value + step()));
      setPowerValue((value) => clamp(value + step()));
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      ref={containerRef}
      className="absolute bottom-10 left-10 flex flex-col gap-4 w-3/10 bg-black/30 backdrop-blur-sm border border-cyan-400/50 rounded-sm px-8 py-4 shadow-lg shadow-cyan-400/10 pointer-events-auto"
    >
      <AccentCorners />
      <div className="flex items-center gap-3">
        <h2 className="font-headings text-l text-cyan-400">SYSTEM STATUS</h2>
        <BlinkingDot color="bg-cyan-400" />
      </div>
      <SystemStatus
        label="OXYGEN LEVEL"
        value={oxygenValue}
        icon="images/oxygen-icon.svg"
      />
      <SystemStatus
        label="COMM LINK"
        value={commValue}
        icon="images/radar-icon.svg"
      />
      <SystemStatus
        label="POWER STATUS"
        value={powerValue}
        icon="images/lightning-icon.svg"
      />
    </div>
  );
};

export default StatusBox;
