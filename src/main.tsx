import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0ProviderApp } from "./auth/Auth0ProviderApp.tsx";
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderApp>
        <App />
      </Auth0ProviderApp>
    </BrowserRouter>
  </React.StrictMode>
);
