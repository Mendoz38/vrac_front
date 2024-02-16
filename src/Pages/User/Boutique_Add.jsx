import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Slices/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { config } from "../../config";
import Toggle from "../../Components/form/Toogle";
import Input from "../../Components/form/Input";
import "../styles/form.css";

import { addBoutique } from "../../api/boutique";

const Boutique_Add = (props) => {
  const user = useSelector(selectUser);
  const [message, setMessage] = useState("");
  


  /* ------------------- LOAD defaultValue fields --------------------------*/
  useEffect(() => {
    let defaultValues = {};
    defaultValues.entreprise = user.infos.entreprise;
    // obligatoire pour que ça fonctionne...
    reset({ ...defaultValues });
  }, [user]);

  /* ------------------- OnSubmit form --------------------------*/
  const onSubmit = async (data) => {
    console.log("Data :", data);
    addBoutique(data)
      .then((res) => {
        if (res.status !== 200) {
          setMessage("Erreur lors de la création");
        } else {
          setMessage(res.msg);
        }
      })
      .catch((err) => {
        return err;
      });
  };

  /* ------------------- Liste des champs de formulaire --------------------------*/
  const formFields = [
    {
      name: "epicerie",
      label: "Epicerie",
      type: "text",
      placeholder: "Nom du magasin",
      validation: yup.string().required("Nom du magasin obligatoire"),
      required: true,
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { value: "Epicerie", label: "Epicerie" },
        { value: "Supermarché", label: "Supermarché" },
        { value: "xxx", label: "???" },
      ],
      validation: yup.string().required("Veuillez sélectionner un type de magasin"),
    },
    {
      name: "adresse",
      label: "Adresse",
      type: "text",
      placeholder: "Adresse du magasin",
      required: true,
    },
    {
      name: "telephone",
      label: "Téléphone",
      type: "text",
      placeholder: "Téléphone du magasin",
      required: true,
    },
    {
      name: "mail",
      label: "E-mail",
      type: "text",
      placeholder: "Adresse e-mail l'épicerie",
      validation: yup.string().required("Veuillez renseigner l'e-mail du magasin"),
    },
    {
      name: "option_1",
      label: "Option 1",
      type: "checkbox",
    },
  ];

  /* ------------------- YUP --------------------------*/
    const yupSchema = yup.object().shape(
      formFields.reduce((acc, field) => {
        if (field.validation) {
          acc[field.name] = field.validation;
        }
        return acc;
      }, {})
    );
    
  /* ------------------- REACT HOOK FORM --------------------------*/
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  return (
    <div className="">
      <h1 className="centre">Ajouter une boutique</h1>

      <form className="form_container rhf" onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field) => (
            field.type === "checkbox" ? (
              <Toggle
                key={field.name}
                label={field.label}
                name={field.name}
                register={register}
              />
            ) : (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                className="InputAddOn-field"
                register={register}
                errors={errors}
                placeHolder={field.placeholder || ""}
                options={field.options || []}
                required={!!field.validation} // Détermine si le champ est requis
              />
            )
          ))}

        {/* ---------------- button submit ----------------- */}
        <button type="submit" className="green_btn f100">
          Enregistrer
        </button>
      </form>

      {message && <p className="ok_msg">{message}</p>}
    </div>
  );
};

export default Boutique_Add;
