import React, {useState} from "react";

const Switch = ({ label, name, register, placeholder, className, type, value }) => {



    const [isChecked, setIsChecked] = useState(false)
    
 //   console.log("isChecked", isChecked)

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

    return (
    <>
      {label}{" "}
        <input 
            type="checkbox" 
            className="checkbox" 
            name={name} 
            id={label} 
            toggled="true"
            {...register(name)}
            onChange={() => {
              checkHandler()
              
            }}
        />
        <label className="label" htmlFor={label}>
          <span className={`toggle-switch-oui ${isChecked===false && "hidden"}`}>Oui</span>
          <span className={`toggle-switch-non ${isChecked===true && "hidden"}`}>Non</span>
        </label>
    </>
  );
};

export default Switch;
