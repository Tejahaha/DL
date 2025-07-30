export default function Loader({ message = "Processing Neural Network", submessage = "Please wait while we compute..." }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Main neural network visualization */}
        <div className="w-40 h-32 relative mb-8">
          {/* Input layer nodes */}
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
          
          {/* Hidden layer nodes */}
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
          
          {/* Output layer node */}
          <div className="absolute right-0 top-12">
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"
              style={{ 
                animationDelay: '1800ms',
                animationDuration: '2s'
              }}
            />
          </div>
          
          {/* Animated connections */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Input to hidden layer connections */}
            {[0, 1, 2].map(inputIndex => 
              [0, 1, 2, 3].map(hiddenIndex => (
                <line
                  key={`input-hidden-${inputIndex}-${hiddenIndex}`}
                  x1="20"
                  y1={18 + inputIndex * 28}
                  x2="64"
                  y2={12 + hiddenIndex * 20}
                  stroke="url(#connectionGradient)"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ 
                    animationDelay: `${inputIndex * 300 + hiddenIndex * 100}ms`,
                    animationDuration: '3s'
                  }}
                />
              ))
            )}
            
            {/* Hidden to output layer connections */}
            {[0, 1, 2, 3].map(hiddenIndex => (
              <line
                key={`hidden-output-${hiddenIndex}`}
                x1="80"
                y1={12 + hiddenIndex * 20}
                x2="136"
                y2="60"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                filter="url(#glow)"
                className="animate-pulse"
                style={{ 
                  animationDelay: `${1500 + hiddenIndex * 100}ms`,
                  animationDuration: '2.5s'
                }}
              />
            ))}
          </svg>
          
          {/* Floating data particles */}
          <div className="absolute inset-0 overflow-visible">
            {[...Array(8)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                style={{
                  left: `${10 + (i % 4) * 30}px`,
                  top: `${20 + Math.floor(i / 4) * 40}px`,
                  animationDelay: `${i * 400}ms`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Loading text with gradient animation */}
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-pulse">
              {message}
            </div>
            <div className="absolute inset-0 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 opacity-50 blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
              {message}
            </div>
          </div>
          
          <div className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
            {submessage}
          </div>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={`dot-${i}`}
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"
                style={{ 
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-8 w-64 mx-auto">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Initializing</span>
              <span>Computing</span>
              <span>Optimizing</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-1 backdrop-blur-sm border border-gray-700/30">
              <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 h-1 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          {/* Status indicators */}
          <div className="flex justify-center space-x-6 mt-6 text-xs">
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>GPU Active</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Model Loading</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Optimizing</span>
            </div>
          </div>
        </div>
        
        {/* Ambient glow effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-emerald-600/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}