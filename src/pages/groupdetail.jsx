import axios from "axios";
import React, { useEffect, useState } from "react";

const GroupDetail = ({ isFormVisible, hideForm, group }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [Group, setGroup] = useState([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupResponse = await axios.get("http://localhost:5000/groups");
        const taskdata = groupResponse.filter(
          (item) => item.groupId === group.id
        );

        setGroup(taskdata);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    fetchGroupData();
  }, [group.id]);

  return (
    <>
      {isFormVisible && (
        <div className="animate-zoom-in fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
          <div className="p-4 bg-white shadow-md w-96">
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  How many tasks are posted?{" "}
                </label>
                <p>{Group.length}</p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  How many user are added?{" "}
                </label>

                <p>{group.userIds.length}</p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  How many tasks are completed?{" "}
                </label>

                <p>
                  {Group.length > 0 ? (
                    <div>
                      Total tasks completed:{" "}
                      {Group.filter((item) => item.completed).length}
                    </div>
                  ) : (
                    <div>No tasks are completed</div>
                  )}
                </p>
              </div>
              {isEditing ? (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
                    onClick={() => {
                      setIsEditing(false);
                      hideForm();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 ml-2"
                    onClick={() => hideForm()}
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupDetail;
