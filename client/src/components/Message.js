import React from "react";

const Message = ({ handleShow, content }) => {
  return (
    <div className="wrapper">
      <div className="view-msg">
        <p>
          {content}
        </p>
        <i className="fas fa-times" onClick={handleShow}></i>
      </div>
    </div>
  );
};

export default Message;
