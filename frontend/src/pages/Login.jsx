import { useState } from "react";
import "../styles/Login.css";
import { FaSignInAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const [role, setRole] = useState("");

  //Validate the Email
  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid);
    return isValid;
  };

  //Validate the Password
  const validatePassword = (value) => {
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
    setPasswordValid(isValid);
    return isValid;
  };

  //Submit the Form
  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailOk = validateEmail(email);
    const isPasswordOk = validatePassword(password);

    if (!isEmailOk || !isPasswordOk) {
      toast.error("Please fix the error before submitting!");
      return;
    }

    if (role === "") {
      toast.error("Please select your role.");
      return;
    }

    toast.success("Login successful!");
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="formHeader">
          <h1>Sign in to your account</h1>
          <p>Enter the credentials to continue</p>
        </div>
        {/*Email*/}
        <div className="inputWrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="e.g. john123@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />

          {emailValid === false && email.trim() !== "" && (
            <span className="error">The email is not valid.</span>
          )}
        </div>

        {/*Password*/}
        <div className="inputWrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password here..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
          {passwordValid === false && password.trim() !== "" && (
            <span className="error">
              Your password must be at least 8 characters long and include both
              letters and numbers.
            </span>
          )}
        </div>

        {/* Role (RBAC) */}
        <div className="inputWrapper">
          <label htmlFor="role">Role</label>

          <div className="inputField">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select your role</option>
              <option value="fleet-manager">Fleet Manager</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="safety-officer">Safety Officer</option>
              <option value="financial-analyst">Financial Analyst</option>
            </select>
          </div>
        </div>

        {/*Button*/}
        <div className="button">
          <button type="submit">
            Sign In
            <FaSignInAlt />
          </button>
        </div>
        {/* <h1>Transport Management System</h1>
      <p>Enter your credentials to continue</p> */}
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
