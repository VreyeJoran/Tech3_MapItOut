import AccentCorners from "./AccentCorners";
import BlinkingDot from "./BlinkingDot";

const TitleBox = () => {
  return (
    <div className="absolute top-10 left-0 right-0 ml-auto mr-auto w-3/10 bg-black/30 backdrop-blur-sm border border-cyan-400/50 rounded-sm px-8 py-4 shadow-lg shadow-cyan-400/10 pointer-events-auto">
      <AccentCorners />

      <div className="flex items-center justify-center gap-3">
        <BlinkingDot color="bg-cyan-400" />
        <h1 className="font-headings text-cyan-300 textl">
          LUNAR BASE 01 — ACTIVE MISSION MONITOR
        </h1>
      </div>
    </div>
  );
};

export default TitleBox;
