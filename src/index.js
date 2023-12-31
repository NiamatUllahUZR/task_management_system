import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contextApi/user";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DndProvider backend={HTML5Backend}>
      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>{" "}
      </UserProvider>{" "}
    </DndProvider>
    
    ,
  </BrowserRouter>
);
