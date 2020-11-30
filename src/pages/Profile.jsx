import React, { useState } from "react";
import "./styles/profile.css";
import { useStateValue } from "../utils/StateProvider";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [profile, setProfile] = useState(null);

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
                  <button>Change Address</button>
                </div>
              ) : (
                <button>Add Address</button>
              )}
            </div>
          </div>
          <div>
            <Link to="/orders">View your orders here.</Link>
          </div>
        </div>
      ) : (
        <p className="info">
          You are not logged in. You can{" "}
          <Link to="/login">login or register here.</Link>
        </p>
      )}
    </div>
  );
}

export default Profile;
