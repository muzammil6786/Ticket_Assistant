import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<Create />} />
          <Route path="/ticket/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}