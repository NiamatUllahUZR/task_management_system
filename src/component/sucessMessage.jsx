import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SuccessMessage = ({ message, show }) => {
  return (
    <div
      className={`absolute w-[15rem] flex gap-2 bg-green-300 text-white px-4 py-2 rounded-lg ${
        show
          ? "top-8 translate-y-0 opacity-100"
          : "top-[-4rem] translate-y-[-2rem] opacity-0"
      } transition-top duration-300 ease-in-out transition-translate-y transition-opacity`}
    >
      <FontAwesomeIcon icon={faCheck} className="text-xl text-green-500" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default SuccessMessage;
