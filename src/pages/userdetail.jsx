import React, { useState } from "react";

const UserDetail = ({ isFormVisible, hideForm, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isFormVisible && (
        <div className="animate-zoom-in fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
          <div className="p-4 bg-white shadow-md w-96">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Name:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    value={user.name}
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Email:
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    value={user.email}
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Password:
                </label>
                {isEditing ? (
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    value={user.password}
                  />
                ) : (
                  <p>{user.password}</p>
                )}
              </div>
              {isEditing ? (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
                    onClick={() => {
                      setIsEditing(false);
                      hideForm();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 ml-2"
                    onClick={() => hideForm()}
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetail;
