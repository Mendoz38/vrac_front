import React from "react";

const Textarea = ({ name, register, label, value }) => {
  return (
    <div className="InputAddOn">
      <label htmlFor={value}>{label}</label>
      <textarea name={name} {...register(name)}></textarea>
    </div>
  );
};

export default Textarea;
