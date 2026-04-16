import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    // BLOCK NON-ADMIN
    if (role !== "admin") {
      navigate("/login");
      return;
    }

    fetch("https://ticket-assistant-4liq.onrender.com/api/tickets")
      .then((r) => r.json())
      .then(setTickets);
  }, []);

  return (
    <>
      <div className="section-title">Admin Dashboard</div>

      <div className="card" style={{ padding: 0 }}>
        {tickets.map((t) => (
          <div
            key={t._id}
            className="ticket-row"
            onClick={() => navigate(`/ticket/${t._id}`)}
          >
            <div className="ticket-desc">{t.description}</div>

            <div className="ticket-meta">
              <span className={`badge badge-${t.category?.toLowerCase()}`}>
                {t.category}
              </span>

              <span className={`badge badge-${t.status.toLowerCase()}`}>
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}