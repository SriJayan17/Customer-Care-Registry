import React from "react";

const Popup = (content, error, popupHandler) => {
  return (
    <div className={error ? "popup error" : "popup success"}>
      <i className="fas fa-times" onClick={popupHandler}></i>
      <p>content</p>
    </div>
  );
};

export default Popup;
