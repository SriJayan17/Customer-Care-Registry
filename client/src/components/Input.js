import React from "react";

const Input = ({ features }) => {
  const { type, name, id, label, data, changeHandler, error } = features;

  return (
    <div className="form-details">
      <label htmlFor={id}>{label}</label>
      <input
        className={error ? "error" : ""}
        id={id}
        type={type}
        name={name}
        value={data}
        onChange={(e) => changeHandler(e)}
        autoComplete="off"
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
