import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import { ToastContainer } from "react-toastify";

import initializeAxios from "./api/axios";
import App from "./App";
import "./common/i18n";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

initializeAxios();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
