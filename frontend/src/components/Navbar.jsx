import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="nav">
      <span className="nav-title"> Support Desk</span>

      <button className="nav-btn" onClick={() => navigate("/")}>
        New Ticket
      </button>

      {role === "admin" && (
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      )}

      {/* Login / Logout */}
      {role === "admin" ? (
        <button
          className="nav-btn"
          onClick={() => {
            localStorage.removeItem("role");
            navigate("/");
          }}
        >
          Logout
        </button>
      ) : (
        <button className="nav-btn" onClick={() => navigate("/login")}>
          Admin Login
        </button>
      )}
    </div>
  );
}