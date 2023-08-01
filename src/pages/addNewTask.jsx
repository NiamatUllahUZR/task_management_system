import React, { useState } from "react";

const AddNewTask= ({ isFormVisible, hideForm ,group}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      completed: false,
      userId: group.userIds,
      groupId: group.id,
    };

    try {
      // Send a POST request to create the new task using the fetch method
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      // Add the new task to the existing tasks array

      // Clear the form after successful submission
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      {isFormVisible && (
        <div
          className="animate-zoom-in fixed w-full h-screen  top-0 left-0 px-[20rem] py-[10rem] overflow-hidden"
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

export default AddNewTask;
