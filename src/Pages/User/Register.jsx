import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveUser } from "../../api/user";

const Register = (props) => {
  const [profession, setProfession] = useState("");

  // yup validation
  const schema = yup
    .object({
      prenom: yup.string().required("Prénon obligatoire"),
      nom: yup.string().required("Nom obligatoire"),
      mail: yup.string().required("Email obligatoire"),
      profession: yup.string().required("Champs obligatoire"),
      entreprise: yup.string().when("profession", {
        is: (profession) => profession !== "amateur",
        then: (schema) =>
          schema.required("Merc de mentionner le nom de votre entreprise"),
        otherwise: (schema) => schema.min(0),
      }),
      pwd: yup.string().required("Merci de rentrer votre mot de passe"),
      confirmPwd: yup
        .string()
        .oneOf([yup.ref("pwd")], "Les 2 mots de passe ne sont pas identique"),
    })
    .required();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [entreprise, setEntreprise] = useState("");
  const [validate, setValidate] = useState(false);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(null);

  const onSubmit2 = (data) => {
    console.log("Data :", data);
    saveUser(data)
      .then((response) => {
        if (response.status !== 200) {
          setError(response.msg);
        } else {
          setOk(response.msg);
          setValidate(true);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const onSubmitForm = () => {
    //console.log("data", data);
  };

  // pour afficher un input supplémentaire pour les pros
  const [proInput, setProInput] = useState(false);
  const [proInputPlaceholder, setProInputPlaceholder] = useState("");
  useEffect(() => {
    setEntreprise("");
    if (profession === "vigneron") {
      setProInput(true);
      setProInputPlaceholder("Votre domaine");
    } else if (
      profession === "caviste" ||
      profession === "restaurant" ||
      profession === "revendeur"
    ) {
      setProInput(true);
      setProInputPlaceholder("Nom de votre commerce");
    } else if (profession === "amateur") {
      setProInput(false);
      setEntreprise("amateur");
    }
  }, [profession]);

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="login_item left">
          <h1>Déjà inscrit ?</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Se connecter
            </button>
          </Link>
        </div>
        <div className="login_form right">
          {validate === false ? (
            <form
              className="form_container rhf register"
              onSubmit={handleSubmit(onSubmit2)}
            >
              <h1>Créer son compte</h1>
              <label>Prénom</label>
              <input
                className="input"
                type="text"
                name="prenom"
                placeholder="Votre prénom"
                {...register("prenom")}
              />
              <label>Nom</label>
              <input
                className="input"
                type="text"
                name="nom"
                placeholder="Votre nom"
                {...register("nom")}
              />
              <label>Je suis :</label>
              <select
                className=""
                name="profession"
                {...register("profession", {
                  onChange: (e) => {
                    setProfession(e.currentTarget.value);
                  },
                })}
              >
                <option value="">Je suis</option>
                <option value="vigneron"> Un vigneron </option>
                <option value="caviste"> Un caviste </option>
                <option value="restaurant"> Un restaurateur </option>
                <option value="revendeur"> Un revendeur </option>
                <option value="amateur">
                  Juste un amateur de vin naturel !
                </option>
              </select>

              {proInput ? (
                <input
                  className="inputPro"
                  type="text"
                  name="entreprise"
                  placeholder={proInputPlaceholder}
                  {...register("entreprise")}
                />
              ) : null}

              <label>Mail</label>
              <input
                className="input"
                type="text"
                name="mail"
                placeholder="Votre mail"
                {...register("mail")}
              />
              <label>Pwd</label>
              <input
                className="input"
                type="password"
                name="pwd"
                placeholder="Votre mot de passe"
                {...register("pwd")}
              />
              <input
                className="input"
                type="password"
                name="confirmPwd"
                placeholder="Confirmer le mot de passe"
                {...register("confirmPwd")}
              />

              {errors.confirmPwd && (
                <div className="error_msg">{errors.confirmPwd.message}</div>
              )}
              {error && <div className="error_msg">{error}</div>}
              {ok && <div className="ok_msg">{ok}</div>}

              <button type="submit" className="green_btn">
                Enregistrer
              </button>
            </form>
          ) : (
            <div>
              <h1>Un mail vous a été envoyé </h1>
              <h3>Merci de valider votre compte pour vous connecter</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
