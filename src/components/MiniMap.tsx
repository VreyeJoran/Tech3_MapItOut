import { useGSAP } from "@gsap/react";
import AccentCorners from "./AccentCorners";
import BlinkingDot from "./BlinkingDot";
import { useRef } from "react";
import gsap from "gsap";
import RadarIcon from "./RadarIcon";

gsap.registerPlugin(useGSAP);

interface MiniMapProps {
  yaw: number;
}

const MiniMap = ({ yaw }: MiniMapProps) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current) return;

      gsap.to(lineRef.current, {
        rotateZ: 360,
        duration: 4,
        repeat: -1,
        ease: "linear",
      });
    },
    {
      scope: lineRef,
    }
  );
  return (
    <div className="absolute top-10 right-10 w-15/100 aspect-square bg-black/30 backdrop-blur-sm border border-cyan-400/50 rounded-sm px-4 py-4 shadow-lg shadow-cyan-400/10 pointer-events-auto">
      <AccentCorners />

      <div className="flex flex-col gap-2 h-full">
        <h2 className="font-headings text-cyan-300 text-l">RADAR MAP</h2>
        <div className="relative w-full h-full flex justify-center items-center bg-black/30 backdrop-blur-sm border border-cyan-400/50 rounded-sm overflow-hidden">
          <div
            className="absolute w-full aspect-square flex justify-center items-center"
            style={{
              transform: `rotate(${yaw}rad)`,
            }}
          >
            <img
              src="images/radar-map.svg"
              alt="Radar Map"
              className="absolute w-full aspect-square scale-135"
            />
            <BlinkingDot color="bg-cyan-400" sizeMode />

            <div
              ref={lineRef}
              className="absolute right-0 w-1/2 h-0.5 bg-linear-to-r from-cyan-300/50 to-transparent origin-left"
            ></div>

            <RadarIcon
              x={24}
              y={45}
              icon={"images/radar-icon.svg"}
              label="Comms Array"
              delay={1.8}
              rotation={-yaw}
            />

            <RadarIcon
              x={40}
              y={59}
              icon={"images/solar-icon.svg"}
              label="Solar Array 01"
              delay={0.8}
              rotation={-yaw}
            />

            <RadarIcon
              x={60}
              y={55}
              icon={"images/solar-icon.svg"}
              label="Solar Array 02"
              delay={0}
              rotation={-yaw}
            />

            <RadarIcon
              x={68}
              y={40}
              icon={"images/rocket-icon.svg"}
              label="Rocket Launch Pad"
              delay={3.6}
              rotation={-yaw}
            />

            <RadarIcon
              x={55}
              y={25}
              icon={"images/plant-icon.svg"}
              label="Plant Nursery"
              delay={3.2}
              rotation={-yaw}
            />

            <RadarIcon
              x={38}
              y={30}
              icon={"images/home-icon.svg"}
              label="Main Habitat"
              delay={2.4}
              rotation={-yaw}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
