import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = () => {
    //  Simple admin check
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="card">
      <div className="section-title">Admin Login</div>

      <div className="form-row">
        <label>Email</label>
        <input onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>

      <div className="form-row">
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button className="btn btn-primary" onClick={login}>
        Login
      </button>
    </div>
  );
}