import { useRef } from "react";
import MiniMap from "../components/MiniMap";
import StatusBox from "../components/StatusBox";
import TitleBox from "../components/TitleBox";
import DetailsPanel from "../components/DetailsPanel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

interface UIOverlayProps {
  yaw: number;
}

const UIOverlay = ({ yaw }: UIOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!overlayRef.current) return;

      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    },
    { scope: overlayRef }
  );

  return (
    <div
      ref={overlayRef}
      className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden"
    >
      <TitleBox />
      <MiniMap yaw={yaw} />
      <StatusBox />
      <DetailsPanel />
    </div>
  );
};

export default UIOverlay;
