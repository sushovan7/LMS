import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <App />
        <Toaster position="bottom-right" reverseOrder={true} />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
