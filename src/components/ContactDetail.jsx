import React from "react";
import { Link, useLocation } from "react-router-dom";

function ContactDetail() {
  const location = useLocation();
  const { contact } = location.state || {}; // Handle undefined state
  console.log(contact);

  if (!contact) {
    return <h2 className="text-center text-red-500">Contact not found!</h2>;
  }

  return (
    <div className="flex flex-col justify-center mb-10 mt-10 items-center">
      <div className="ui border-2 border-blue-500 hover:ring-1 ring-blue-400 outline-none shadow-lg rounded-lg p-6 bg-white flex flex-col items-center w-fit">
        <div className="img rounded-full  mb-4">
          {/* <img
            className="h-50 w-50 hover:scale-110 object-cover mr-4 flex-shrink-0  rounded-md"
            src={contact.avatar || "/images/1.jpg"}
            alt={contact.name}
          /> */}
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt={contact.name}
              className="h-50 w-50 hover:scale-110 object-cover mr-4 flex-shrink-0  rounded-md"
            />
          ) : (
            <div className="h-50 w-50 hover:scale-110 object-cover mr-4 flex-shrink-0 bg-gray-300 flex items-center justify-center rounded-md">
              <span className="text-gray-600 text-lg font-semibold">
                {contact.name[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="content">
          <div className="header font-serif">{contact.name}</div>
          <div className="description font-serif">{contact.email}</div>
          <div className="description font-serif">{contact.number}</div>
          <div className="description font-serif">{contact.address}</div>
        </div>
      </div>
      <div className="center">
        <Link to="/">
          <button className="bg-blue-600 text-white font-semibold px-10 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer mt-10">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ContactDetail;
