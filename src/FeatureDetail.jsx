import GateCard from "./GateCard";
import { useNavigate, useLocation } from "react-router-dom";

export default function FeatureDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, data, loading, error } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center py-12 px-4">
      <button
        className="absolute top-6 left-6 text-gray-600 hover:text-black font-bold text-lg"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <div className="flex-1 max-w-md w-full mb-8 md:mb-0 md:mr-12">
        {/* Details only, no chart */}
        <GateCard
          title={title}
          data={data}
          loading={loading}
          error={error}
          onlyDetails
        />
      </div>
      <div className="flex-1 max-w-xl w-full">
        {/* Chart only, no details */}
        <GateCard
          title={title + " - Graph"}
          data={data}
          loading={loading}
          error={error}
          onlyChart
        />
      </div>
    </div>
  );
}
