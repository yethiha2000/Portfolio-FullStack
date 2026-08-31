import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import AdminApp from "./AdminApp.jsx";
import AppErrorBoundary from "./components/AppErrorBoundary.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { LanguageProvider } from "./context/LanguageProvider.jsx";

const Root = window.location.pathname.startsWith("/admin") ? AdminApp : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AppErrorBoundary>
          <Root />
        </AppErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
