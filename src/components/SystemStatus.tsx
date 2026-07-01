import { useRef } from "react";

interface SystemStatusProps {
  label: string;
  value: number;
  icon: string;
}

const SystemStatus = ({ label, value, icon }: SystemStatusProps) => {
  const StatusBarRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-4 pb-2 border-b border-cyan-300/50">
      <img src={icon} alt={label} className="w-6 h-6" />
      <div className="flex flex-col gap-1 w-full">
        <p className="font-body text-cyan-300">{label}</p>
        <div className="relative w-full h-2 bg-black/40 border border-cyan-400/30 rounded-full overflow-hidden">
          <div
            ref={StatusBarRef}
            className={`h-full bg-linear-to-r ${
              value < 30
                ? "from-orange-500 to-orange-300"
                : "from-cyan-500 to-cyan-300"
            } transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>
        <p
          className={`font-body ${
            value < 30 ? "text-orange-500" : "text-cyan-500"
          }`}
        >
          {value}%
        </p>
      </div>
    </div>
  );
};

export default SystemStatus;
