import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <span className="nav-title"> Support Desk</span>

      <button className="nav-btn" onClick={() => navigate("/")}>
        Dashboard
      </button>

      <button className="nav-btn" onClick={() => navigate("/new")}>
        + New Ticket
      </button>
    </div>
  );
}