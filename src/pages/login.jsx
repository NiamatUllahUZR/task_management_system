import React, { useContext, useReducer } from "react";
import ErrorMessage from "../component/errorMessage";
import SuccessMessage from "../component/sucessMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { User } from "../contextApi/user";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, [action.field]: action.value };
    case "SET_LOGIN_ERROR":
      return { ...state, loginError: action.value };
    case "SET_SHOW_ERROR_MESSAGE":
      return { ...state, showErrorMessage: action.value };
    case "SET_LOGIN_SUCCESS_MESSAGE":
      return { ...state, loginSuccessMessage: action.value };
    case "SET_LOGIN_SUCCESS":
      return { ...state, loginSuccess: action.value };
    case "SET_VIEW_PASSWORD":
      return { ...state, viewPassword: action.value };
    case "RESET_DATA":
      return {
        email: "",
        password: "",
        loginError: "",
        showErrorMessage: false,
      };
    default:
      return state;
  }
};

const LoginForm = () => {
  const initialState = {
    email: "",
    password: "",
    loginError: "",
    loginSuccessMessage: "",
    showErrorMessage: false,
    loginSuccess: false,
    viewPassword: false,
  };
  const { setCurrentUser } = useContext(User);

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const handleShowPassword = () => {
    dispatch({ type: "SET_VIEW_PASSWORD", value: !state.viewPassword });
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "SET_DATA",
      field: e.target.name,
      value: e.target.value,
    });
    dispatch({ type: "SET_LOGIN_ERROR", value: "" });
    dispatch({ type: "SET_SHOW_ERROR_MESSAGE", value: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.email === "" || state.password === "") {
      dispatch({
        type: "SET_LOGIN_ERROR",
        value: "Please fill out all the fields",
      });
      dispatch({ type: "SET_SHOW_ERROR_MESSAGE", value: true });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${state.email}&password=${state.password}`
      );
      if (response.ok) {
        const responseData = await response.json();
        sessionStorage.setItem("User", JSON.stringify(responseData[0]));
        const userData = sessionStorage.getItem("User");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setCurrentUser(parsedUserData);
        }
        if (responseData[0].role === "admin") {
          navigate("/admin");
        }
        if (responseData[0].role === "user") {
          navigate("/taskManagement");
        }
        dispatch({
          type: "SET_LOGIN_SUCCESS_MESSAGE",
          value: "Successfully Login",
        });
        dispatch({ type: "SET_LOGIN_SUCCESS", value: true });
        setTimeout(() => {
          dispatch({ type: "SET_LOGIN_SUCCESS_MESSAGE", value: "" });
          dispatch({ type: "SET_LOGIN_SUCCESS", value: false });
          dispatch({ type: "RESET_DATA" });
        }, 3000);
      } else {
        const errorData = response;
        dispatch({ type: "SET_LOGIN_ERROR", value: errorData.message });
        dispatch({ type: "SET_SHOW_ERROR_MESSAGE", value: true });
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: "SET_LOGIN_ERROR",
        value: "An error occurred during login",
      });
      dispatch({ type: "SET_SHOW_ERROR_MESSAGE", value: true });
    }
  };

  return (
    <div
      style={{ overflowX: "hidden" }}
      className="flex  items-center justify-center min-h-screen bg-gray-100 overflow-hidden"
    >
      <img
        src="/images/blobanimationtransparent.svg"
        alt=""
        className="hidden md:block absolute top-0 right-0 w-[407px] h-[354px]"
      />
      <img
        src="/images/blobanimation2.svg"
        alt=""
        className="hidden md:block absolute bottom-0 left-4 w-[300px] h-[354px]"
      />
      <div className=" absolute flex flex-col lg:flex-row items-center justify-center w-full  h-[33rem] px-8 sm:px-[5rem] md:px-[10rem]">
        {/* Form */}
        <div className=" w-full lg:w-1/2 h-full">
          <div className=" flex flex-col gap-[3.25rem] w-full  px-6 py-8 bg-white shadow-md rounded-md h-full">
            <div className="flex flex-col gap-2 align-middle">
              {" "}
              <h2 className=" flex justify-start text-base sm:justify-center sm:text-2xl font-medium">
                Welcome to TaskManagement
              </h2>
              <p className=" flex justify-start sm:justify-center text-gray-400 text-sm font-normal">
                Welcome back! Please enter your detail.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[3.5rem]"
            >
              <div className="flex flex-col gap-[2.5rem]">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="block font-medium">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2  border-gray-300 border-2 rounded-md focus:outline-none"
                    value={state.email}
                    onChange={handleChange}
                    readOnly
                    onFocus={(e) => {
                      e.currentTarget.readOnly = false;
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="block font-medium">
                    Password<span className="text-red-500">*</span>
                  </label>
                  {state.viewPassword ? (
                    <div className="flex items-center w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none">
                      <input
                        type="text"
                        id="password"
                        name="password"
                        className="w-full focus:outline-none"
                        value={state.password}
                        onChange={handleChange}
                      />{" "}
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-gray-300 text-sm"
                        onClick={handleShowPassword}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full focus:outline-none"
                        value={state.password}
                        onChange={handleChange}
                      />{" "}
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-gray-400 text-sm"
                        onClick={handleShowPassword}
                      />
                    </div>
                  )}
                </div>{" "}
              </div>

              <button
                type="submit"
                className="text-base text-white xl:text-lg w-full py-2 rounded-md hover:blue-red-800"
                style={{
                  background: "linear-gradient(to right, #6a00f4, #d100d1)",
                }}
              >
                Login
              </button>
              <h3 className=" self-center text-base mb-4 text-red-500">
                Note*: Enter the email and password that are mention in
                beginning note
              </h3>
            </form>
          </div>
        </div>
      </div>
      {state.loginError && (
        <ErrorMessage
          message={state.loginError}
          show={state.showErrorMessage}
        />
      )}
      {state.loginSuccess && (
        <SuccessMessage
          message={state.loginSuccessMessage}
          show={state.loginSuccess}
        />
      )}
    </div>
  );
};

export default LoginForm;
