import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

db.settings({
  ignoreUndefinedProperties: true,
});

const auth = firebaseApp.auth();

export { db, auth };
