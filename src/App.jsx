import { useState, useEffect } from "react";
import GateCard from "./GateCard";

function App() {
  const [manual, setManual] = useState(null);
  const [torch, setTorch] = useState(null);
  const [trained, setTrained] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/manual").then(res => res.json()).then(setManual);
    fetch("http://localhost:8000/torch-threshold").then(res => res.json()).then(setTorch);
    fetch("http://localhost:8000/torch-trained").then(res => res.json()).then(setTrained);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 space-y-8 text-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-100">McCulloch's Pitts Demonstration</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {manual && <GateCard title="Manual Python Implementation" data={manual} />}
        {torch && <GateCard title="PyTorch Threshold" data={torch} />}
        {trained && <GateCard title="Trained Model (Gradient Descent)" data={trained} />}
      </div>
    </div>
  );
}

export default App;
