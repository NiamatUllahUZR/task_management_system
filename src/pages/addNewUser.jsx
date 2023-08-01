import React, { useState } from "react";

const AddNewUser = ({ isFormVisible, hideForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("User created successfully");
        hideForm();
        setName("");
        setPassword("");
        setEmail("");
        setRole("User");
      } else {
        // Handle error response
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      {isFormVisible && (
        <div
          className="animate-zoom-in fixed w-full h-screen top-0 left-0 px-4 lg:px-[20rem] py-[8rem] "
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
          }}
        >
          <form
            onSubmit={handleFormSubmit}
            className="p-4 bg-white shadow-md w-full h-full"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block font-medium">
                Role:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
            >
              Create
            </button>
            <button
              className="border border-gray-400 text-gray-400 px-2 py-1 rounded-md ml-2"
              onClick={() => hideForm()}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewUser;
