import React from "react";

const Loading = () => {
  return (
    <div className="container-fluid text-center my-5 ">
      <div
        className="spinner-border text-dark"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
