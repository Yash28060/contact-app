import "./App.css";
import React, { useState, useEffect } from "react";
// import { openDB } from "idb";
import api from "./api/contacts"; // Import your API functions here
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import ContactDetail from "./components/ContactDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import { ThemeContext } from "./context/ThemeContext";
import Footer from "./components/Footer";
import EditContact from "./components/EditContacct";



const Local_Storage_Key = "contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [theme, setTheme] = useState("dark"); //setting theme
  // Open IndexedDB database
  // const initDB = async () => {
  //   return openDB("ContactsDB", 1, {
  //     upgrade(db) {
  //       if (!db.objectStoreNames.contains("contacts")) {
  //         db.createObjectStore("contacts", { keyPath: "id" });
  //       }
  //     },
  //   });
  // };

  // Save contact in IndexedDB
  // const saveToIndexedDB = async (contact) => {
  //   const db = await initDB();
  //   const tx = db.transaction("contacts", "readwrite");
  //   const store = tx.objectStore("contacts");
  //   await store.put(contact);
  //   await tx.done;
  // };

  // Load contacts from IndexedDB
  // const loadFromIndexedDB = async () => {
  //   const db = await initDB();
  //   const tx = db.transaction("contacts", "readonly");
  //   const store = tx.objectStore("contacts");
  //   const allContacts = await store.getAll();
  //   return allContacts;
  // };

  // Add Contact
  // const addContactHandler = async (contact) => {
  //   setContacts([...contacts, contact]);
  //   await saveToIndexedDB(contact); // Save to IndexedDB
  // };
  const addContactHandler = async (contact) => {
    // const request = {
    //   ...contact,
    // };
    const response = await api.post("/contacts", contact);
    console.log(response.data);
    setContacts([...contacts, response.data]);

  };

  const updateContactHandler = async (contact) => {
    // const request = {
    //   ...contact,
    // };
    const response = await api.put(`/contacts/${contact.id}`, contact);
    console.log(response.data);
    setContacts(
      contacts.map((c) => (c.id === contact.id ? { ...response.data } : c))
    );

  };
  // const deleteContactHandler = async (id) => {
  //   const newContactList = contacts.filter((contact) => {
  //     return contact.id !== id;
  //   });
  const deleteContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
    // const db = await initDB();
    // const tx = db.transaction("contacts", "readwrite");
    // const store = tx.objectStore("contacts");
    // await store.delete(id);
    // await tx.done;
  };
   useEffect(() => {
    setTheme(
      localStorage.getItem("theme") ? localStorage.setItem("theme","light") : "dark"
    );
  }, []);

  // Load contacts from IndexedDB on app start
  // useEffect(() => {
  //   loadFromIndexedDB().then((data) => setContacts(data));
  // }, []);
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }
 
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        setContacts(allContacts);
      } else {
        setContacts([]);
      }
    };
    getAllContacts();
  }
  , []);
  
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div
          className={`${theme} ${
            theme === "dark"
              ? "bg-gradient-to-b from-black via-gray-800 to-gray-900"
              : ""
          } min-h-screen h-full`}
        >
          <Router>
            <Header />
            <Routes>
              <Route
                path="/add"
                element={<AddContact addContactHandler={addContactHandler} />}
              />
              <Route
                path="/edit"
                element={<EditContact updateContactHandler={updateContactHandler} />}
              />
              <Route
                path="/"
                exact
                element={
                  <ContactList
                    contacts={contacts}
                    deleteContactHandler={deleteContactHandler}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact/:id" element={<ContactDetail />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
