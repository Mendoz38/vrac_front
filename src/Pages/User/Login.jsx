import React, { useEffect, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";
import { loginUser } from "../../api/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [reponseMail, setReponseMail] = useState("");
  const params = useParams();

  // yup validation
  const schema = yup
    .object({
      email: yup.string().required("Email obligatoire"),
      pwd: yup.string().required("Merci de rentrer votre mot de passe"),
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

  useEffect(() => {
    /* pour afficher les reponses de mail dans le titre  */
    if (params.Validate) {
      setReponseMail("Votre mail a été validé");
    }
    /* pour afficher les reponses de mail dans le titre  */
  }, [params.Validate]);

  const onSubmit = async (data) => {
    console.log("Data :", data);
    loginUser(data)
      //getAllUser(data)
      .then((res) => {
        if (res.status === 200) {
          console.log("res.status === 200", res.status);
          window.localStorage.setItem("VN_token", res.token);
          console.log("msg", res.msg);
          //user.token = res.token
          dispatch(setUser(res.user));
          setError();
          setRedirect(true);
        } else {
          console.log("msg", res.msg);
          setError(res.msg);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className="login_container">
      {redirect && <Navigate to={"/"} />}
      <div className="login_form_container">
        <div className="login_form left">
          <h1>Vous connecter</h1>
          {reponseMail && <h2 className="ok_msg"> {reponseMail} </h2>}
          <form
            className="form_container rhf "
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input"
              type="email"
              placeholder="vous@email.com"
              name="email"
              {...register("email")}
            />
            <input
              className="input"
              type="password"
              placeholder="Votre mot de passe"
              name="pwd"
              {...register("pwd")}
            />

            {errors.pwd && (
              <div className="error_msg">{errors.pwd.message}</div>
            )}
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Se connecter
            </button>
          </form>
          <Link to="/Forgot">
            <button type="button" className="yellow_btn">
              Mot de passe oublié
            </button>
          </Link>
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

export default Login;
