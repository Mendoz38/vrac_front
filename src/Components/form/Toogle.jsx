import React from "react";

const Toggle = ({ label, name, register }) => {
  return (
    <>
      <div className="f100 flex toogle">
        <div className="f50">
        {label}
        <input
          type="checkbox"
          className="checkbox"
          name={name}
          id={name}
          {...register(name)}
        />
        <label className="label" htmlFor={name}>
          <span className="toggle-switch-oui">Oui</span>
          <span className="toggle-switch-non">Non</span>
        </label></div>
      <div className="f50"></div>
      </div>
    </>
  );
};

export default Toggle;
