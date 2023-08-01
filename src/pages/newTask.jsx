import React, { useContext, useState } from "react";
import { User } from "../contextApi/user";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { UserIds, groupId } = useContext(User);
  const navigate = useNavigate();

  const skip = () => {
    navigate("/adminSide");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title: title,
      description: description,
      completed: false,
      userId: UserIds,
      groupId: groupId,
    };

    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        navigate("/adminSide");
      }
      else{
        throw new Error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div
      className="animate-zoom-in absolute w-full h-screen top-0 left-0 px-[2rem] lg:px-[20rem] py-[10rem]"
      style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
      }}
    >
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-8 p-4 bg-white shadow-md w-full h-full"
      >
        <h2 className="text-lg">Create new task for the group</h2>
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
          >
            Create
          </button>
          <button
            className="border border-gray-400 text-gray-400 px-2 py-1 rounded-md ml-2"
            onClick={() => skip()}
          >
            Skip
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default NewTask;
