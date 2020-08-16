import React from "react";

const InputField = ({ name, label, value, onChange, type, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={name}
        name={name}
      ></input>
      {error && (
        <div className="alert alert-danger" style={{ marginTop: "2px" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
