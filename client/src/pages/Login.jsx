import React, { useState } from "react";
import "./styles/login.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../utils/StateProvider";
import decoder from "jwt-decode";

// Firebase Auth
// import { auth } from "../utils/firebase";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [{ user }, dispatch] = useStateValue();

  const History = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8888/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        const data = decoder(res.data.token);
        dispatch({
          type: "SET_USER",
          user: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
          },
        });
        History.push("/");
      });
  };

  return !user ? (
    <div className="login">
      <Link to="/" className="login_logo">
        <img
          src="https://www.marketplace.org/wp-content/uploads/2019/07/ama2.png?resize=740%2C204"
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
          <button className="amazon_button" onClick={signIn} type="submit">
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
        <Link to="/register">
          <button className="registerButton">Create your Amazon Account</button>
        </Link>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Login;
