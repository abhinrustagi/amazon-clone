import React, { useState } from "react";
import "./styles/profile.css";
import { useStateValue } from "../utils/StateProvider";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [profile, setProfile] = useState(null);
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
    db.collection("users")
      .doc(user?.uid)
      .collection("userInformation")
      .doc("ContactInfo")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setProfile(doc.data());
        } else {
          console.log("No data found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="profile">
      <h1>Hello, {profile?.name}</h1>
      {profile ? (
        <div className="profile_table">
          <div className="segment">
            <div className="profile_left">Full Name</div>
            <div className="profile_right">{profile?.name}</div>
          </div>
          <div className="segment">
            <div className="profile_left">Email Address</div>
            <div className="profile_right">{profile?.email}</div>
          </div>
          <div className="segment">
            <div className="profile_left">Phone Number</div>
            <div className="profile_right">{profile?.phone}</div>
          </div>
          <div className="segment">
            <div className="profile_left">Address</div>
            <div className="profile_right">
              {profile.address ? (
                <div>
                  <p>profile.address</p>
                  <button onClick={formVisibility}>Change Address</button>
                </div>
              ) : (
                <button onClick={formVisibility}>Add Address</button>
              )}
            </div>
          </div>
          <div>
            <Link to="/orders">View your orders here.</Link>
          </div>
        </div>
      ) : (
        <p className="info">
          You are not logged in. You can
          <Link to="/login"> login or register here.</Link>
        </p>
      )}
      <form
        style={{
          display: visibility,
        }}
        onSubmit={changeAddress}
      >
        <label htmlFor="address1">Address Line 1 : </label>
        <input
          type="text"
          name="address1"
          value={address.address1}
          onChange={(e) =>
            changeAddress({ ...address, address1: e.target.value })
          }
        />
        <br /> <label htmlFor="address2">Address Line 2 : </label>
        <input
          type="text"
          name="address2"
          value={address.address2}
          onChange={(e) =>
            changeAddress({ ...address, address2: e.target.value })
          }
        />
        <br /> <label htmlFor="address3">Address Line 3 : </label>
        <input
          type="text"
          name="address3"
          value={address.address3}
          onChange={(e) =>
            changeAddress({ ...address, address3: e.target.value })
          }
        />
        <button>Update Profile Address</button>
      </form>
    </div>
  );
}

export default Profile;
