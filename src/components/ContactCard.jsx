import React from "react";
// import defaultUser from "/images/1.jpg";

function ContactCard({ contact, deleteContact }) {
  const { id, name, email, number, address, avatar } = contact;
  return (
    <>
      <div
        key={id}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
          {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
            <span className="text-gray-600 text-lg font-semibold">
              {contact.name[0]}
            </span>
          </div>
        )}

            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {name}
              </h4>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
          <button
            onClick={() => deleteContact(contact.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-gray-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {number}
          </p>
          <p className="text-gray-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {address}
          </p>
        </div>
      </div>
    </>
  );
}

export default ContactCard;
