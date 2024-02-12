// MyForm.js
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReusableInput from './input';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const MyForm = () => {

  /* ------------------- YUP --------------------------*/
  const schema = yup
    .object({
     // cuvee: yup.string().required("Nom de la cuvée obligatoire"),
    })
    .required();

  /* ------------------- REACT HOOK FORM --------------------------*/
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
        /* ------------------- OnSubmit form --------------------------*/
        const onSubmit = (data) => {
            console.log("Data :", data);
          };
        
  return (
      <form  onSubmit={handleSubmit(onSubmit)}>
        <ReusableInput name="firstName" label="First Name" type="text" />
        <ReusableInput name="lastName" label="Last Name" type="text" />
        <ReusableInput name="email" label="Email" type="email" />

        <button type="submit">Submit</button>
      </form>
  );
};

export default MyForm;
