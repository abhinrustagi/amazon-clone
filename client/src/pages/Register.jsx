import React, { useState } from "react";
import "./styles/Register.css";
import { Link, useHistory } from "react-router-dom";
// import { auth, db } from "../utils/firebase";
import axios from "axios";

function Register() {
  const History = useHistory();
  const [state, changeState] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    password2: "",
  });

  const [error, setError] = useState({ display: "none", text: "" });

  const handleChange = (e) => {
    const value = e.target.value;
    changeState({
      ...state,
      [e.target.name]: value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8888/auth/register", {
        name: state.name,
        email: state.email,
        phone: state.phone,
        password: state.password,
        password2: state.password2,
      })
      .then((res) => {
        if (res.data.error) {
          setError({ ...error, display: "block", text: res.data.message });
        } else {
          History.push("/login");
        }
      });
  };

  return (
    <div className="registerPage">
      <Link to="/" className="login_logo">
        <img
          src="https://www.marketplace.org/wp-content/uploads/2019/07/ama2.png?resize=740%2C204"
          alt="..."
        />
      </Link>

      <div className="login_container">
        <h5>Name</h5>
        <input
          type="text"
          className="input"
          name="name"
          onChange={handleChange}
          value={state.name}
        />
        <h5>Email Address</h5>
        <input
          type="email"
          className="input"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <h5>Password</h5>
        <input
          type="password"
          className="input"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
        <h5>Confirm Password</h5>
        <input
          type="password"
          className="input"
          name="password2"
          onChange={handleChange}
          value={state.password}
        />
        <h5>Phone Number</h5>
        <input
          type="number"
          className="input"
          name="phone"
          onChange={handleChange}
          value={state.phone}
        />
        <p
          className="error"
          style={{
            display: error.display,
          }}
        >
          {error.text}
        </p>
        <button onClick={register}>Continue</button>
      </div>
    </div>
  );
}

export default Register;
