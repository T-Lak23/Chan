import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import { BrowserRouter } from "react-router";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <AuthProvider>
          <App />
        </AuthProvider>
        <Toaster position="top-right" />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
