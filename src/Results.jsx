import { useState, useEffect } from "react";

// Mock components for navigation
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
);

// Mock loader component - in real implementation, import from separate file
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-40 h-32 relative mb-8">
        <div className="absolute left-0 flex flex-col space-y-4 top-2">
          {[0, 1, 2].map((i) => (
            <div
              key={`input-${i}`}
              className="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-blue-400/30"
              style={{ 
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
        <div className="absolute Left-16 flex flex-col space-y-2 top-0">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`hidden-${i}`}
              className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg shadow-purple-400/30"
              style={{ 
                animationDelay: `${800 + i * 150}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
        <div className="absolute right-0 top-12">
          <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"
            style={{ 
              animationDelay: '1800ms',
              animationDuration: '2s'
            }}
          />
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-pulse">
          Processing Neural Network
        </div>
        <div className="text-sm text-gray-400 mt-2">Computing results...</div>
      </div>
    </div>
  </div>
);

// Mock GateCard component
const GateCard = ({ title, data }) => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl border border-white/10 shadow-2xl p-8">
      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 text-center mb-8">
        {title}
      </h2>
      <div className="text-gray-300 space-y-4">
        {data && Object.entries(data).map(([key, value]) => (
          <div key={key} className="p-4 bg-gray-800/30 rounded-lg border border-gray-600/20">
            <span className="text-blue-300 font-medium">{key}: </span>
            <span className="text-white">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Results({ backendUrl }) {
  // Mock route parameter
  const route = "manual"; // This would come from useParams() in real implementation
  
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const extractData = (data) => (data?.results ? extractData(data.results) : data);

  const navigate = (direction) => {
    console.log(`Navigating ${direction}`);
  };

  useEffect(() => {
    setLoading(true);
    setIsVisible(false);
    
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        title: "Manual Python Implementation Results",
        gates: ["AND", "OR", "XOR"],
        accuracy: 0.95,
        outputs: [1, 0, 1, 0],
        parameters: {
          learningRate: 0.01,
          epochs: 1000,
          batchSize: 32
        }
      };
      
      setRouteData(extractData(mockData));
      setLoading(false);
      
      // Trigger entrance animation
      setTimeout(() => setIsVisible(true), 100);
    }, 2000);
  }, [route, backendUrl]);

  if (loading) return <Loader />;
  if (!routeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m6.938-9.938a9 9 0 11-13.856 0" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">No Data Available</h3>
          <p className="text-gray-400">Unable to retrieve neural network results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 p-6 space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Navigation Breadcrumb */}
        <nav className={`transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
          <div className="flex items-center space-x-3 text-sm">
            <Link 
              to="/" 
              className="group flex items-center space-x-2 text-gray-400 hover:text-purple-300 transition-colors duration-300"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center group-hover:border-purple-400/60 transition-colors duration-300">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span>Home</span>
            </Link>
            
            <div className="text-gray-600">/</div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
              <span className="text-purple-300 font-medium">{routeData?.title || "Results"}</span>
            </div>
          </div>
        </nav>

        {/* Action Buttons */}
        <div className={`flex flex-wrap gap-4 transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center space-x-3 bg-gradient-to-r from-gray-800/80 to-gray-700/60 hover:from-gray-700/80 hover:to-gray-600/60 text-white px-6 py-3 rounded-2xl border border-gray-600/30 hover:border-purple-400/30 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-purple-500/10"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-medium">Back</span>
          </button>

          <button className="group flex items-center space-x-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-purple-300 px-6 py-3 rounded-2xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-purple-500/20">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400/30 to-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <span className="font-medium">Export Data</span>
          </button>

          <button className="group flex items-center space-x-3 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 hover:from-emerald-600/30 hover:to-cyan-600/30 text-emerald-300 px-6 py-3 rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/20">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="font-medium">Refresh</span>
          </button>
        </div>

        {/* Main Content */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <GateCard title={routeData.title || "Results"} data={routeData} />
        </div>

        {/* Performance Metrics */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { 
                label: "Accuracy", 
                value: `${((routeData?.accuracy || 0.95) * 100).toFixed(1)}%`, 
                color: "emerald",
                icon: "M9 12l2 2 4-4"
              },
              { 
                label: "Processing Time", 
                value: "0.043s", 
                color: "blue",
                icon: "M12 8v4l3 3"
              },
              { 
                label: "Data Points", 
                value: routeData?.outputs?.length || 4, 
                color: "purple",
                icon: "M7 12l3-3 3 3 4-4"
              }
            ].map((metric, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm"></div>
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-${metric.color}-600/20 to-${metric.color}-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`}></div>
                
                <div className="relative z-10 p-6 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r from-${metric.color}-500/20 to-${metric.color}-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <svg className={`w-6 h-6 text-${metric.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.icon} />
                    </svg>
                  </div>
                  <div className={`text-2xl font-bold text-${metric.color}-300 mb-2`}>{metric.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-flex items-center space-x-3 text-gray-400 text-sm bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Neural Network Processing Complete</span>
            <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
}