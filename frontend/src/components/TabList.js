import React from "react";

const TabList = (props) => {
  return (
    <div className="nav nav-tabs">
      <span
        onClick={() => props.displayCompleted(true)}
        className={props.viewCompleted ? "nav-link active" : "nav-link"}
      >
        Complete
      </span>
      <span
        onClick={() => props.displayCompleted(false)}
        className={props.viewCompleted ? "nav-link" : "nav-link active"}
      >
        Incomplete
      </span>
    </div>
  );
};

export default TabList;
