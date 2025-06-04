import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("https://the-app-backend-2279.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok && data.userId) {
      localStorage.setItem("userId", data.userId);
      navigate("/table");}};

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="test@example.com"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type={showPassword ? "text" : "password"} className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
          <span 
            className="position-absolute" 
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", top: "50%", right: "34px", transform: "translateY(170%)" }}>
            {showPassword ? <EyeSlash /> : <Eye />}
          </span>
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
        <div className="mt-2 d-flex justify-content-center">
        <button 
  type="button"
  className="btn btn-link" 
  onClick={(e) => {
    e.preventDefault();
    setShowModal(true);
  }}>
  Forgot password?
</button>
</div>
      </form>
      {showModal && (
  <div style={{
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
     zIndex: 999
  }}>
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      width: "450px",
      textAlign: "center"
    }}>
      <h2>Password Reset</h2>
      <p>Enter your email to receive a password reset link.</p>
      <input type="email" className="form-control mt-2" placeholder="Enter your email"/>
      <div className="mt-3" style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
  <button className="btn btn-primary">Send Reset Link</button>
  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
</div>
    </div>
  </div>
)}
    </>
  );};
export default SignInForm;