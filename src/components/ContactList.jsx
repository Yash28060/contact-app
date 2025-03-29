import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = ({ contacts, deleteContactHandler }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-medium">Contact List</h3>
        <Link to="/add">
          <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer">
            Add Contact
          </button>
        </Link>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg">No contacts found. Add your first contact!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              deleteContact={deleteContactHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
