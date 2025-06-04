import {useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
      return;
    }
  const response = await fetch("https://the-app-backend-2279.onrender.com/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
      navigate("/table");}};
  return (
    <form onSubmit={handleSignUp}>
        <div className="mb-2">
      <label className="form-label">Name</label>
      <input type="text" className="form-control" value={name}
        onChange={(e) => setName(e.target.value)} placeholder="Your Name" required/>
    </div>
      <div className="mb-2">
        <label className="form-label">E-mail</label>
        <input type="email" className="form-control" value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="test@example.com" required/>
      </div>
      <div className="mb-2">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={password}
          onChange={(e) => setPassword(e.target.value)} placeholder="********" required/>
      </div>
      <div className="mb-2">
        <label className="form-label">Confirm Password</label>
        <input type="password" className="form-control" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" required/>
      </div>
      <button type="submit" className="btn btn-success w-100">Sign Up</button>
    </form>
  );
};

export default SignUpForm;