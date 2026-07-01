import { useRef } from "react";
import BackButton from "./BackButton";
import { useSelection } from "../context/SelectionContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AccentCorners from "./AccentCorners";

gsap.registerPlugin(useGSAP);

const Locations: Record<
  string,
  {
    label: string;
    coords: { x: number; y: number };
    status: string;
    integrity: number;
    personnel: number;
    power: number;
  }
> = {
  RocketLaunchPad: {
    label: "ROCKET LAUNCH PAD",
    coords: { x: 28.2, y: 19.7 },
    status: "ONLINE",
    integrity: 92,
    personnel: 2,
    power: 58,
  },
  SolarArray: {
    label: "SOLAR ARRAY",
    coords: { x: 45.5, y: 35.3 },
    status: "ONLINE",
    integrity: 88,
    personnel: 1,
    power: 76,
  },
  MainHabitat: {
    label: "MAIN HABITAT",
    coords: { x: 34.1, y: 50.6 },
    status: "ONLINE",
    integrity: 95,
    personnel: 5,
    power: 64,
  },
  PlantNursery: {
    label: "PLANT NURSERY",
    coords: { x: 50.2, y: 62.1 },
    status: "ONLINE",
    integrity: 90,
    personnel: 3,
    power: 70,
  },
  CommsArray: {
    label: "COMMS ARRAY",
    coords: { x: 70.4, y: 40.8 },
    status: "ONLINE",
    integrity: 85,
    personnel: 2,
    power: 80,
  },
};

const DetailsPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { selected } = useSelection();

  const selectedLocation = selected ? Locations[selected] : null;

  useGSAP(
    () => {
      if (!panelRef.current) return;

      gsap.to(panelRef.current, {
        opacity: selected ? 1 : 0,
        x: selected ? 0 : -20,
        duration: 0.4,
        ease: "power2.out",
        delay: selected ? 0.4 : 0,
      });
    },
    { scope: panelRef, dependencies: [selected] }
  );

  return (
    <div
      ref={panelRef}
      className="absolute top-0 left-0 w-1/2 h-full"
      style={{ opacity: 0 }}
    >
      <BackButton />

      <div className="absolute bottom-10 left-10 flex flex-col gap-4 w-1/2 bg-black/30 backdrop-blur-sm border border-cyan-400/50 rounded-sm px-8 py-4 shadow-lg shadow-cyan-400/10 pointer-events-auto">
        <AccentCorners />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-headings text-cyan-300 text-xl">
              {selectedLocation?.label || "NO SELECTION"}
            </h2>
            <p className="font-body text-cyan-400/70 text-sm">
              SECTOR B-3 • COORDINATES: {selectedLocation?.coords.x}°N,{" "}
              {selectedLocation?.coords.y}°E
            </p>
          </div>
          <div className="flex flex-col gap-2 border-t border-b border-cyan-400/30 pb-4 pt-4">
            <div className="flex gap-2 items-center">
              <img
                src="images/heart-beat-icon.svg"
                alt=""
                className="w-6 h-6"
              />
              <p className="font-headings text-cyan-300 text-l">
                OPERATIONAL STATUS
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="text-cyan-400/80">Primary Systems</span>
                <span
                  className={
                    selectedLocation?.status === "ONLINE"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {selectedLocation?.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cyan-400/80">Structural Integrity</span>
                <span className="text-cyan-400">
                  {selectedLocation?.integrity}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cyan-400/80">Active Personnel</span>
                <span className="text-cyan-400">
                  {selectedLocation?.personnel}/13
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-cyan-400/80">Power Level</span>
                  <span className="text-cyan-400">
                    {selectedLocation?.power}%
                  </span>
                </div>
                <div className="relative w-full h-2 bg-black/40 border border-cyan-400/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r from-cyan-500 to-cyan-300
                        `}
                    style={{ width: `${selectedLocation?.power}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-cyan-400/70">
            <p>
              LAST UPDATE:{" "}
              {new Date().toLocaleTimeString("be-BE", {
                hour12: false,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPanel;
