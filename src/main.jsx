import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-[var(--bg-body)]">
      <App />
    </div>
  </BrowserRouter>
);
