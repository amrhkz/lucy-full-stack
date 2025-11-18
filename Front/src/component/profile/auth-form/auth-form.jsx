import React, { useState } from "react";
import "./auth-form.css";

function AuthForm({ onLogin, onRegister }) {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => setIsActive((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isActive) {
      onRegister({ name, email, password });
    } else {
      onLogin({ email, password });
    }
  };

  return (
    <div className={`profile-container ${isActive ? "active" : ""}`}>
      <div className="curved-shape"></div>
      <div className="curved-shape2"></div>
      <div className="form-box Login">
        <h2 className="animation">Login</h2>
        <form action="#" onSubmit={handleSubmit}>
          <div className="input-box animation">
            <input
              type="text"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label htmlFor="">Email</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation">
            <input
              type="password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <label htmlFor="">Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box animation">
            <button className="btn" type="submit">
              Login
            </button>
          </div>
          <div className="regi-link animation">
            <p>
              Don't have an account ?
              <a href="#" className="SignUpLink" onClick={toggleForm}>
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="info-content Login">
        <h2 className="animation">WELCOME BACK!</h2>
        <p className="animation">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque,
          error?
        </p>
      </div>
      <div className="form-box Register">
        <h2 className="animation">Register</h2>
        <form action="#" onSubmit={handleSubmit}>
          <div className="input-box animation">
            <input
              type="text"
              required
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label htmlFor="">Username</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation">
            <input
              type="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label htmlFor="">Email</label>
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box animation">
            <input
              type="password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <label htmlFor="">Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="input-box animation">
            <button className="btn" type="submit">
              Register
            </button>
          </div>
          <div className="regi-link animation">
            <p>
              Don't have an account ?
              <a href="#" className="SignInLink" onClick={toggleForm}>
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="info-content Register">
        <h2 className="animation">WELCOME BACK!</h2>
        <p className="animation">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque,
          error?
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
