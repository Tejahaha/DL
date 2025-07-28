import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import GateCard from "./GateCard";
import Loader from "./Loader";

export default function Results({ backendUrl }) {
  const { route } = useParams();
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const extractData = (data) => {
    // Recursively extract the deepest "results" object
    if (data?.results) {
      return extractData(data.results);
    }
    return data;
  };

  useEffect(() => {
    setLoading(true);
    console.log(`Fetching data from: ${backendUrl}/${route}`); // Debug: Log the fetch URL
    if (backendUrl) {
      fetch(`${backendUrl}/${route}`)
        .then((res) => {
          console.log("Response status:", res.status); // Debug: Log response status
          return res.json();
        })
        .then((data) => {
          console.log("Fetched data:", data); // Debug: Log the fetched data
          const extractedData = extractData(data); // Extract the relevant data
          console.log("Extracted data:", extractedData); // Debug: Log the extracted data
          setRouteData(extractedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Debug: Log fetch errors
          setLoading(false);
        });
    } else {
      console.error("Backend URL is not defined."); // Debug: Log missing backend URL
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
    console.warn("No route data available."); // Debug: Log when routeData is null
    return <div className="text-center text-gray-300">No data available for this route.</div>;
  }

  console.log("Passing data to GateCard:", routeData); // Debug: Log data passed to GateCard

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
