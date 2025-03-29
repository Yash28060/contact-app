import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white p-4 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-15 left-4">
          <img
            src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo"
            className="h-8 w-auto rounded-full"
          />
          <span className="text-xl font-bold">Contact App</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-gray-200 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <ul className="flex flex-col md:flex-row md:gap-8 p-4 md:p-0">
            <li>
              <Link
                to="/"
                className={`block p-2 transition-all duration-200 ${
                  isActive("/")
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Contact List
              </Link>
            </li>
            <li>
              <Link
                to="/add"
                className={`block p-2 transition-all duration-200 ${
                  isActive("/add")
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Add Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block p-2 transition-all duration-200 ${
                  isActive("/about")
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Fullscreen Mobile Navigation */}
        {isOpen && (
          <nav className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-[#7f3dc6] to-[#2575fc] flex flex-col items-center justify-center z-10 opacity-100">
            <button
              className="absolute top-5 right-5 text-white text-3xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <ul className="text-center space-y-8 text-2xl font-semibold">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-gray-300 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Contact List
                </Link>
              </li>
              <li>
                <Link
                  to="/add"
                  className="text-white hover:text-gray-300 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Add Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-gray-300 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
