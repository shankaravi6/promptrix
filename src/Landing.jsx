import React from "react";

const LandingPage = ({ onExplore }) => {
  return (
    <div
      className="relative min-h-screen bg-black bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('images/landing5.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Navbar */}
      <div className="relative z-10 flex justify-between items-center px-8 py-9">
        {/* <div className="text-white font-semibold text-xl">Promptrix</div>
        <div className="hidden md:flex space-x-6 text-sm text-gray-300">
          <a href="#">Features</a>
          <a href="#">About Us</a>
          <a href="#">Benefits</a>
        </div>
        <div className="flex space-x-4 text-sm">
          <button className="text-white">Sign Up</button>
          <button className="bg-white text-black px-4 py-1 rounded-full">
            Log In
          </button>
        </div> */}
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
