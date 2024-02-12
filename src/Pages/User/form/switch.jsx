import React, { useState } from "react";

const ToggleSwitch = ({ label, name, register }) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {label}
      <input
        type="checkbox"
        className="checkbox"
        name={name}
        id={name}
        {...register(name, {
          onChange: () => {
            checkHandler();
          },
        })}
      />
      <label className="label" htmlFor={name}>
        <span className={`toggle-switch-oui ${isChecked === false && "hidden"}`}>
          Oui
        </span>
        <span className={`toggle-switch-non ${isChecked === true && "hidden"}`}>
          Non
        </span>
      </label>
    </>
  );
};

export default ToggleSwitch;
