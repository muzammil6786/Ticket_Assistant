import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [ticket, setTicket] = useState(null);
  const [editing, setEditing] = useState(false);
  const [reply, setReply] = useState("");

  //  Fetch ticket
  useEffect(() => {
    fetch(`https://ticket-assistant-4liq.onrender.com/api/tickets/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setTicket(data);
        setReply(data.adminReply || "");
      });
  }, [id]);

  if (!ticket) return <p>Loading...</p>;

  // 🔹 Save admin reply
  const saveReply = async () => {
    await fetch(
      `https://ticket-assistant-4liq.onrender.com/api/tickets/${id}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply }),
      }
    );

    setTicket((prev) => ({
      ...prev,
      adminReply: reply,
      status: "RESOLVED", // 🔥 auto resolve
    }));

    setEditing(false);
  };

  // 🔹 Resolve
  const resolve = async () => {
    await fetch(
      `https://ticket-assistant-4liq.onrender.com/api/tickets/${id}/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "RESOLVED" }),
      }
    );

    setTicket((prev) => ({ ...prev, status: "RESOLVED" }));
  };

  // 🔹 Reopen
  const reopen = async () => {
    await fetch(
      `https://ticket-assistant-4liq.onrender.com/api/tickets/${id}/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "OPEN" }),
      }
    );

    setTicket((prev) => ({ ...prev, status: "OPEN" }));
  };

  // 🔹 Delete
  const deleteTicket = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?"))
      return;

    await fetch(
      `https://ticket-assistant-4liq.onrender.com/api/tickets/${id}`,
      {
        method: "DELETE",
      }
    );

    alert("Deleted");
    navigate("/dashboard");
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back
      </button>

      <div className="card">
        <h3>{ticket.description}</h3>

        {/* Category */}
        <p>
          <b>Category:</b>{" "}
          <span className={`badge badge-${ticket.category.toLowerCase()}`}>
            {ticket.category}
          </span>
        </p>

        {/* Status */}
        <p>
          <b>Status:</b>{" "}
          <span className={`badge badge-${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
        </p>

        {/*  AI RESPONSE */}
        <div className="ai-block">
          <div className="ai-label">AI Suggested Reply</div>

          {!ticket.aiReply ? (
            <span>⏳ AI generating response...</span>
          ) : (
            <p>{ticket.aiReply}</p>
          )}
        </div>

        {/*  ADMIN RESPONSE */}
        <div className="ai-block">
          <div className="ai-label">Admin Reply</div>

          {editing ? (
            <>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                style={{ width: "100%", minHeight: "100px" }}
              />

              <div className="actions-row">
                <button className="btn btn-primary btn-sm" onClick={saveReply}>
                  💾 Save
                </button>

                <button
                  className="btn btn-sm"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{ticket.adminReply || "No admin reply yet..."}</p>

              {role === "admin" && (
                <button
                  className="btn btn-sm"
                  onClick={() => setEditing(true)}
                >
                   Write Reply
                </button>
              )}
            </>
          )}
        </div>

        {/*  ADMIN ACTIONS */}
        {role === "admin" && (
          <>
            {ticket.status === "OPEN" ? (
              <button className="btn btn-success" onClick={resolve}>
                ✓ Mark Resolved
              </button>
            ) : (
              <button className="btn btn-sm" onClick={reopen}>
                ↺ Reopen Ticket
              </button>
            )}

            <button className="btn btn-sm" onClick={deleteTicket}>
              🗑 Delete Ticket
            </button>
          </>
        )}
      </div>
    </>
  );
}