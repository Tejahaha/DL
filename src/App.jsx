import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Results from "./Results";
import TestAnd from "./testAnd";

const BACKEND_URL = "https://dl-backend-0ddd.onrender.com"; // Ensure this is the correct backend UR

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:route" element={<Results backendUrl={BACKEND_URL} />} />
          <Route path="/test-and" element={<TestAnd backendUrl={BACKEND_URL} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
