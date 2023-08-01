import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import axios from "axios";
import {
  faAlignLeft,
  faCheck,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskManager = ({ tasks, handleCompleteTask, handleDeleteTask }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  // Define a function to handle the drag-and-drop reordering of tasks
  const moveTask = (dragIndex, hoverIndex) => {
    const draggedTask = tasks[dragIndex];
    const updatedTasks = [...tasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    // Update the state with the new order of tasks
    // (You may have a function to handle this update)
  };

  const TaskItem = ({ task, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "task",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "task",
      hover: (item) => {
        if (item.index !== index) {
          moveTask(item.index, index);
          item.index = index;
        }
      },
    });

    const opacity = isDragging ? 0.5 : 1;

    return (
      <li
        ref={(node) => drag(drop(node))}
        key={task.id}
        className={`p-2 ${
          task.completed ? "bg-green-100" : "bg-purple-100"
        } flex flex-col gap-4 shadow-md h-max animate-fade-in`}
        style={{ opacity }}
      >
        <h3 className="font-semibold text-[1.5rem] md:text-base">
          {task.title}
        </h3>
        <p className="text-gray-600 text-[1.2rem] md:text-base">
          {" "}
          <FontAwesomeIcon icon={faAlignLeft} className="mr-2" />
          {task.description}
        </p>
        <p
          className={`text-xs ${
            task.completed ? "text-green-600" : "text-red-600"
          }`}
        >
          {" "}
          {task.completed ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faTimes} />
          )}
          {task.completed ? "Completed" : "Incomplete"}
        </p>
        <p className="text-sm font-medium mt-2">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          {Array.isArray(task.userId) ? (
            <span key={task.userId}>{getUserName(task.userId)}</span>
          ) : (
            <span>{getUserName(task.userId)}</span>
          )}
        </p>
        <div className="flex gap-4 justify-end">
          {!task.completed && (
            <button
              className="bg-purple-600 text-white px-2 py-1 rounded-md"
              onClick={() => handleCompleteTask(task.id)}
            >
              Complete
            </button>
          )}
          <button
            className="border border-gray-400 text-gray-400 px-2 py-1 rounded-md"
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </button>{" "}
        </div>
      </li>
    );
  };

  const getUserName = (userIds) => {
    const userNames = userIds.map((userId) => {
      const user = users.find((user) => user.id === userId);
      return user ? user.name : "Unknown User";
    });

    return userNames.join(", ");
  };

  return (
    <div className="h-full lg:h-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks.map((task, index) => (
        <TaskItem key={task.id} task={task} index={index} />
      ))}
    </div>
  );
};

export default TaskManager;
