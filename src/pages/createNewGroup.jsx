import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../contextApi/user";

const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setGroupname } = useContext(User);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError("Group name cannot be empty");
      return;
    }
    setError("");
    setLoading(true);
    const newGroup = {
      name: groupName,
    };
    setGroupname(groupName);
    try {
      // Send a GET request to check if the group name already exists
      const response = await fetch(
        `http://localhost:5000/groups?name=${groupName}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setError("Group name already exists");
        setLoading(false);
        return;
      } else {
        const response = await fetch("http://localhost:5000/groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGroup),
        });
        if (!response.ok) {
          throw new Error("Failed to create group");
        } else {
          navigate("/addUser");
        }
      }

      setGroupName("");
    } catch (error) {
      console.error("Error checking group name:", error);
      setError("Error checking group name");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 h-full w-full">
      <img
        src="/images/blobanimationtransparent2.svg"
        alt=""
        className="hidden md:block absolute top-[40%] left-[70%] translate-x-[-50%] translate-y-[-50%] md:w-[269px] md:h-[281px]  lg:w-[407px] lg:h-[354px]"
      />
      <img
        src="/images/lighttransparent.svg"
        alt=""
        className="hidden md:block absolute bottom-[10%] left-[20%] md:w-[269px] md:h-[281px] lg:w-[300px] lg:h-[354px]"
      />{" "}
      <div className="absolute  flex items-center justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  lg:w-[36rem]">
        <form
          className="p-4 bg-white shadow-md rounded-md w-full animate-fade-in"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-2xl font-semibold mb-4">Create New Group</h2>
          <div className="mb-4">
            <label htmlFor="groupName" className="block font-medium">
              Group Name:
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className={`w-full px-3 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none`}
              disabled={loading}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            style={{
              background: "linear-gradient(to right, #6a00f4, #d100d1)",
            }}
            className={`w-full text-white px-4 py-2 rounded-md ${
              loading ? "opacity-75 cursor-not-allowed" : "hover:gradient"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default CreateGroupForm;
