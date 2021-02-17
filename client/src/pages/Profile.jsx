import React, { useState } from "react";
import "./styles/profile.css";
import { useStateValue } from "../utils/StateProvider";
import { Link, Redirect } from "react-router-dom";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [address, changeAddress] = useState({
    address1: "",
    address2: "",
    address3: "",
  });

  const [visibility, changeVisibility] = useState("none");

  const formVisibility = () => {
    visibility === "none"
      ? changeVisibility("block")
      : changeVisibility("none");
  };

  const changeAddressSubmit = () => {};

  if (user) {
    // db.collection("users")
    //   .doc(user?.uid)
    //   .collection("userInformation")
    //   .doc("ContactInfo")
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       setProfile(doc.data());
    //     } else {
    //       console.log("No data found");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return user ? (
    <div className="profile">
      <h1>Hello, {user?.name}</h1>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Profile;
