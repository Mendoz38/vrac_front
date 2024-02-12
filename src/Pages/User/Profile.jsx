import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../Slices/UserSlice";
import { useForm } from "react-hook-form"
import { updateProfil } from "../../api/user";
import "./profile.css";

const Profile = (props) => {
  const user = useSelector(selectUser);
  //console.log("user", user)
  const dispatch = useDispatch();
  const [message, setMessage] = useState("")

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null); 



  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
      
  useEffect(() => {
    let defaultValues = {};
    defaultValues.id =  user.infos.id;
    defaultValues.membre_grade =  user.infos.membre_grade;
    defaultValues.prenom =  user.infos.prenom;
    defaultValues.nom =  user.infos.nom;
    defaultValues.mail = user.infos.mail;
    defaultValues.profession = user.infos.profession;
    defaultValues.entreprise = user.infos.entreprise;
    defaultValues.pro = user.infos.pro;
    defaultValues.id_commerce = user.infos.id_commerce;
    defaultValues.id_commerce2 = user.infos.id_commerce2;
    defaultValues.id_commerce3 = user.infos.id_commerce3;
    defaultValues.id_dossier = user.infos.id_dossier;
    defaultValues.id_dossier2 = user.infos.id_dossier2;
    defaultValues.id_dossier3 = user.infos.id_dossier3;
    defaultValues.logo = user.infos.logo;
    defaultValues.ville = user.infos.ville;
    defaultValues.description = user.infos.description;
    // obligatoire pour que ça fonctionne...
    reset({ ...defaultValues });
  }, [user]);

  const onSubmit = (data) => {
    //console.log(data)
  
    updateProfil(data)
    .then((res) => {
      //console.log("wwwwwstatus", res.status)
      //console.log("XXXXXXXXXXXXXXXstatus", res.data.msg)
      if(res.status !== 200){
        setMessage("Erreur pendant la modification")
      }else {
          setMessage(res.data.msg)
          console.log(res.data.msg)
          window.setTimeout(()=>{
            //redispacher dans le store redux
            dispatch(setUser(data))
            setRedirect(true);
          }, 1000)
      }
    })
    .catch((err) => {
      //console.log("wwwwwmessage", err)
      setError("Echec modification");
    });
  }
    


  return (
    <div  className="profile">
      <div className="left">
        <img className="avatar" src={`https://www.vinsnaturels.fr/999_membres/img/faces/${user.infos.logo || "face-0.jpg"}`} alt={user.infos.nom} />

      </div>
      <div className="right">

      <form className="zzz" onSubmit={handleSubmit(onSubmit)} >

          <div className="InputAddOn">
            <span className="InputAddOn-item">Prénom</span>
            <input className="InputAddOn-field" type="text" 
              name="prenom" 
              defaultValue={user.infos.prenom}
              {...register("prenom", { required: true })}
            />
          </div>
          {errors.prenom && <p className="error_msg">Prénom obligatoire</p>}

           
          <div className="InputAddOn">
            <span className="InputAddOn-item">Nom</span>
            <input className="InputAddOn-field" type="text" 
              ref={register} 
              {...register("nom", { required: true })}
            />
          </div>

          <div className="InputAddOn">
            <span className="InputAddOn-item">Mail</span>
            <input className="InputAddOn-field" type="text" 
              name="mail" 
              defaultValue={user.infos.mail}
              {...register("mail", {required: true, pattern: /^\S+@\S+$/i})} 
            />
          </div>
          {errors.mail && <p className="error_msg">Merci de rentrer un mail valide</p>}

          <div className="InputAddOn">
            <span className="InputAddOn-item">Je suis</span>
            <select 
              className="InputAddOn-field" 
              defaultValue={user.infos.profession}
              {...register("profession", { required: true })}
            >
                <option value="1" disabled="" selected=""></option>
                <option value="vigneron"> Un vigneron </option>
                <option value="caviste"> Un caviste </option>
                <option value="restaurant"> Un restaurateur </option>
                <option value="revendeur"> Un revendeur </option>
                <option value="amateur"> Juste un amateur de vin naturel ! </option>
            </select>
          </div>

          <div className="InputAddOn">
            <span className="InputAddOn-item">
              {user.infos.profession === "vigneron" ? ( "Mon domaine" ) : "Mon entreprise" }
            </span>
            <input className="InputAddOn-field" type="text" 
              name="entreprise" 
              defaultValue={user.infos.entreprise}
              {...register("entreprise")}
            />
          </div>

          <div className="InputAddOn">
            <span className="InputAddOn-item">Ville</span>
            <input className="InputAddOn-field" type="text" 
              name="ville" 
              defaultValue={user.infos.ville}
              {...register("ville")}
            />
          </div>

          <div className="InputAddOn">
            <span className="InputAddOn-item">Pays</span>
            <input className="InputAddOn-field" type="text" 
              name="pays" 
              defaultValue={user.infos.pays}
              {...register("pays")}
            />
          </div>

          <div className="InputAddOn">
            <label> A propos de moi : </label>
            <textarea 
              rows="5" 
              className="InputAddOn-field" 
              name="description" 
              placeholder=" A propos de moi " 
              defaultValue={user.infos.description}
              {...register("description")}
            >
            </textarea>
          </div>

              <input
                className="button-form green_btn w100"
                type="submit"
                value="Mettre à jour mon profil"
              />
            </form>

      {message && (<p className="ok_msg">{message}</p>) }
      </div>
    </div>
  );
};

export default Profile;