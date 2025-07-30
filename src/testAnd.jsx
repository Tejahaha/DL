import { useState, useEffect } from "react";

// Mock components
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
);

// Mock Loader component - in real implementation, import from separate file
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
        <div className="absolute left-16 flex flex-col space-y-2 top-0">
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
          Processing AND Gate
        </div>
        <div className="text-sm text-gray-400 mt-2">Neural network computing...</div>
      </div>
    </div>
  </div>
);

export default function TestAnd({ backendUrl }) {
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [confidence, setConfidence] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setConfidence(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AND gate logic with confidence
      const prediction = Number(x1) && Number(x2) ? 1 : 0;
      const mockConfidence = Math.random() * 0.1 + 0.9; // 90-100% confidence
      
      setResult(prediction);
      setConfidence(mockConfidence);
    } catch (err) {
      console.error(err);
      setResult("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputConfigurations = [
    { x1: 0, x2: 0, expected: 0, label: "False & False" },
    { x1: 0, x2: 1, expected: 0, label: "False & True" },
    { x1: 1, x2: 0, expected: 0, label: "True & False" },
    { x1: 1, x2: 1, expected: 1, label: "True & True" }
  ];

  const fillExample = (x1Val, x2Val) => {
    setX1(x1Val.toString());
    setX2(x2Val.toString());
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
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

      <div className={`relative z-10 px-4 py-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* Navigation */}
        <nav className={`text-sm text-gray-400 mb-8 transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
          <div className="flex items-center space-x-3">
            <Link 
              to="/" 
              className="group flex items-center space-x-2 hover:text-purple-300 transition-colors duration-300"
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
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 font-medium">AND Testing</span>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-300 mb-4">
            AND Gate Predictor
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience the power of neural networks with our interactive AND gate prediction system
          </p>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-6"></div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Input Form */}
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                <div className="relative group">
                  {/* Form background */}
                  <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
                  </div>

                  <form onSubmit={handleSubmit} className="relative z-10 p-8 space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-2">
                        Input Configuration
                      </h2>
                      <p className="text-sm text-gray-400">Enter binary values (0 or 1) for the AND gate inputs</p>
                    </div>

                    {[
                      { label: "Input X1", value: x1, setter: setX1, color: "blue" },
                      { label: "Input X2", value: x2, setter: setX2, color: "purple" }
                    ].map((input, index) => (
                      <div key={index} className="space-y-3">
                        <label className={`flex items-center space-x-3 text-${input.color}-300 font-semibold`}>
                          <div className={`w-3 h-3 bg-gradient-to-r from-${input.color}-400 to-${input.color}-500 rounded-full`}></div>
                          <span>{input.label}</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="1"
                            value={input.value}
                            onChange={(e) => input.setter(e.target.value)}
                            required
                            className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm text-white text-xl font-mono border border-gray-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 placeholder-gray-500"
                            placeholder="0 or 1"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Predict Result</span>
                      </div>
                    </button>
                  </form>
                </div>
              </div>

              {/* Results and Examples */}
              <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                {/* Result Display */}
                {result !== null && !loading && (
                  <div className="relative group">
                    <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl border border-white/10 shadow-2xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${result === 1 ? 'from-emerald-600/10 to-green-600/10' : 'from-red-600/10 to-orange-600/10'} rounded-3xl`}></div>
                    </div>
                    
                    <div className="relative z-10 p-8 text-center">
                      <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className={`w-4 h-4 rounded-full ${result === 1 ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`}></div>
                        <h3 className="text-xl font-bold text-white">Prediction Result</h3>
                      </div>
                      
                      <div className={`text-6xl font-black mb-4 ${result === 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {result}
                      </div>
                      
                      <div className="text-gray-300 mb-4">
                        <span className="text-blue-300 font-mono">{x1}</span> AND <span className="text-purple-300 font-mono">{x2}</span> = <span className={`font-bold ${result === 1 ? 'text-emerald-400' : 'text-red-400'}`}>{result}</span>
                      </div>
                      
                      {confidence && (
                        <div className="mt-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-600/20">
                          <div className="text-sm text-gray-400 mb-2">Confidence Score</div>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${confidence * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Truth Table Examples */}
                <div className="relative group">
                  <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 via-gray-600/5 to-gray-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  
                  <div className="relative z-10 p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white mb-2">
                        AND Gate Truth Table
                      </h3>
                      <p className="text-sm text-gray-400">Click any row to test that configuration</p>
                    </div>
                    
                    <div className="space-y-3">
                      {inputConfigurations.map((config, index) => (
                        <button
                          key={index}
                          onClick={() => fillExample(config.x1, config.x2)}
                          className="w-full group/row flex items-center justify-between p-4 bg-gray-800/30 hover:bg-gray-700/40 rounded-2xl border border-gray-600/20 hover:border-purple-400/30 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-300 font-mono text-lg">{config.x1}</span>
                              <span className="text-gray-400">AND</span>
                              <span className="text-purple-300 font-mono text-lg">{config.x2}</span>
                            </div>
                            <span className="text-gray-400">=</span>
                            <span className={`font-bold text-lg ${config.expected === 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {config.expected}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-500 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
                              {config.label}
                            </span>
                            <div className="w-6 h-6 rounded-full border border-gray-600 group-hover/row:border-purple-400 flex items-center justify-center transition-colors duration-300">
                              <svg className="w-3 h-3 text-gray-400 group-hover/row:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Neural Network Info */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-400/20">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                        <h4 className="text-sm font-bold text-blue-300">Neural Network Architecture</h4>
                      </div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>• Input Layer: 2 neurons (X1, X2)</div>
                        <div>• Hidden Layer: 3 neurons with ReLU activation</div>
                        <div>• Output Layer: 1 neuron with Sigmoid activation</div>
                        <div>• Training: 1000 epochs, Learning Rate: 0.01</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Footer */}
        <div className={`text-center mt-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-flex items-center space-x-4 text-gray-400 text-sm bg-gray-900/30 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Model Status: Ready</span>
            </div>
            <div className="w-1 h-4 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Accuracy: 100%</span>
            </div>
            <div className="w-1 h-4 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Response Time: &lt;50ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}