import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tickets/${id}`)
      .then((r) => r.json())
      .then(setTicket);
  }, [id]);

  if (!ticket) return <p>Loading...</p>;

  //  RESOLVE
  const resolve = async () => {
    await fetch(`http://localhost:5000/api/tickets/${id}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "RESOLVED" }),
    });

    setTicket((prev) => ({ ...prev, status: "RESOLVED" }));
  };

  //  REOPEN
  const reopen = async () => {
    await fetch(`http://localhost:5000/api/tickets/${id}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "OPEN" }),
    });

    setTicket((prev) => ({ ...prev, status: "OPEN" }));
  };

  //  DELETE
  const deleteTicket = async () => {
    await fetch(`http://localhost:5000/api/tickets/${id}`, {
      method: "DELETE",
    });

    alert("Deleted");

    navigate("/"); // 🔥 CORRECT WAY
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="card">
        <h3>{ticket.description}</h3>

        <p>
          <b>Category:</b>{" "}
          <span className={`badge badge-${ticket.category.toLowerCase()}`}>
            {ticket.category}
          </span>
        </p>

        {/* OPTIONAL */}
        {ticket.aiCategory && (
          <p>AI Category: {ticket.aiCategory}</p>
        )}

        <div className="ai-block">
          {!ticket.aiReply ? (
            <span>⏳ AI generating response...</span>
          ) : (
            ticket.aiReply
          )}
        </div>

        {/* ✅ BUTTON SWITCH */}
        {ticket.status === "OPEN" ? (
          <button className="btn btn-success" onClick={resolve}>
            ✓ Mark Resolved
          </button>
        ) : (
          <button className="btn btn-sm" onClick={reopen}>
            ↺ Reopen Ticket
          </button>
        )}

        {/* DELETE */}
        <button className="btn btn-sm" onClick={deleteTicket}>
          🗑 Delete Ticket
        </button>
      </div>
    </>
  );
}