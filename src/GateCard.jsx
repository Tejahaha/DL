import { useState, useEffect } from "react";

// Mock recharts components for this example
const ResponsiveContainer = ({ children, width, height }) => (
  <div style={{ width, height }} className="relative">
    {children}
  </div>
);

const BarChart = ({ data, children }) => {
  const maxValue = Math.max(...data.map(d => d.Output));
  return (
    <div className="relative h-full flex items-end justify-around p-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <div 
            className="w-12 bg-gradient-to-t from-purple-600 to-blue-400 rounded-t-lg transition-all duration-1000 hover:from-purple-500 hover:to-blue-300"
            style={{ 
              height: `${(item.Output / maxValue) * 120}px`,
              minHeight: '8px'
            }}
          />
          <span className="text-xs text-gray-300">{item.input}</span>
        </div>
      ))}
      {children}
    </div>
  );
};

const CartesianGrid = () => null;
const XAxis = () => null;
const YAxis = () => null;
const Tooltip = () => null;
const Legend = () => null;
const Bar = () => null;

export default function GateCard({ title, data, onlyDetails, onlyChart }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({});

  const chartData = data?.outputs?.map((value, index) => ({
    input: `Input ${index}`,
    Output: value,
  })) || [];

  useEffect(() => {
    setIsVisible(true);
    // Animate numeric values
    if (data) {
      const timer = setTimeout(() => {
        setAnimatedValues(data);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const renderDetails = (obj, depth = 0) => {
    if (!obj) return null;
    
    return Object.entries(obj).map(([key, value], index) => {
      const delay = depth * 100 + index * 50;
      
      if (Array.isArray(value)) {
        return (
          <div 
            key={key} 
            className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
              <span className="text-purple-300 font-semibold text-sm uppercase tracking-wide">{key}:</span>
            </div>
            <div className="ml-4 p-3 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-lg border border-gray-600/30">
              <span className="text-gray-300 font-mono text-sm">{value.join(", ")}</span>
            </div>
          </div>
        );
      } else if (typeof value === "object" && value !== null) {
        return (
          <div 
            key={key}
            className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
              <span className="text-emerald-300 font-bold text-base">{key}:</span>
            </div>
            <div className="ml-6 space-y-3 pl-4 border-l border-gradient-to-b from-emerald-400/50 to-transparent">
              {renderDetails(value, depth + 1)}
            </div>
          </div>
        );
      } else {
        return (
          <div 
            key={key}
            className={`group transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-800/30 to-gray-700/20 rounded-lg border border-gray-600/20 hover:border-purple-400/30 hover:from-gray-700/40 hover:to-gray-600/30 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-blue-300 font-medium text-sm">{key}:</span>
              </div>
              <span className="text-white font-mono text-sm bg-gray-900/50 px-3 py-1 rounded-full">
                {value ?? "N/A"}
              </span>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className={`relative group transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl border border-white/10 shadow-2xl">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
      </div>

      <div className="relative z-10 p-8 space-y-8">
        {/* Title with animation */}
        <div className="text-center">
          <h2 className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            {title}
          </h2>
          <div className={`w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-4 transform transition-all duration-1000 ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></div>
        </div>

        {/* Details Section */}
        {!onlyChart && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-emerald-300 uppercase tracking-wide">Neural Network Details</h3>
            </div>
            <div className="space-y-4">
              {renderDetails(data)}
            </div>
          </div>
        )}

        {/* Chart Section */}
        {!onlyDetails && chartData.length > 0 && (
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wide">Output Visualization</h3>
            </div>
            
            <div className="relative p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-600/30 backdrop-blur-sm">
              {/* Chart container with custom styling */}
              <div className="relative overflow-hidden rounded-xl">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="input" tick={{ fill: '#ffffff' }} />
                    <YAxis tick={{ fill: '#ffffff' }} />
                    <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: "1rem", border: "1px solid rgba(147, 51, 234, 0.3)" }} />
                    <Legend />
                    <Bar dataKey="Output" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Stats overlay */}
              <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600/30">
                <div className="text-xs text-gray-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Data Points: {chartData.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating action indicator */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </div>
  );
}