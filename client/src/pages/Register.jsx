import React, { useState } from "react";
import "./styles/Register.css";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../utils/firebase";

function Register() {
  const History = useHistory();
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
          const thisUser = auth.user;
          db.collection("users")
            .doc(thisUser?.uid)
            .collection("userInformation")
            .doc("ContactInfo")
            .set({
              email: state.email,
              name: state.name,
              phone: state.phone,
              address: null,
            });
          History.push("/");
        }
      })
      .catch((err) => alert(err.message));
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
        <h5>Phone Number</h5>
        <input
          type="number"
          className="input"
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
