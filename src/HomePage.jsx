import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "https://dl-backend-0ddd.onrender.com";

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const navigate = useNavigate();

  const routes = [
    {
      title: "Manual Python Implementation",
      subtitle: "Raw Python logic for gates",
      path: "/manual",
      icon: "🔧",
      gradient: "from-emerald-500 to-teal-600",
      description: "Experience pure algorithmic power with hand-crafted Python implementations"
    },
    {
      title: "PyTorch Threshold",
      subtitle: "Manual threshold logic using tensors",
      path: "/torch-threshold",
      icon: "⚡",
      gradient: "from-blue-500 to-cyan-600",
      description: "Harness tensor operations for precise threshold calculations"
    },
    {
      title: "Trained Model (Gradient Descent)",
      subtitle: "PyTorch training for gates",
      path: "/torch-trained",
      icon: "🧠",
      gradient: "from-purple-500 to-pink-600",
      description: "Witness the beauty of gradient descent optimization in action"
    },
    {
      title: "XOR Train Results",
      subtitle: "Model output for XOR training",
      path: "/xor-train-results",
      icon: "🎯",
      gradient: "from-orange-500 to-red-600",
      description: "Explore the intricate patterns of XOR gate learning dynamics"
    },
    {
      title: "AND Testing",
      subtitle: "Predict AND logics on user input",
      path: "/test-and",
      icon: "🔮",
      gradient: "from-indigo-500 to-purple-600",
      description: "Interactive testing environment for real-time predictions"
    },
  ];

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  // Ping the backend server
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/health`);
        const data = await res.text();
        if (data.toLowerCase().includes("ok")) {
          setBackendStatus("✅ Online");
        } else {
          setBackendStatus("⚠️ Unexpected Response");
        }
      } catch (err) {
        setBackendStatus("❌ Offline");
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="relative z-10 px-6 py-20 sm:px-8">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Hero */}
        <div className="text-center mb-16 relative">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 tracking-tight leading-tight mb-4">
            Deep Learning
          </h1>
          <h2 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 font-light tracking-widest mb-4">
            VISUALIZER
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            Immerse yourself in the elegant world of neural networks and machine learning algorithms.
          </p>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-8" />
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 place-items-center max-w-7xl mx-auto px-4">
          {routes.map((route, index) => (
            <div
              key={route.path}
              className="group relative w-full sm:w-80 h-64 cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(route.path)}
            >
              <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-xl transition-all duration-500 group-hover:shadow-purple-500/20 group-hover:scale-105 group-hover:bg-white/10">
                <div className={`absolute inset-0 bg-gradient-to-br ${route.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
              </div>

              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div className="text-4xl mb-4">{route.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
                    {route.title}
                  </h2>
                  <p className="text-sm text-gray-400">{route.subtitle}</p>
                  <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                    {route.description}
                  </p>
                </div>
                <div className="flex items-center text-gray-400 group-hover:text-purple-300 transition-colors duration-300 mt-4">
                  <span className="text-sm font-medium mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore
                  </span>
                  <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center transform group-hover:translate-x-2 transition-transform duration-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-border animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Cursor follower */}
        {hoveredCard !== null && (
          <div
            className="fixed pointer-events-none z-50 w-4 h-4 bg-purple-400 rounded-full opacity-50 blur-sm"
            style={{
              left: mousePosition.x - 8,
              top: mousePosition.y - 8,
              transform: 'translate3d(0, 0, 0)'
            }}
          />
        )}

        {/* Footer */}
        <div className="text-center mt-20 text-sm text-gray-400">
          <div className="inline-flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${backendStatus.includes("Online") ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
            Neural Network Status: {backendStatus}
          </div>
        </div>
      </div>
    </div>
  );
}
