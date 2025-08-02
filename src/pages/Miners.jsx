import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import minesafeLogo from "../assets/health-insurance.png";

const miners = [
  { id: "MINE001", status: "Active", area: "Sector 9", seismic: "Low" },
  { id: "MINE002", status: "Inactive", area: "Sector 9", seismic: "Moderate" },
  { id: "MINE003", status: "Active", area: "Kolar Shaft A", seismic: "High" },
  { id: "MINE004", status: "Inactive", area: "Sector 9", seismic: "Low" },
  { id: "MINE005", status: "Active", area: "Sector 9", seismic: "Low" },
  { id: "MINE006", status: "Inactive", area: "Kolar Shaft A", seismic: "Moderate" },
];

export default function Miners() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const zoneData = {
    "Sector 9": ["MINE001", "MINE002", "MINE004", "MINE005"],
    "Kolar Shaft A": ["MINE003", "MINE006"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1308] to-[#2b1d0e] text-white font-sans relative">
      
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-lg bg-[#1a1207]">
        <div className="flex items-center">
          <img src={minesafeLogo} alt="MineSafe Logo" className="w-10 h-10 mr-3" />
          <h1 className="text-2xl font-extrabold text-yellow-400 tracking-wide">
            Miner Dashboard
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col lg:flex-row px-6 py-8 gap-8">

        {/* Left - Miners */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-yellow-500 mb-6">Miner's Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {miners.map((miner, index) => (
              <div
                key={miner.id}
                className="relative bg-[#3a2f2f] border border-[#52443d] rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                onClick={() => navigate(`/dashboard/${miner.id}`)}
                onMouseEnter={() => setHovered(miner.id)}
                onMouseLeave={() => setHovered(null)}
                tabIndex="0"
              >
                <div className="absolute -top-4 -left-4 bg-yellow-500 text-black text-sm font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-md">
                  {index + 1 < 10 ? `00${index + 1}` : index + 1}
                </div>
                <h3 className="text-lg font-bold">{miner.id}</h3>
                <p className="mt-2 text-sm">
                  <span className={`font-semibold ${miner.status === "Active" ? "text-green-400" : "text-red-400"}`}>
                    {miner.status}
                  </span>
                </p>
                <p className={`text-sm font-semibold ${
                    miner.seismic === "High" ? "text-red-400"
                    : miner.seismic === "Moderate" ? "text-yellow-400"
                    : "text-green-400"
                  }`}>
                  {miner.seismic} Seismic
                </p>
                <p className="text-sm">Area: {miner.area}</p>

                {/* Tooltip */}
                {hovered === miner.id && (
                  <div className="absolute z-50 top-1/2 left-full ml-4 -translate-y-1/2 bg-[#51443e] bg-opacity-90 backdrop-blur-md text-white text-xs rounded-xl shadow-lg px-4 py-3 w-56">
                    <p>
                      Status:{" "}
                      <span className={miner.status === "Active" ? "text-green-400" : "text-red-400"}>
                        {miner.status}
                      </span>
                    </p>
                    <p>Seismic: {miner.seismic}</p>
                    <p>Area: {miner.area}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Zone Monitoring */}
        <div className="w-full lg:w-80">
          <h2 className="text-xl font-bold text-yellow-500 mb-6">Zone Monitoring</h2>
          <div className="space-y-5">
            {Object.entries(zoneData).map(([zone, minerIds]) => (
              <div key={zone} className="bg-[#3a2f2f] bg-opacity-80 backdrop-blur-md border border-[#52443d] shadow-xl rounded-2xl p-5">
                <h3 className="text-yellow-400 font-bold text-md">{zone}</h3>
                <p className="text-sm mt-1">Assigned Miners: {minerIds.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
