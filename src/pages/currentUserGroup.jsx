import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TaskManager from "./TaskManager";

import { User } from "../contextApi/user";
import { useNavigate } from "react-router-dom";
import AddNewTask from "./addNewTask";

const CurrentUserGroup = () => {
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); // Initialize to null
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [Group, setGroup] = useState({});
  const { setCurrentUser, currentUser } = useContext(User);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:5000/users");
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchGroupData = async () => {
      try {
        const groupResponse = await axios.get("http://localhost:5000/groups");
        setGroups(groupResponse.data);
        if (groupResponse.data.length > 0) {
          setSelectedGroup(groupResponse.data[0]); // Set the first group as selected
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    const fetchGroupTasks = async () => {
      if (selectedGroup) {
        try {
          const tasksResponse = await axios.get(
            `http://localhost:5000/tasks?groupId=${selectedGroup.id}`
          );
          setTasks(tasksResponse.data);
        } catch (error) {
          console.error("Error fetching group tasks:", error);
        }
      }
    };

    fetchUserData();
    fetchGroupData();
  }, []); // Empty dependency array, only fetch user and group data once on mount

  useEffect(() => {
    const fetchGroupTasks = async () => {
      if (selectedGroup) {
        try {
          const tasksResponse = await axios.get(
            `http://localhost:5000/tasks?groupId=${selectedGroup.id}`
          );
          setTasks(tasksResponse.data);
        } catch (error) {
          console.error("Error fetching group tasks:", error);
        }
      }
    };

    fetchGroupTasks();
  }, [selectedGroup]); // Fetch group tasks whenever selectedGroup changes

  if (!users.length || !groups.length) {
    return <div>Loading...</div>;
  }
  const handleCompleteTask = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/${taskId}`);
      const taskToUpdate = response.data;
      const updatedTask = {
        ...taskToUpdate,
        completed: true,
      };
      await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTask);

      const updatedResponse = await axios.get(
        `http://localhost:5000/tasks?groupId=${selectedGroup.id}`
      );
      setTasks(updatedResponse.data);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      const response = await axios.get(
        `http://localhost:5000/tasks?groupId=${selectedGroup.id}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const showForm = (group) => {
    setIsFormVisible(true);
    setGroup(group);
  };

  const logout = () => {
    sessionStorage.clear();
    setCurrentUser({});
    navigate("/");
  };

  const hideForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="p-[1.5rem] sm:p-4 relative">
      <div className="flex items-center justify-between border-b-2 border-purple-400 p-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Welcome {currentUser.name}!👋
            <p className="text-sm text-gray-500">user</p>
          </h2>
        </div>
        <button
          className=" bg-purple-600 px-[0.5rem] text-xs md:text-base md:px-4 py-2 text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">All Groups:</h2>
        <div className="flex gap-4">
          {groups.map((group) => (
            <button
              key={group.id}
              className={`px-4 py-2 ${
                selectedGroup?.id === group.id
                  ? "border-b-2 border-purple-400 text-purple-600"
                  : ""
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
      {selectedGroup && (
        <div>
          <div className="mt-4 h-full flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-[1rem]">Tasks:</h2>
              <button
                className="bg-gray-100 text-gray-600  px-4 py-1"
                onClick={() => showForm(selectedGroup)}
              >
                Create New Task
              </button>{" "}
            </div>

            <ul className="h-full">
              <TaskManager
                tasks={tasks}
                handleCompleteTask={handleCompleteTask}
                handleDeleteTask={handleDeleteTask}
              />
            </ul>
          </div>
        </div>
      )}
      <AddNewTask
        isFormVisible={isFormVisible}
        group={Group}
        hideForm={hideForm}
      />
    </div>
  );
};

export default CurrentUserGroup;
