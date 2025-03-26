import "./App.css";
import React, { useState, useEffect } from "react";
import { openDB } from "idb"; 
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";

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

  // Load contacts from IndexedDB on app start
  useEffect(() => {
    loadFromIndexedDB().then((data) => setContacts(data));
  }, []);

  return (
    <>
      <div>
        <Header />
        <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} />
      </div>
    </>
  );
}

export default App;
