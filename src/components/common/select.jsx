import React from "react";

const SelectOptionField = ({
  name,
  label,
  error,
  selected,
  options,
  onChange: handleSelected,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        id={name}
        value={selected}
        onChange={handleSelected}
      >
        {options.map((option) => (
          <option key={option._id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectOptionField;
