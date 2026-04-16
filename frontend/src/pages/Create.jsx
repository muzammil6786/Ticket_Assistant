import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    category: "OTHER", // NEW
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const submit = async () => {
  if (!form.name || !form.email || !form.description) {
    return alert("Please fill all fields");
  }

  if (form.description.length < 10) {
    return alert("Description too short");
  }

  setLoading(true);

  const res = await fetch("http://localhost:5000/api/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  setLoading(false);

  navigate(`/ticket/${data.ticketId}`);
};

  return (
    <div className="card">
      <div className="section-title">Submit a support ticket</div>

      {loading && <div className="loading-bar"></div>}

      <div className="grid-2">
        <div className="form-row">
          <label className="form-label">Full name</label>
          <input onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="form-row">
          <label className="form-label">Email</label>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="PAYMENT">Payment</option>
          <option value="LOGIN">Login</option>
          <option value="BUG">Bug</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="form-row">
        <label className="form-label">Issue</label>
        <textarea
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <button className="btn btn-primary" onClick={submit}>
        {loading ? "Submitting..." : "Submit Ticket"}
      </button>
    </div>
  );
}
