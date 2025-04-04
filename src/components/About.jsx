import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <div
      className={`h-fit mt-15 max-w-2xl m-auto p-6 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-white text-gray-900" : "bg-gray-900 text-white"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">About Contact App</h1>
      <div className="space-y-4">
        <p>
          Welcome to our Contact Management Application! This app helps you
          organize and manage your contacts efficiently.
        </p>
        <p>Features include:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Add new contacts with name, email, phone number, and address</li>
          <li>Upload contact photos for better visual identification</li>
          <li>View all your contacts in a clean, organized list</li>
          <li>Delete contacts when needed</li>
          <li>Responsive design that works on all devices</li>
          <li>Dark mode support for comfortable viewing in any lighting</li>
          <li>Data persistence using IndexedDB</li>
        </ul>
        <p className="mt-6">
          Built with React and modern web technologies, this app provides a
          smooth and intuitive user experience for managing your contacts.
        </p>
      </div>
    </div>
  );
};

export default About;
