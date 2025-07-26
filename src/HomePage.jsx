import { Link } from "react-router-dom";

export default function HomePage() {
  const routes = [
    {
      title: "Manual Python Implementation",
      subtitle: "Raw Python logic for gates",
      path: "/manual"
    },
    {
      title: "PyTorch Threshold",
      subtitle: "Manual threshold logic using tensors",
      path: "/torch-threshold"
    },
    {
      title: "Trained Model (Gradient Descent)",
      subtitle: "PyTorch training for gates",
      path: "/torch-trained"
    },
    {
      title: "XOR Train Results",
      subtitle: "Model output for XOR training",
      path: "/xor-train-results"
    },
    {
      title: "AND TESTING",
      subtitle: "Predict AND logics on user input",
      path: "/test-and"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black px-6 py-12">
      <h1 className="text-5xl font-extrabold text-center text-black drop-shadow-md mb-16">
        Deep Learning Explorer
      </h1>

      {/* Centered flex container */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 max-w-6xl w-full justify-items-center">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="group relative w-72 h-44 bg-black/5 border border-black/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              {/* Hover background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-500/20 to-purple-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

              {/* Title and subtitle container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center space-y-1">
                <h2 className="text-lg font-semibold text-black group-hover:translate-y-[-2px] transition-transform duration-300 ease-out group-hover:text-purple-800">
                  {route.title}
                </h2>
                <p className="text-sm text-gray-600 group-hover:text-black transition-colors duration-300">
                  {route.subtitle}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full z-20" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
