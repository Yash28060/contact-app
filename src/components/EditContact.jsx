import React, { useState, useRef } from "react";
import { openDB } from "idb";
import { useNavigate, useLocation } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state; // Get contact details from state

  const [formData, setFormData] = useState({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    number: contact.number,
    address: contact.address,
    avatar: contact.avatar,
    previewUrl: contact.avatar, // Maintain preview
  });

  const fileInputRef = useRef(null);

  // Character limits
  const limits = {
    name: 50,
    email: 75,
    address: 100,
    number: 10,
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (value.length <= limits[field]) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Save Image to IndexedDB
  const saveImageToDB = async (file, contactId) => {
    const db = await openDB("contacts-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("images")) {
          db.createObjectStore("images");
        }
      },
    });

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        await db.put("images", reader.result, contactId);
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle form submission
  const update = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.number || !formData.address) {
      alert("All fields with * are mandatory!");
      return;
    }

    let imageUrl = formData.avatar;

    if (formData.avatar instanceof File) {
      imageUrl = await saveImageToDB(formData.avatar, formData.id);
    }

    const updatedContact = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      number: formData.number,
      address: formData.address,
      avatar: imageUrl,
    };

    updateContactHandler(updatedContact);
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="flex items-center flex-col py-10 ">
      <form
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-400 outline-none duration-300"
        onSubmit={update}
      >
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          Edit Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Name<span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">
                ({formData.name.length}/{limits.name} characters)
              </span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
              maxLength={limits.name}
              className="border border-gray-300 rounded-md p-3 mt-1 hover:border-blue-500 hover:ring-1 hover:ring-blue-400 outline-none break-words"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col md:col-span-1 col-span-2 ">
            <label htmlFor="number" className="text-gray-700 font-medium">
              Phone No.<span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">
                ({formData.number.length}/{limits.number} characters)
              </span>
            </label>
            <input
              type="tel"
              id="number"
              placeholder="Enter Phone No."
              value={formData.number}
              onChange={(e) => handleInputChange(e, "number")}
              maxLength={limits.number}
              className="border border-gray-300 rounded-md p-3 mt-1 outline-none hover:border-blue-500 hover:ring-1 hover:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col md:col-span-1 col-span-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email<span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">
                ({formData.email.length}/{limits.email} characters)
              </span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
              maxLength={limits.email}
              className="border border-gray-300 rounded-md p-3 mt-1 hover:border-blue-500 hover:ring-1 hover:ring-blue-400 outline-none break-words"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="address" className="text-gray-700 font-medium">
              Address<span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">
                ({formData.address.length}/{limits.address} characters)
              </span>
            </label>
            <textarea
              id="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={(e) => handleInputChange(e, "address")}
              maxLength={limits.address}
              rows="3"
              className="border border-gray-300 rounded-md p-3 mt-1 hover:border-blue-500 hover:ring-1 hover:ring-blue-400 outline-none resize-none break-words"
            />
          </div>

          {/* Upload Photo */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="image" className="text-gray-700 font-medium">
              Upload New Photo
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  avatar: e.target.files[0],
                  previewUrl: URL.createObjectURL(e.target.files[0]),
                })
              }
              className="border border-gray-300 rounded-md p-3 mt-1 hover:border-blue-500 hover:ring-1 hover:ring-blue-400 outline-none"
              accept="image/*"
            />
            {formData.previewUrl && (
              <img
                src={formData.previewUrl}
                alt="Preview"
                className="mt-4 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
