import React from "react";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div className="ui main flex items-center justify-center flex-col py-10">
      <h3 className="text-2xl font-medium mb-8">Contact List</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} deleteContact={deleteContact} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
