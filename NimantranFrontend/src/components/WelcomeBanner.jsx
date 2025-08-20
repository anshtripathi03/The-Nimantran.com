import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const WelcomeBanner = () => {
  const [animateOut, setAnimateOut] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedHome");
    if (!hasVisited && window.location.pathname === "/") {
    
      window.addEventListener("load", () => {
        setShowBanner(true);

        const timeout1 = setTimeout(() => setAnimateOut(true), 2000);
        const timeout2 = setTimeout(() => setShowBanner(false), 2500);

        
        localStorage.setItem("hasVisitedHome", "true");

        return () => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
        };
      });
    }
  }, []);

  if (!showBanner) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] w-[90%] md:w-[60%] 
        transition-all duration-700 ease-in-out pointer-events-none
        ${animateOut ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}
      `}
    >
      <div className="text-center p-6 bg-[#f9f1e7] rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFAA00] to-[#FFD700] drop-shadow-md font-serif">
          Welcome to TheNimantran.com
        </h1>
        <p className="text-md text-gray-700 font-light font-serif">
          Premium Custom Invitation Cards for Weddings, Birthdays & Special Occasions
        </p>
      </div>
    </div>,
    document.body
  );
};

export default WelcomeBanner;
