import React from "react";

const Select = ({ label, name, register, options }) => {
  return (
    <>
      <div className="InputAddOn">
        <span className="InputAddOn-item">{label}</span>
        <select
          className="InputAddOn-field xselect"
          name={name}
          {...register(name)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
