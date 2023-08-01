import React, { createContext, useEffect, useState } from "react";
export const User = createContext({
  currentUser: {},
  groupname: "",
  UserIds: [],
  setUserIds: () => {},
  groupId: 0,
  setGroupId: () => {},
  setGroupname: () => {},
  setCurrentUser: () => {},
});
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [groupname, setGroupname] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [groupId, setGroupId] = useState(0);
  useEffect(() => {
  
},[groupId,userIds])
  console.log(groupId, userIds);
  const value = {
    currentUser,
    setCurrentUser,
    groupname,
    setGroupname,
    userIds,
    setUserIds,
    groupId,
    setGroupId,
  };
  return <User.Provider value={value}>{children}</User.Provider>;
};
