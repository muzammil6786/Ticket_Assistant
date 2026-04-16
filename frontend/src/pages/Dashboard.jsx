import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:5000/api/tickets")
      .then((r) => r.json())
      .then(setTickets);
  }, []);

  return (
    <>
      <div className="section-title">All tickets</div>

      <div className="card" style={{ padding: 0 }}>
        {tickets.map((t) => (
          <div
            key={t._id}
            className="ticket-row"
            onClick={() => navigate(`/ticket/${t._id}`)} 
          >
            <div className="ticket-desc">{t.description}</div>

            <div className="ticket-meta">
              {/*  Category badge */}
              <span className={`badge badge-${t.category?.toLowerCase()}`}>
                {t.category || "OTHER"}
              </span>

              {/*  Status */}
              <span className={`badge badge-${t.status.toLowerCase()}`}>
                {t.status}
              </span>

              <span className="ticket-time">
                {new Date(t.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}