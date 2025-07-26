import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GateCard({ title, data }) {
  const chartData = data?.outputs?.map((value, index) => ({
    input: `Input ${index}`,
    Output: value,
  })) || []; // Fallback to an empty array if data or outputs is undefined

  return (
    <div className="border border-black/10 backdrop-blur-md bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-6 transition-transform hover:scale-105 hover:shadow-2xl duration-300">
      <h2 className="font-extrabold text-2xl mb-2 bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent drop-shadow-lg tracking-wide text-center">
        {title}
      </h2>

      <div className="space-y-2 text-sm text-black">
        <p>
          <span className="font-semibold text-gray-600">Type:</span> {data?.type || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Gate:</span> {data?.gate || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Weights:</span>{" "}
          {Array.isArray(data?.weights) ? data.weights.join(", ") : data?.weights || "N/A"}
        </p>
        {data?.bias && (
          <p>
            <span className="font-semibold text-gray-600">Bias:</span>{" "}
            {data.bias.join(", ")}
          </p>
        )}
        <p>
          <span className="font-semibold text-gray-600">Threshold:</span>{" "}
          {data?.threshold || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Accuracy:</span>{" "}
          <span className="px-2 py-1 rounded bg-black/10 text-black font-bold">
            {data?.accuracy || "N/A"}
          </span>
        </p>
      </div>

      <div className="rounded-xl bg-black/10 backdrop-blur-sm shadow-inner p-4 hover:bg-black/20 transition-colors duration-300">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
            <XAxis
              dataKey="input"
              tick={{ fill: '#000000', fontWeight: 'bold', fontSize: 13 }}
              axisLine={{ stroke: '#000000' }}
            />
            <YAxis
              tick={{ fill: '#000000', fontWeight: 'bold', fontSize: 13 }}
              axisLine={{ stroke: '#000000' }}
            />
            <Tooltip
              wrapperStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '0.5rem',
                color: '#000000',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)',
              }}
            />
            <Legend wrapperStyle={{ color: '#000000', fontWeight: 'bold' }} />
            <Bar dataKey="Output" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}