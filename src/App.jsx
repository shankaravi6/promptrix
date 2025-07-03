import React, { useState } from "react";
import Home from "./pages/Home";
import "./App.css";
import Landing from "./Landing";

const App = () => {
  const [showHome, setShowHome] = useState(false);

  return (
    <div className="app">
      {showHome ? <Home /> : <Landing onExplore={() => setShowHome(true)} />}
    </div>
  );
};

export default App;
