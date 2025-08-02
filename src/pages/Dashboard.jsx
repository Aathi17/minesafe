import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { RotateCcw, Sun, Moon, ArrowLeft } from "lucide-react";
import logo from "../assets/health-insurance.png";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const dummyMinerDetails = {
  MINE001: {
    name: "Abinav",
    location: "Kolar Gold Fields",
    photo: "",
  },
  MINE002: {
    name: "Aravind",
    location: "Bharatpur Mines",
    photo: "",
  },
  MINE003: {
    name: "Dhanush",
    location: "Jharkhand Sector 9",
    photo: "",
  },
  MINE004: {
    name: "Karna",
    location: "Singareni Coal Fields",
    photo: "",
  },
};

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const miner = dummyMinerDetails[id] || {
    name: "Unknown Miner",
    location: "Unknown Location",
    photo: "https://via.placeholder.com/150",
  };

  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [showContact, setShowContact] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [co2, setCO2] = useState(400);
  const [oxygen, setOxygen] = useState(98);
  const [battery, setBattery] = useState(100);

  const fetchData = () => {
    const prevHR = data[data.length - 1] || 80;
    const heartRate = Math.max(70, Math.min(120, prevHR + Math.floor(Math.random() * 5 - 2)));

    const co2Level = Math.max(350, Math.min(550, co2 + Math.floor(Math.random() * 10 - 5)));
    const batteryLevel = Math.max(90, Math.min(100, battery - Math.random() * 0.2));
    const oxygenLevel = Math.max(94, Math.min(100, 98 + Math.floor(Math.random() * 3 - 1)));

    setData((prev) => [...prev.slice(-29), heartRate]);
    setLabels((prev) => [...prev.slice(-29), new Date().toLocaleTimeString()]);
    setCO2(co2Level);
    setBattery(batteryLevel);
    setOxygen(oxygenLevel);
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setData([]);
    setLabels([]);
  };

  return (
    <div className={`min-h-screen p-6 font-sans relative transition-colors duration-500 ${darkMode ? "bg-[#2b1d0e] text-white" : "bg-white text-black"}`}>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 shadow z-50"
      >
        <ArrowLeft className="text-black" />
      </button>

      <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 shadow"
        >
          {darkMode ? <Sun className="text-black" /> : <Moon />}
        </button>
        <img src={logo} alt="MineSafe Logo" className="w-10 h-10" />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400 drop-shadow-lg">
        🛡️ Miner Health Dashboard
      </h1>

      <div className={`flex flex-col md:flex-row items-center justify-between ${darkMode ? "bg-[#3a2f2f]" : "bg-yellow-100"} rounded-2xl shadow-xl p-6 mb-8 gap-6`}>
        <div className="flex items-center gap-6 flex-wrap justify-between w-full">
          <div className="flex items-center gap-6">
            <img
              src={miner.photo}
              alt="Miner"
              className="w-32 h-40 object-cover rounded-xl border-4 border-yellow-500"
            />
            <div>
              <p className="text-xl font-semibold flex items-center gap-2">
                🧑‍🏭 {miner.name}
                <button
                  onClick={() => setShowContact(true)}
                  className="ml-3 flex items-center gap-1 bg-green-500 hover:bg-green-600 text-black font-semibold px-3 py-1 rounded-xl shadow-md transition text-sm"
                >
                  📞 Contact
                </button>
              </p>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                ID: {id}
              </p>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                ⛏️ {miner.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "❤️ Heart Rate", value: `${data[data.length - 1] || "--"} bpm`, color: "text-red-400" },
          { label: "🌡️ Body Temp", value: "36.7°C", color: "text-orange-400" },
          { label: "🫁 Oxygen Level", value: `${oxygen}%`, color: "text-blue-400" },
          { label: "🚶 Motion", value: "Active", color: "text-lime-400" },
          { label: "⚠️ Status", value: "Normal", color: "text-green-400" },
          { label: "🛑 CO₂ Level", value: `${co2} ppm`, color: "text-pink-400" },
        ].map((vital, idx) => (
          <div key={idx} className="bg-[#4a3a2c] rounded-2xl p-6 shadow-md text-center">
            <h2 className="text-sm text-gray-300 mb-2">{vital.label}</h2>
            <p className={`text-2xl font-bold ${vital.color}`}>{vital.value}</p>
          </div>
        ))}
      </div>

      <div className={`rounded-2xl shadow-xl p-4 mb-6 ${darkMode ? "bg-[#3a2f2f]" : "bg-yellow-100"}`}>
        <h2 className="text-center text-sm mb-4 text-gray-600 dark:text-red-700">
          📊 ECG Sensor Data
        </h2>
        <div className="h-[300px]">
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Heart Rate",
                  data,
                  borderColor: "#facc15",
                  backgroundColor: "rgba(250, 204, 21, 0.1)",
                  borderWidth: 2,
                  tension: 0.3,
                  pointRadius: 0,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  min: 60,
                  max: 130,
                  ticks: {
                    color: darkMode ? "#d1d5db" : "#374151",
                  },
                  grid: {
                    color: darkMode ? "#4b5563" : "#d1d5db",
                  },
                },
                x: {
                  ticks: {
                    color: darkMode ? "#d1d5db" : "#374151",
                    maxTicksLimit: 10,
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#e5e7eb",
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: darkMode ? "#fef3c7" : "#111827",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-xl shadow-md transition"
        >
          <RotateCcw size={18} /> Reset ECG Data
        </button>
      </div>

      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className={`p-6 rounded-2xl shadow-2xl w-full max-w-md ${darkMode ? "bg-[#3a2f2f] text-white" : "bg-white text-black"}`}>
            <h3 className="text-xl font-semibold mb-4 text-yellow-500">
              Contact {miner.name}
            </h3>
            <textarea
              className={`w-full h-32 p-3 rounded-lg border ${darkMode ? "bg-[#4a3a2c] border-yellow-500 text-white" : "bg-gray-100 border-yellow-700 text-black"}`}
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowContact(false)}
                className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Message sent to ${miner.name}: ${message}`);
                  setMessage("");
                  setShowContact(false);
                }}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-black font-bold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
