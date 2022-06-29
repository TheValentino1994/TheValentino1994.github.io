/* ------------------------------ Basic imports ----------------------------- */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

/* --------------------------------- Router --------------------------------- */
import { MainRouter } from "./router";

/* --------------------------------- Render --------------------------------- */

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
