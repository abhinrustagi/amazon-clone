import React, { useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { db, auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const History = useHistory();
  const signIn = (e) => {
    e.preventDefault();
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          History.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <Link to="/" className="login_logo">
        <img
          src="https://www.acisolutions.net/wp-content/uploads/2019/09/amazon-logo-vector-png-amazon-logo-vector-512.png"
          alt="..."
        />
      </Link>
      <div className="login_container">
        <h1>Sign In</h1>
        <form>
          <h5>Email Address or Phone Number</h5>
          <input
            className="input"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <button onClick={signIn} type="submit">
            Continue
          </button>
        </form>
        <small>
          By continuing, you agree to Fake Amazon's Conditions of Use and
          Privacy Notice.
        </small>
      </div>
      <div className="registerAsk">
        <p className="registrationPrompt">New to Amazon?</p>
        <button onSubmit={register} className="registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
