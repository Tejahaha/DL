import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GateCard from "./GateCard";
import Loader from "./Loader";

export default function Results({ backendUrl }) {
  const { route } = useParams();
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${backendUrl}/${route}`)
      .then((res) => res.json())
      .then((data) => {
        setRouteData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [route, backendUrl]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: routeData?.title || "Results", path: `/${route}` },
  ];

  if (loading) {
    return <Loader />;
  }

  if (!routeData) {
    return <div className="text-center text-black">No data available for this route.</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-4">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.path}>
            <Link to={crumb.path} className="hover:text-black">
              {crumb.name}
            </Link>
            {index < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
      </nav>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-black/10 text-black rounded-lg shadow hover:bg-black/20 transition"
      >
        Back
      </button>

      {route === "xor-train-results" ? (
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">XOR Train Results</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Input</th>
                <th className="px-4 py-2 border-b">Predicted</th>
                <th className="px-4 py-2 border-b">Actual</th>
              </tr>
            </thead>
            <tbody>
              {routeData.results.map((result, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border-b">
                    [{result.input.join(", ")}]
                  </td>
                  <td className="px-4 py-2 border-b">{result.predicted}</td>
                  <td className="px-4 py-2 border-b">{result.actual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center">
          <GateCard title={routeData.title || "Results"} data={routeData} />
        </div>
      )}
    </div>
  );
}
