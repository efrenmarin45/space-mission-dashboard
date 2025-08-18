import Galaxy from "../util/galaxy.jsx";
import { useNavigate } from "@tanstack/react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "#000000",
      }}
    >
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={3}
        glowIntensity={0.2}
        saturation={0.2}
        hueShift={100}
        twinkleIntensity={0.2}
        rotationSpeed={0.1}
        repulsionStrength={0.5}
        starSpeed={0.1}
      />
      <button
        className="font-family-space -ml-30 text-shadow-black text-shadow-lg absolute left-1/2 top-1/2 z-10 -mt-10 h-20 w-60 rounded-xl border border-gray-800 bg-gradient-to-b from-[#5a5a5a] via-[#2a2a2a] to-[#1a1a1a] text-3xl shadow-[0_6px_0_0_#0a0a0a,0_12px_24px_rgba(0,0,0,0.4)] transition-all duration-150 after:pointer-events-none after:absolute after:-inset-0.5 after:z-[-1] after:animate-ping after:rounded-lg after:bg-slate-500 after:opacity-30 hover:-translate-y-1 hover:-translate-x-1 hover:bg-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 hover:shadow-[0_4px_0_0_#531313,0_8px_16px_rgba(0,0,0,0.4)] hover:after:animate-none hover:after:opacity-0 active:translate-y-1 active:translate-x-1 active:shadow-[0_1px_0_0_#0a0a0a]"
        onClick={() => navigate({ to: "/dashboard" })}
      >
        Launch
      </button>
    </div>
  );
}
