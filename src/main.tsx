import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { SplashScreen } from "@capacitor/splash-screen";

await SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
