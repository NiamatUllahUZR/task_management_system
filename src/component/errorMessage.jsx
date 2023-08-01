import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const ErrorMessage = ({ message, show }) => {
  return (
    <div
      className={`absolute w-[15rem] flex gap-2 bg-red-300 text-white px-4 py-2 rounded-lg ${
        show
          ? "top-8 translate-y-0 opacity-100"
          : "top-[-4rem] translate-y-[-2rem] opacity-0"
      } transition-top duration-300 ease-in-out transition-translate-y transition-opacity`}
    >
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className="text-xl text-red-500"
      />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
