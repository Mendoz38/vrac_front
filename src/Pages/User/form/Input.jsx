import React from "react";

const Input = ({ name, register, placeHolder, label, className, type, value}) => {
  return (
    <>

    <div className="f100">
            <div className="InputAddOn">
              <span className="InputAddOn-item">Domaine</span>
              <input
                className="InputAddOn-field"
                type="text"
                readOnly
                defaultValue={ user.infos.prenom}
                {...register("domaine")}
              />
            </div>
            {errors.prenom && <p className="error_msg">Prénom obligatoire</p>}
          </div>
    
    </>
  );
};

export default Input;
