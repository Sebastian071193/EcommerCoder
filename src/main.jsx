import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { initializeApp } from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyBJDwFEJFCxJl3giv-69RTxG8B8rGIbD7w",
  authDomain: "proyectocoder-af8e1.firebaseapp.com",
  projectId: "proyectocoder-af8e1",
  storageBucket: "proyectocoder-af8e1.appspot.com",
  messagingSenderId: "257543533227",
  appId: "1:257543533227:web:fee44371dd4aa303befdee"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);