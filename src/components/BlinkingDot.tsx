import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface BlinkingDotProps {
  color: string;
  sizeMode?: boolean;
}

const BlinkingDot = ({ color, sizeMode }: BlinkingDotProps) => {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!dotRef.current) return;

      if (sizeMode) {
        gsap.fromTo(
          dotRef.current,
          { scale: 1 },
          {
            scale: 2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
          }
        );
      } else {
        gsap.fromTo(
          dotRef.current,
          { opacity: 1 },
          {
            opacity: 0.2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
          }
        );
      }
    },
    {
      scope: dotRef,
      dependencies: [sizeMode],
    }
  );

  return (
    <div
      ref={dotRef}
      className={`blinking-dot w-2 h-2 ${color} rounded-full`}
    />
  );
};

export default BlinkingDot;
