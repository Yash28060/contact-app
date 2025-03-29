import "./App.css";
import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Local_Storage_Key = "contacts";

function App() {
  const [contacts, setContacts] = useState([]);

  // Open IndexedDB database
  const initDB = async () => {
    return openDB("ContactsDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("contacts")) {
          db.createObjectStore("contacts", { keyPath: "id" });
        }
      },
    });
  };

  // Save contact in IndexedDB
  const saveToIndexedDB = async (contact) => {
    const db = await initDB();
    const tx = db.transaction("contacts", "readwrite");
    const store = tx.objectStore("contacts");
    await store.put(contact);
    await tx.done;
  };

  // Load contacts from IndexedDB
  const loadFromIndexedDB = async () => {
    const db = await initDB();
    const tx = db.transaction("contacts", "readonly");
    const store = tx.objectStore("contacts");
    const allContacts = await store.getAll();
    return allContacts;
  };

  // Add Contact
  const addContactHandler = async (contact) => {
    setContacts([...contacts, contact]);
    await saveToIndexedDB(contact); // Save to IndexedDB
  };
  const deleteContactHandler = async (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
    const db = await initDB();
    const tx = db.transaction("contacts", "readwrite");
    const store = tx.objectStore("contacts");
    await store.delete(id);
    await tx.done;
  };

  // Load contacts from IndexedDB on app start
  useEffect(() => {
    loadFromIndexedDB().then((data) => setContacts(data));
  }, []);

  return (
    <>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/add"
              element={<AddContact addContactHandler={addContactHandler} />}
            />
            <Route
              path="/"
              exact
              element={
                <ContactList
                  contacts={contacts}
                  deleteContactHandler={deleteContactHandler}
                />}
            />
          </Routes>
          {/* <AddContact addContactHandler={addContactHandler} /> */}
          {/* <ContactList
          contacts={contacts}
          deleteContactHandler={deleteContactHandler}
        /> */}
        </Router>
      </div>
    </>
  );
}

export default App;
