import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/login";
import CurrentUserGroup from "./pages/currentUserGroup";
import { useContext, useEffect } from "react";
import { User } from "./contextApi/user";
import CreateGroupForm from "./users/admin";
import UserForm from "./pages/addUser";
import InitialForm from "./pages/initialform";
import UserGroupComponent from "./pages/userGroup";
import TaskUpdateForm from "./pages/form";
import NewTask from "./pages/newTask";

function App() {
  const { setCurrentUser, currentUser } = useContext(User);
  useEffect(() => {
    const userData = sessionStorage.getItem("User");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setCurrentUser(parsedUserData);
    }
  }, [currentUser.id]);
  return (
    <Routes>
      <Route path="/" element=<InitialForm /> />
      <Route path="/login" element=<LoginForm /> />
      {currentUser.role === "user" && Object.keys(currentUser).length > 0 ? (
        <>
          <Route path="/taskManagement" element={<CurrentUserGroup />} />
        </>
      ) : (
        <Route path="/taskManagement" element={<LoginForm />} />
      )}
      {currentUser.role === "admin" && Object.keys(currentUser).length > 0 ? (
        <>
          <Route path="/admin" element={<CreateGroupForm />} />
          <Route path="/addUser" element={<UserForm />} />{" "}
          <Route path="/adminSide" element={<UserGroupComponent />} />{" "}
          <Route path="/newTask" element={<NewTask />} />
        </>
      ) : (
        <Route path="/taskManagement" element={<LoginForm />} />
      )}
    </Routes>
  );
}

export default App;
//this is comment