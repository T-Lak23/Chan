import { useAuth } from "@clerk/clerk-react";

import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";
import CallPage from "./pages/CallPage";

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return "loading.....";
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? <Homepage /> : <Navigate to={"/auth"} replace />
          }
        />
        <Route
          path="/auth"
          element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
        />

        <Route
          path="/call/:id"
          element={
            isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />
          }
        />

        <Route
          path="*"
          element={
            isSignedIn ? (
              <Navigate to={"/"} replace />
            ) : (
              <Navigate to={"/auth"} replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
