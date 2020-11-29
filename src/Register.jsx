import React, { useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Register() {
  const [state, changeState] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    changeState({
      ...state,
      [e.target.name]: value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((auth) => {
        if (auth) {
          History.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="registerPage">
      <Link to="/" className="login_logo">
        <img
          src="https://www.acisolutions.net/wp-content/uploads/2019/09/amazon-logo-vector-png-amazon-logo-vector-512.png"
          alt="..."
        />
      </Link>
      <div className="login_container">
        <h5>Name</h5>
        <input
          type="text"
          class="input"
          name="name"
          onChange={handleChange}
          value={state.name}
        />
        <h5>Email Address</h5>
        <input
          type="email"
          class="input"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <h5>Password</h5>
        <input
          type="password"
          class="input"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
        <h5>Phone Number</h5>
        <input
          type="number"
          class="input"
          name="phone"
          onChange={handleChange}
          value={state.phone}
        />
        <button onClick={register}>Continue</button>
      </div>
    </div>
  );
}

export default Register;
