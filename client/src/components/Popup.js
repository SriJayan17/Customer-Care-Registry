import React from "react";

const Popup = ({content, type, popupHandler}) => {
  return (
      <div className={`popup ${type}`}>
        <i className="fas fa-times" onClick={popupHandler}></i>
        <p>{content}</p>
      </div>
  );
};

export default Popup;
