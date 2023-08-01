import React, { useState, useEffect, useContext } from "react";
import { User } from "../contextApi/user";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { groupname, setUserIds, setGroupId } = useContext(User);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data));
  }, []);
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
      if (groupname === "" || selectedUsers.length === 0) {
        return;
      }

      const existingGroup = groups.find((group) => group.name === groupname);
      if (existingGroup) {
        const updatedGroupData = {
          ...existingGroup,
          userIds: selectedUsers,
        };
        const response = await fetch(
          `http://localhost:5000/groups/${existingGroup.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedGroupData),
          }
        );
        setUserIds(selectedUsers);
        setGroupId(existingGroup.id);
        if (response.ok) {
          navigate("/newTask");
        } else {
          alert("Failed to update group");
        }
      }
    } catch (error) {
      console.error("Error creating/updating group:", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-[3rem] lg:px-[30rem] h-full">
      <img
        src="/images/blobanimation.svg"
        alt=""
        className="absolute w-[30rem] top-0 left-4 hidden md:block"
      />
      <img
        src="/images/pattern.svg"
        alt=""
        className="absolute w-[30rem] bottom-0 right-2 hidden md:block"
      />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 bg-white animate-fade-in w-[20rem] sm:w-[26rem] h-[20rem]">
        <h2 className="text-2xl font-semibold mb-4">Select Users</h2>
        <p className="text-sm text-gray-500 font-semibold mb-4">
          Select Users you want to add in the group
        </p>

        <form className="" onSubmit={handleFormSubmit}>
          {users.map((user) => (
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
          ))}
          <button
            type="submit"
            style={{
              background: "linear-gradient(to right, #6a00f4, #d100d1)",
            }}
            className="px-4 py-2 text-white rounded-md mt-4"
          >
            Submit
          </button>
        </form>
      </div>{" "}
    </div>
  );
};

export default UserForm;
