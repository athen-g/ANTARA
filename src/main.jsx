import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { LenisProvider } from "./hooks/useLenis";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <LenisProvider>
        <App />
      </LenisProvider>
    </HashRouter>
  </StrictMode>
);
