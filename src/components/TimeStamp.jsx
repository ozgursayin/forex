import React from "react";

const TimeStamp = () => {
  return (
    <div>
      <div className="time-stamp">
        {new Date().toJSON().slice(0, 10)}
        {"  "}
        {new Date().toJSON().slice(11, 19)} GMT
      </div>
    </div>
  );
};

export default TimeStamp;
