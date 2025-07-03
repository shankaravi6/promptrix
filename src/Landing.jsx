import React, { useEffect, useState } from "react";

const LandingPage = ({ onExplore }) => {
  const [bgImage, setBgImage] = useState("images/landing5.png");

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth <= 640) {
        setBgImage("images/landing_small.png");
      } else {
        setBgImage("images/landing5.png");
      }
    };

    updateBackground(); // Set on first render
    window.addEventListener("resize", updateBackground); // Listen to screen resize

    return () => window.removeEventListener("resize", updateBackground); // Cleanup
  }, []);

  return (
    <div
      className="relative min-h-screen bg-black bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Navbar */}
      <div className="relative z-10 flex justify-between items-center px-8 py-9">
        {/* Optional Navbar */}
      </div>

      {/* Hero Text */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-80px)] px-8 sm:px-20">
        <div className="max-w-3xl">
          <h1 className="sub-font text-4xl sm:text-6xl leading-tight bg-gradient-to-r from-neutral-500 to-neutral-300 bg-clip-text text-transparent">
            A Smart Platform to Sell High-Quality AI Prompts Effortlessly
          </h1>

          <p className="mt-6 text-neutral-500 max-w-lg sub-font">
            Promptrix is your personal prompt shop — a collection of
            hand-crafted AI prompts designed to save time, spark ideas, and
            deliver powerful results. Easy to browse, simple to buy.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={onExplore}
              className="bg-neutral-400 text-neutral-900 px-6 py-2 rounded-full font-medium sub-font cursor-pointer"
            >
              Explore Prompts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
