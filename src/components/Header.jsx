import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <img
            src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo"
            className="h-8 w-auto rounded-full"
          />
          <span className="text-xl font-bold">Logo</span>
        </a>

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

        <nav
          className={`md:flex md:items-center md:gap-6 absolute md:static bg-blue-700 md:bg-transparent top-16 left-0 w-full md:w-auto transition-all duration-300 ease-in-out ${
            isOpen ? "block shadow-lg md:shadow-none" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:gap-8 p-4 md:p-0">
            <li>
              <a
                href="#"
                className="block p-2 hover:text-gray-300 transition-colors duration-200 hover:scale-105 transform"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 hover:text-gray-300 transition-colors duration-200 hover:scale-105 transform"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 hover:text-gray-300 transition-colors duration-200 hover:scale-105 transform"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 hover:text-gray-300 transition-colors duration-200 hover:scale-105 transform"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
