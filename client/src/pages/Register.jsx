import React, { useState } from "react";
import "./styles/Register.css";
import { Link, useHistory, Redirect } from "react-router-dom";
// import { auth, db } from "../utils/firebase";
import { useStateValue } from "../utils/StateProvider";
import axios from "axios";

function Register() {
  const [{ user }, dispatch] = useStateValue();

  const [buttonText, setButtonText] = useState("Continue");

  const History = useHistory();

  const [state, changeState] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    password2: "",
  });

  const [error, setError] = useState({ display: "none", text: null });

  const handleChange = (e) => {
    const value = e.target.value;
    changeState({
      ...state,
      [e.target.name]: value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    setButtonText("Processing");
    // form validation
    if (
      state.password.length === 0 ||
      state.name.length === 0 ||
      state.email.length === 0 ||
      state.phone.length === 0 ||
      state.password2.length === 0
    ) {
      setError({
        ...error,
        display: "block",
        text: "One or more fields empty.",
      });
      setButtonText("Continue");
    }
    if (state.password !== state.password2) {
      setError({ ...error, display: "block", text: "Passwords must match." });
      setButtonText("Continue");
    } else if (state.phone.length < 10 || state.phone.length > 10) {
      setError({
        ...error,
        display: "block",
        text: "Phone Number must be 10 digits.",
      });
      setButtonText("Continue");
    } else {
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
            setButtonText("Continue");
          } else {
            dispatch({ type: "SET_USER", user: res.data.user });
            History.push("/");
          }
        });
    }
  };

  return !user ? (
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
          value={state.password2}
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
        <button type="submit" onClick={register} className="amazon_button_2">
          {buttonText}
        </button>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Register;
