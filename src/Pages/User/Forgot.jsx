import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPwd } from "../../api/user";

const Forgot = () => {
  const [email, setEmail] = useState("");
  //const [forgot, setForgot] = useState(false);
  const [error, setError] = useState(null);

  let data = {
    email: email,
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    forgotPwd(data)
      .then((res) => {
        console.log(res);
        setError(res.msg);
        //setForgot(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="login_form left">
          <>
            <h1>Mot de passe oublié ?</h1>

            <form className="form_container" onSubmit={onSubmitForm}>
              <input
                type="email"
                placeholder="vous@email.com"
                name="email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                value={data.email}
                required
                className="input"
              />
              {error === "email envoyé" ? (
                <h3 className="ok_msg">
                  Un mail vous a été envoyé pour réinitialiser votre mot de
                  passe
                </h3>
              ) : (
                <>
                  {error && <div className="error_msg">{error}</div>}
                  <button type="submit" className="green_btn">
                    Réinitialiser le mot de passe
                  </button>
                </>
              )}
            </form>

            <Link to="/Login">
              <button type="button" className="yellow_btn">
                Se connecter
              </button>
            </Link>
          </>
        </div>
        <div className="login_item right">
          <h1>Nouveau ici ?</h1>
          <Link to="/Register">
            <button type="button" className="white_btn">
              S'inscrire
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
