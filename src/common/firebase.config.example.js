import firebase from "firebase/app";
import "firebase/auth";

export const configFirebase = {
  apiKey: "YOUR_API",
  authDomain: "______",
  databaseURL: "______",
  projectId: "______",
  storageBucket: "",
  messagingSenderId: "______",
  appId: "______"
};

firebase.initializeApp(configFirebase);
