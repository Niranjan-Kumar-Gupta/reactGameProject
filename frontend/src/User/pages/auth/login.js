import React from 'react'
import { useState, useRef, useEffect } from "react";
import "./style.css";
import { useForm, Controller } from "react-hook-form";
import { Card } from 'primereact/card';
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import authSlice, { signup,login } from '../../../reducer/auth.slice';

const Login = () => {

  const toast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isLogedIn} = useSelector(state => state.auth);

  // useEffect(()=>{
  //   if (isLogedIn) {
  //     navigate("/gameIntro");
  //   }
  // },[isLogedIn])

  const defaultValues = {
    email: "",
    password: "",
    
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });



  const onSubmit = (data) => {
    console.log(data)
    const __data = {
      email:data.email,
      password:data.password
    }
  
       dispatch(login( __data))
        .unwrap()
        .then((res) => {
          console.log(res)     
          navigate("/gameIntro");
        })
        .catch((err) => {
          console.log(err)
          toast.current.show({
            severity: "error",
            detail: err.message,
            life: 3000,
          });
        });
    
   
    }

  return (
    <div className='flex justify-content-center align-items-center mt-5'>
          <Toast ref={toast} />
         <Card className='w-5 mt-5'>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="field flex flex-column justify-content-center p-3">
                <label htmlFor="userName">Email</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true && "Please enter email.",
                    validate: (value) =>
                      value.trim().length > 0 || "email is required",
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      placeholder="Enter Email"
                      {...field}
                     
                    />
                  )}
                />
              </div>
              <div className="field flex flex-column justify-content-center p-3">
                <label htmlFor="userName">Password</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true && "Please enter password.",
                    validate: (value) =>
                      value.trim().length > 0 || "password is required",
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      placeholder="Enter password"
                      {...field}
                     
                    />
                  )}
                />
              </div>
                   
              <div className='p-3'>
               <Button  label="Login" className='w-full' severity="success" />   
              
            </div>
             
            </form>
               <div className='w-full flex justify-content-center gap-3 p-3'>
                 <Button  label="SignUp" type='submit' className='w-full' severity="info" />
               </div> 
         </Card> 
    </div>
  )
}

export default Login
