import React from "react";
import { openDB } from "idb";
import { useNavigate } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    number: "",
    address: "",
    avatar: null, // Store file object
    previewUrl: null, // Image preview before saving
  };

  // Character limits
  limits = {
    name: 50,
    email: 75,
    address: 100,
    number: 10,
  };

  fileInputRef = React.createRef(); // Reference for file input

  handleInputChange = (e, field) => {
    const value = e.target.value;
    const limit = this.limits[field];

    if (value.length <= limit) {
      this.setState({ [field]: value });
    }
  };

  async saveImageToDB(file, contactId) {
    const db = await openDB("contacts-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("images")) {
          db.createObjectStore("images");
        }
      },
    });
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = async () => {
        await db.put("images", reader.result, contactId); // Store base64 data
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  add = async (e) => {
    e.preventDefault();
    if (
      !this.state.name ||
      !this.state.email ||
      !this.state.number ||
      !this.state.address
    ) {
      alert("All fields with * are mandatory!");
      return;
    }

    const contactId = Math.random().toString(36).substr(2, 9);
    let imageUrl = null;

    if (this.state.avatar instanceof File) {
      imageUrl = await this.saveImageToDB(this.state.avatar, contactId);
    }

    const newContact = {
      id: contactId,
      name: this.state.name,
      email: this.state.email,
      number: this.state.number,
      address: this.state.address,
      avatar: imageUrl, // Store base64 data
    };

    this.props.addContactHandler(newContact);

    // Reset form
    this.setState({
      name: "",
      email: "",
      number: "",
      address: "",
      avatar: null,
      previewUrl: null,
    });

    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = "";
    }

    // Navigate to home page after adding contact
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="flex items-center flex-col py-10 ">
        <form
          className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-400 outline-none duration-300"
          onSubmit={this.add}
        >
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
            Add Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col col-span-2">
              <label htmlFor="name" className="text-gray-700 font-medium">
                Name<span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({this.state.name.length}/{this.limits.name} characters)
                </span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={this.state.name}
                onChange={(e) => this.handleInputChange(e, "name")}
                maxLength={this.limits.name}
                className="border border-gray-300 rounded-md p-3 mt-1 hover:border-blue-500 hover:ring-1 hover:ring-blue-400 outline-none break-words"
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col md:col-span-1 col-span-2 ">
              <label htmlFor="number" className="text-gray-700 font-medium">
                Phone No.<span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({this.state.number.length}/{this.limits.number} characters)
                </span>
              </label>
              <input
                type="tel"
                id="number"
                placeholder="Enter Phone No."
                value={this.state.number}
                onChange={(e) => this.handleInputChange(e, "number")}
                maxLength={this.limits.number}
                className="border border-gray-300 rounded-md p-3 mt-1 outline-none hover:border-blue-500 hover:ring-1 hover:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col md:col-span-1 col-span-2">
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email<span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({this.state.email.length}/{this.limits.email} characters)
                </span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={(e) => this.handleInputChange(e, "email")}
                maxLength={this.limits.email}
                className="border border-gray-300 rounded-md p-3 mt-1 hover:border-blue-500 hover:ring-1 hover:ring-blue-400 outline-none break-words"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col col-span-2">
              <label htmlFor="address" className="text-gray-700 font-medium">
                Address<span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({this.state.address.length}/{this.limits.address} characters)
                </span>
              </label>
              <textarea
                id="address"
                placeholder="Enter Address"
                value={this.state.address}
                onChange={(e) => this.handleInputChange(e, "address")}
                maxLength={this.limits.address}
                rows="3"
                className="border border-gray-300 rounded-md p-3 mt-1 hover:border-blue-500 hover:ring-1 hover:ring-blue-400 outline-none resize-none break-words"
              />
            </div>

            {/* Upload Photo */}
            <div className="flex flex-col col-span-2">
              <label htmlFor="image" className="text-gray-700 font-medium">
                Upload Photo
              </label>
              <input
                type="file"
                id="image"
                ref={this.fileInputRef}
                onChange={(e) =>
                  this.setState({
                    avatar: e.target.files[0],
                    previewUrl: URL.createObjectURL(e.target.files[0]),
                  })
                }
                className="border border-gray-300 rounded-md p-3 mt-1 hover:border-blue-500 hover:ring-1 hover:ring-blue-400 outline-none"
                accept="image/*"
              />
              {this.state.previewUrl && (
                <img
                  src={this.state.previewUrl}
                  alt="Preview"
                  className="mt-4 w-24 h-24 rounded-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Wrapper component to use useNavigate hook
const AddContactWrapper = (props) => {
  const navigate = useNavigate();
  return <AddContact {...props} navigate={navigate} />;
};

export default AddContactWrapper;
