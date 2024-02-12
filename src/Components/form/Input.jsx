import React from "react";

const Input = ({
  name,
  register,
  errors,
  placeHolder,
  label,
  className,
  type,
  options,
  value,
}) => {
  return (
    <>
      <div className="f100">
        <div className="InputAddOn">
          <span className="InputAddOn-item">{label}</span>
          {type === "select" ? (
            <select
              className={className}
              {...register(name)}
            >
              <option value="">&nbsp;</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === "checkbox" ? (
            <input
              className={className}
              type="checkbox"
              {...register(name)}
            />
          ) : (
            <input
              className={className}
              type={type}
              placeholder={placeHolder}
              {...register(name)}
            />
          )}
        </div>
        {errors && errors[name] && (
          <p className="error_msg">{errors[name].message}</p>
        )}
      </div>
    </>
  );
};

export default Input;
