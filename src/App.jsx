import { useState, useEffect } from "react";
import GateCard from "./GateCard";

const BACKEND_URL = "https://dl-backend-0ddd.onrender.com"; // Replace with your backend URL

function App() {
  const [manual, setManual] = useState(null);
  const [torch, setTorch] = useState(null);
  const [trained, setTrained] = useState(null);
  const [xorTrainResults, setXorTrainResults] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/manual`).then(res => res.json()).then(setManual);
    fetch(`${BACKEND_URL}/torch-threshold`).then(res => res.json()).then(setTorch);
    fetch(`${BACKEND_URL}/torch-trained`).then(res => res.json()).then(setTrained);
    fetch(`${BACKEND_URL}/xor-train-results`).then(res => res.json()).then(setXorTrainResults);

  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-100">McCulloch's Pitts Demonstration</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {manual && <GateCard title="Manual Python Implementation" data={manual} />}
        {torch && <GateCard title="PyTorch Threshold" data={torch} />}
        {trained && <GateCard title="Trained Model (Gradient Descent)" data={trained} />}
        {xorTrainResults && <GateCard title="XOR Train Results" data={xorTrainResults} />}
      </div>
    </div>
  );
}

export default App;
