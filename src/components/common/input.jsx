import React from "react";

const InputField = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} className="form-control" id={name} name={name}></input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputField;
