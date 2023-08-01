import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { User } from "../contextApi/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPaperPlane,
  faTrash,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import UserDetail from "./userdetail";
import { useNavigate } from "react-router-dom";
import GroupDetail from "./groupdetail";
import AddNewUser from "./addNewUser";
import AddNewTask from "./addNewTask";
import AddNewUserINExistingGroup from "./adduserinexistingGroup";

const UserGroupComponent = () => {
  const [newuser, setnewUser] = useState(false);
  const { currentUser, setCurrentUser } = useContext(User);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [user, setuser] = useState({});
  const [group, setgroup] = useState({});
  const [showGroup, setShowGroup] = useState(false);
  const [showuser, setShowUser] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [groupId, setGroupId] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newuserExostingGroup, setnewUserExistingGroup] = useState(false);
  const showuserForm = () => {
    setIsFormVisible(true);
    setnewUser(true);
  };
  const showexistingUser = (groupId) => {
    setIsFormVisible(true);
    setGroupId(groupId);
    setnewUserExistingGroup(true);
  };
  const handleaddTask = (groupId) => {
    setIsFormVisible(true);
    setNewTask(true);
    setGroupId(groupId);
  };
  const showgroupForm = (data) => {
    setIsFormVisible(true);
    setShowGroup(true);

    setgroup(data);
  };
  const showForm = (data) => {
    setIsFormVisible(true);
    setuser(data);
    setShowUser(true);
  };
  const hideForm = () => {
    setIsFormVisible(false);
    setNewTask(false);
    setGroupId({});
    setnewUser(false);
    setShowGroup(false);
    setShowUser(false);
    setnewUserExistingGroup(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch users data from the API
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    // Fetch groups data from the API
    axios
      .get("http://localhost:5000/groups")
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, []);

  // Function to handle user deletion
  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:5000/users/${userId}`)
      .then((response) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  const handleDeleteGroup = (groupId) => {
    axios
      .delete(`http://localhost:5000/groups/${groupId}`)
      .then((response) => {
        setGroups((prevUsers) =>
          prevUsers.filter((group) => group.id !== groupId)
        );
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  const logout = () => {
    sessionStorage.clear();
    setCurrentUser({});
    navigate("/");
  };
  const newgroup = () => {
    navigate("/admin");
  };
  return (
    <div className="p-8 bg-gray-100 ">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-purple-400 p-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Welcome {currentUser.name}!👋
            <p className="text-sm text-gray-500">Admin</p>
          </h2>{" "}
        </div>
        <button
          className=" bg-purple-600 px-[0.5rem] text-xs md:text-base md:px-4 py-2 text-white"
          onClick={logout}
        >
          Logout{" "}
        </button>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-4">
        {/* Users section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold mb-4">All Users</h3>
            <button
              className="text-xs px-[0.5rem] md:text-base md:px-4  py-2 bg-gray-300 text-gray-600"
              onClick={showuserForm}
            >
              Add new user
            </button>{" "}
          </div>

          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between bg-white shadow-md p-4 border-b-2 border-gray-200 hover:bg-slate-100"
            >
              <div>
                <p className="text-md font-semibold mb-2">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>{" "}
              </div>
              <div>
                <button
                  className="text-gray-500 px-3 py-1 mt-2 rounded"
                  onClick={() => showForm(user)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  className="text-red-500 px-3 py-1 mt-2 rounded"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Groups section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold mb-4">All Groups</h3>
            <button
              className="px-[0.5rem] text-xs md:text-base md:px-4  py-2 bg-gray-300 text-gray-600"
              onClick={newgroup}
            >
              Create new group
            </button>{" "}
          </div>

          {groups.map((group) => (
            <div
              key={group.id}
              className="flex justify-between bg-white shadow-md p-4 border-b-2 border-gray-200 hover:bg-slate-100"
            >
              <div>
                <p className="text-md font-semibold mb-2">{group.name}</p>
              </div>
              <div>
                {" "}
                <button
                  className="text-gray-500 px-3 py-1 mt-2 rounded"
                  title="add user"
                  onClick={() => showexistingUser(group)}
                >
                  <FontAwesomeIcon icon={faUserEdit} />
                </button>
                <button
                  className="text-gray-500 px-3 py-1 mt-2 rounded"
                  title="post task"
                  onClick={() => handleaddTask(group)}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
                <button
                  className="text-gray-500 px-3 py-1 mt-2 rounded"
                  onClick={() => showgroupForm(group)}
                  title="detail"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  className="text-red-500 px-3 py-1 mt-2 rounded"
                  onClick={() => handleDeleteGroup(group.id)}
                  title="delete"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {newuser && (
        <AddNewUser isFormVisible={isFormVisible} hideForm={hideForm} />
      )}
      {newuserExostingGroup && (
        <AddNewUserINExistingGroup
          group={groupId}
          isFormVisible={isFormVisible}
          hideform={hideForm}
        />
      )}
      {newTask && (
        <AddNewTask
          isFormVisible={isFormVisible}
          hideForm={hideForm}
          group={groupId}
        />
      )}
      {showuser && (
        <UserDetail
          isFormVisible={isFormVisible}
          hideForm={hideForm}
          user={user}
        />
      )}
      {showGroup && (
        <GroupDetail
          isFormVisible={isFormVisible}
          hideForm={hideForm}
          group={group}
        />
      )}
    </div>
  );
};

export default UserGroupComponent;
