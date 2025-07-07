import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Landing from "./Landing";
import "./App.css";
import { useUser } from "@clerk/clerk-react";

const App = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setShowHome(true);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="app">
      {showHome ? <Home /> : <Landing onExplore={() => setShowHome(true)} />}
    </div>
  );
};

export default App;
