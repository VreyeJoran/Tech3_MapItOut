import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import BlinkingDot from "../components/BlinkingDot";
import { useProgress } from "@react-three/drei";

gsap.registerPlugin(useGSAP);

interface LoaderProps {
  canHide: boolean;
  onHidden: () => void;
}

const checkupMessages = [
  { text: "SYSTEM CHECKS IN PROGRESS", status: "running" },
  { text: "COMM LINK OK", status: "ok" },
  { text: "OXYGEN LEVEL STABLE", status: "ok" },
  { text: "THRUSTER READY", status: "running" },
  { text: "NAVIGATION SYSTEMS ONLINE", status: "running" },
  { text: "LIFE SUPPORT NOMINAL", status: "ok" },
  { text: "REACTOR CORE STABLE", status: "ok" },
  { text: "AIRLOCK SEALED", status: "ok" },
];

const Loader = ({ canHide, onHidden }: LoaderProps) => {
  const { progress } = useProgress();
  const [currentMessages, setCurrentMessages] = useState(
    checkupMessages.slice(0, 4)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!canHide || !containerRef.current) return;

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => onHidden(),
      });
    },
    { scope: containerRef, dependencies: [canHide] }
  );

  useGSAP(() => {
    gsap.to("#loading-icon", {
      rotation: "-=360",
      duration: 10,
      ease: "linear",
      repeat: Infinity,
    });
  });

  //Shuffle checkup messages
  useEffect(() => {
    const messagesInterval = setInterval(() => {
      const shuffledMessages = checkupMessages.sort(() => 0.5 - Math.random());
      setCurrentMessages(shuffledMessages.slice(0, 4));
    }, 2500);

    return () => clearInterval(messagesInterval);
  }, []);

  const checkupMessagesContainer = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".checkup-message",
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    },
    { scope: checkupMessagesContainer, dependencies: [currentMessages] }
  );

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-10 bg-linear-to-b from-slate-800 to-slate-950"
    >
      {/* background */}
      <div
        className="absolute w-full h-full opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #06b6d4 1px, transparent 1px),
            linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute w-95/100 h-90/100 flex justify-between">
        <div className="flex flex-col justify-between">
          <BlinkingDot color="bg-cyan-500" />
          <BlinkingDot color="bg-cyan-500" />
        </div>
        <div className="flex flex-col justify-between">
          <BlinkingDot color="bg-cyan-500" />
          <BlinkingDot color="bg-cyan-500" />
        </div>
      </div>

      {/* foreground */}
      <img
        id="loading-icon"
        src="images/moon_loading_icon.svg"
        alt="Loading..."
        className="w-64 h-64"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-headings text-3xl text-cyan-400">LUNAR FRONTIER</h1>
        <p className="font-body text-l text-slate-400">
          INITIALIZATION SEQUENCE
        </p>
      </div>

      <div ref={checkupMessagesContainer} className="flex flex-col gap-4 w-1/4">
        {currentMessages.map((message, index) => (
          <div key={index} className="checkup-message flex items-center gap-3">
            <div className=" flex items-center gap-2">
              <span className="text-slate-600">&gt;</span>
              <span className="font-body text-xs text-cyan-300">
                {message.text}
              </span>
            </div>
            <span
              className={`${
                message.status === "ok" ? "text-green-400" : "text-orange-400"
              } text-xs`}
            >
              {message.status === "ok" ? "[OK]" : "[RUNNING]"}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 w-1/4">
        <div className="font-body flex justify-between items-center text-xs text-slate-500">
          <span>LOADING</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className={`absolute left-0 top-0 h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="w-1/4 flex justify-between items-center">
        <div className="font-body flex items-center gap-2">
          <BlinkingDot color="bg-green-400" />
          <span className="text-slate-500 text-sm">PWR:</span>
          <span className="text-green-400 text-sm">100%</span>
        </div>
        <div className="font-body flex items-center gap-2">
          <BlinkingDot color="bg-cyan-400" />
          <span className="text-slate-500 text-sm">TEMP:</span>
          <span className="text-cyan-400 text-sm">Nominal</span>
        </div>
        <div className="font-body flex items-center gap-2">
          <BlinkingDot color="bg-green-400" />
          <span className="text-slate-500 text-sm">SIGNAL:</span>
          <span className="text-green-400 text-sm">STRONG</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
