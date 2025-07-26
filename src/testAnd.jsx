import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function TestAnd({ backendUrl }) {
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/test-and`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x1: Number(x1), x2: Number(x2) }),
      });
      const data = await response.json();
      setResult(data.pred);
    } catch (error) {
      console.error("Error predicting AND:", error);
      setResult("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-black">
          Home
        </Link>{" "}
        /{" "}
        <span className="text-gray-800 font-semibold">AND Testing</span>
      </nav>

      <h2 className="text-3xl font-bold text-center mb-8">
        AND Prediction Using Neural Network
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-black/5 p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">X1:</label>
            <input
              type="number"
              name="x1"
              min="0"
              max="1"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">X2:</label>
            <input
              type="number"
              name="x2"
              min="0"
              max="1"
              value={x2}
              onChange={(e) => setX2(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
          >
            Predict
          </button>
        </form>
      )}

      {result !== null && !loading && (
        <h3 className="mt-6 text-xl font-semibold text-center">
          Prediction: <span className="text-indigo-600">{result}</span>
        </h3>
      )}
    </div>
  );
}
