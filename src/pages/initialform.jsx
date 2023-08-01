import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InitialForm = () => {
  const navigate = useNavigate();

  const [isFormVisible, setIsFormVisible] = useState(true);
  const handleFormSubmit = async (e) => {
    setIsFormVisible(false);
    navigate("/login");
  };

  return (
    <>
      {isFormVisible && (
        <>
          <div
            style={{
              borderRadius: "23% 77% 32% 68% / 54% 36% 64% 46%",
              background: "linear-gradient(to right, #6a00f4, #d100d1)",
            }}
            className="hidden md:block absolute top-0 right-0 w-[407px] h-[354px] bg-purple-800 animate-zoom-in"
          ></div>
          <div
            style={{
              borderRadius: "75% 25% 73% 27% / 19% 17% 83% 81% ",
              background: "linear-gradient(to bottom, #6a00f4, #d100d1)",
            }}
            className="hidden md:block absolute bottom-0 left-4 w-[300px] h-[354px] bg-purple-800 animate-zoom-in"
          ></div>
          <div
            className="animate-zoom-in absolute w-full h-screen top-0 left-0 px-4 py-[7rem] sm:px-8 sm:py-[10rem] md:px-12 md:py-[12rem] lg:px-[15rem]   xl:px-[20rem] xl:py-[13rem] "
            style={{
              background:
                "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
            }}
          >
            <div className="flex flex-col gap-4 p-4 bg-white shadow-md w-full h-full justify-between">
              <h3 className="text-xl mb-4 text-red-500 font-semibold">
                Important Note:
              </h3>
              <p className="text-gray-600 flex-grow">
                I used mock API has pre-defined user data for testing purposes.
                The Mock Api have following username and password:
              </p>
              <ul className="flex-grow">
                <li>
                  <span className="font-bold"> Email:</span> john@example.com ,{" "}
                  <span className="font-bold">Password:</span> hashed_password ,
                  <span className="font-bold">Role</span> :admin
                </li>
                <li>
                  <span className="font-bold"> Email:</span>
                  jane@example.com ,{" "}
                  <span className="font-bold">Password:</span>
                  hashed_password ,<span className="font-bold">Role</span> :user
                </li>
                <li>
                  <span className="font-bold"> Email:</span> alice@example.com ,
                  <span className="font-bold">Password:</span> hashed_password ,
                  <span className="font-bold">Role</span> :user
                </li>
              </ul>
              <button
                className="border px-8 py-2 text-white rounded-md ml-2 self-end"
                style={{
                  background: "linear-gradient(to right, #6a00f4, #d100d1)",
                }}
                onClick={() => handleFormSubmit()}
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default InitialForm;
