import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = ({ isFormVisible, group, hideform }) => {
  console.log(group);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleCheckboxChange = (e) => {
    console.log(e.target.value);
    const userId = parseInt(e.target.value, 10);
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the group name is not empty and has selected users
      if (group.name === "" || selectedUsers.length === 0) {
        return;
      }

      // Convert userIds to an array if it is a string
      const updatedGroupData = {
        ...group,
        userIds: Array.isArray(group.userIds) ? group.userIds : [],
      };

      // Filter out selectedUsers that are already in the group
      const newSelectedUsers = selectedUsers.filter(
        (userId) => !updatedGroupData.userIds.includes(userId)
      );

      // Check if all selected users are already in the group
      if (newSelectedUsers.length === 0) {
        alert("All selected users are already in the group.");
        return;
      }

      // Concatenate selectedUsers with the existing userIds
      updatedGroupData.userIds.push(...newSelectedUsers);

      const response = await fetch(`http://localhost:5000/groups/${group.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGroupData),
      });

      if (response.ok) {
        hideform();
      } else {
        alert("Failed to update group");
      }
    } catch (error) {
      console.error("Error creating/updating group:", error);
    }
  };
  const anyUserLeftToAdd = users.some(
    (user) => !group.userIds.includes(user.id)
  );

  return (
    <>
      {isFormVisible && (
        <div
          className="animate-zoom-in fixed w-full h-screen  top-0 left-0 px-[30rem] py-[10rem] overflow-hidden"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
          }}
        >
          <div
            className={`p-4 bg-white animate-fade-in w-full ${
              anyUserLeftToAdd ? "h-[20rem]" : "h-[10rem]"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Select Users</h2>
            {anyUserLeftToAdd ? (
              <p className="text-sm text-gray-500 font-semibold mb-4">
                Select Users you want to add in the group
              </p>
            ) : (
              <p className="text-sm text-gray-500 font-semibold mb-4">
                {" "}
                No user is left to add{" "}
              </p>
            )}

            <form className="" onSubmit={handleFormSubmit}>
              {users.map(
                (user) =>
                  !group.userIds.includes(user.id) && (
                    <div key={user.id} className="mb-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          value={user.id}
                          checked={selectedUsers.includes(user.id)}
                          onChange={handleCheckboxChange}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">{user.name}</span>
                      </label>
                    </div>
                  )
              )}
              {anyUserLeftToAdd && (
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(to right, #6a00f4, #d100d1)",
                  }}
                  className="px-4 py-2 text-white rounded-md mt-4"
                >
                  Submit
                </button>
              )}
              <button
                className="border border-gray-400 text-gray-400 px-2 py-1 rounded-md ml-2"
                onClick={() => hideform()}
              >
                Cancel
              </button>{" "}
            </form>
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
};

export default UserForm;
