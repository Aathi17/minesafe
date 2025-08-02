import React from "react";
import { useNavigate } from "react-router-dom";
import minesafeLogo from "../assets/health-insurance.png";
import TypewriterText from "../components/TypewriterText";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewMiners = () => {
    navigate("/miners");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/vecteezy_truck-is-working-in-coal-mine_2382954.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main content centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-6">
        <img
          src={minesafeLogo}
          alt="MineSafe Logo"
          className="w-28 mb-6 animate-bounce-slow"
        />
        <TypewriterText text="MineSafe" speed={100} />
        <p className="text-lg mb-6">
          Monitor miner health and safety in real-time.
        </p>
        <button
          onClick={handleViewMiners}
          className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          View Miners
        </button>
      </div>
    </div>
  );
};

export default HomePage;
