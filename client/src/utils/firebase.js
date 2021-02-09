import firebase from "firebase";
// import firebaseConfig from "./firebaseConfig";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXYyUVYA2BJL6fJkayaF0ZFPHF3m0DaSw",
  authDomain: "clone-286bc.firebaseapp.com",
  databaseURL: "https://clone-286bc.firebaseio.com",
  projectId: "clone-286bc",
  storageBucket: "clone-286bc.appspot.com",
  messagingSenderId: "544238836148",
  appId: "1:544238836148:web:27fcdaac1b5b3eb5fafae1",
  measurementId: "G-88QDHMMNRT",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

db.settings({
  ignoreUndefinedProperties: true,
});

const auth = firebaseApp.auth();

export { db, auth };
