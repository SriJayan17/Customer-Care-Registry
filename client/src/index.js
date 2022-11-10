import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
// import "./App.css";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route exact path="/" element={<Home />}>
//       <Route exact path="/login" element={<Login />} />
//       <Route exact path="/register" element={<Register />} />
//     </Route>
//   )
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
