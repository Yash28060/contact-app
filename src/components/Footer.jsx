import { ThemeContext } from "../context/ThemeContext";
import React, { useContext } from "react";

const Footer = () => {
   const { theme } = useContext(ThemeContext);
  return (
    <footer className={` py-2 font-medium fixed bottom-0 w-full ${theme === "dark"? "bg-white text-black" : "bg-gray-800 text-white" }`}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Contact App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
