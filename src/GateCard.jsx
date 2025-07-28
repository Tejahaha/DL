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
  console.log("GateCard received data:", data); // Debug: Log the data prop

  const chartData = data?.outputs?.map((value, index) => ({
    input: `Input ${index}`,
    Output: value,
  })) || []; // Fallback to an empty array if outputs is undefined

  const renderDetails = (obj) => {
    return Object.entries(obj || {}).map(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          <p key={key}>
            <span className="font-semibold text-gray-600 capitalize">{key}:</span>{" "}
            {value.join(", ")}
          </p>
        );
      } else if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="space-y-2">
            <span className="font-semibold text-gray-600 capitalize">{key}:</span>
            <div className="pl-4">{renderDetails(value)}</div>
          </div>
        );
      } else {
        return (
          <p key={key}>
            <span className="font-semibold text-gray-600 capitalize">{key}:</span>{" "}
            {value || "N/A"}
          </p>
        );
      }
    });
  };

  return (
    <div className="border border-black/10 backdrop-blur-md bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-6 transition-transform hover:scale-105 hover:shadow-2xl duration-300">
      <h2 className="font-extrabold text-2xl mb-2 bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent drop-shadow-lg tracking-wide text-center">
        {title}
      </h2>

      <div className="space-y-2 text-sm text-black">{renderDetails(data)}</div>

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