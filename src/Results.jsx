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
    if (backendUrl) {
      fetch(`${backendUrl}/${route}`) // Use backendUrl for the full URL
        .then((res) => res.json())
        .then((data) => {
          setRouteData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      console.error("Backend URL is not defined.");
      setLoading(false);
    }
  }, [route, backendUrl]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: routeData?.title || "Results", path: `/${route}` },
  ];

  if (loading) {
    return <Loader />;
  }

  if (!routeData) {
    return <div className="text-center text-gray-300">No data available for this route.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-4">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.path}>
            <Link to={crumb.path} className="hover:text-gray-200">
              {crumb.name}
            </Link>
            {index < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
      </nav>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg shadow hover:bg-gray-700 transition"
      >
        Back
      </button>

      <div className="flex justify-center">
        <GateCard title={routeData.title || "Results"} data={routeData} />
      </div>
    </div>
  );
}
