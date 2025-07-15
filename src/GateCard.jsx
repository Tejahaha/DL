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
  const chartData = data.outputs.map((value, index) => ({
    input: `Input ${index}`,
    Output: value,
  }));

  return (
    <div className="border border-white/30 backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-6 transition-transform hover:scale-105 hover:shadow-2xl duration-300">
      <h2 className="font-extrabold text-2xl mb-2 bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide text-center">
        {title}
      </h2>

      <div className="space-y-2 text-sm text-white/90">
        <p>
          <span className="font-semibold text-blue-100">Type:</span> {data.type}
        </p>
        <p>
          <span className="font-semibold text-blue-100">Gate:</span> {data.gate}
        </p>
        <p>
          <span className="font-semibold text-blue-100">Weights:</span>{" "}
          {Array.isArray(data.weights) ? data.weights.join(", ") : data.weights}
        </p>
        {data.bias && (
          <p>
            <span className="font-semibold text-blue-100">Bias:</span>{" "}
            {data.bias.join(", ")}
          </p>
        )}
        <p>
          <span className="font-semibold text-blue-100">Threshold:</span>{" "}
          {data.threshold || "-"}
        </p>
        <p>
          <span className="font-semibold text-blue-100">Accuracy:</span>{" "}
          <span className="px-2 py-1 rounded bg-white/20 text-white font-bold">
            {data.accuracy}
          </span>
        </p>
      </div>

      <div className="rounded-xl bg-white/10 backdrop-blur-sm shadow-inner p-4 hover:bg-white/20 transition-colors duration-300">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis
              dataKey="input"
              tick={{ fill: '#e0e7ff', fontWeight: 'bold', fontSize: 13 }}
              axisLine={{ stroke: '#93c5fd' }}
            />
            <YAxis
              tick={{ fill: '#e0e7ff', fontWeight: 'bold', fontSize: 13 }}
              axisLine={{ stroke: '#93c5fd' }}
            />
            <Tooltip
              wrapperStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                color: '#e0e7ff',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)',
              }}
            />
            <Legend wrapperStyle={{ color: '#e0e7ff', fontWeight: 'bold' }} />
            <Bar dataKey="Output" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
