import GuestLayout from '@/Layouts/GuestLayout';
import { Link, router } from '@inertiajs/react';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Inertia } from '@inertiajs/inertia';


export default function Login (props) {

    const initialValues={
      username  : "",
      password  : "",
    }

    const schema = Yup.object().shape({
      username  : Yup.string().required("Please enter username"),
      password  : Yup.string().required("Please enter password"),
    });

    const { register, handleSubmit, reset, formState: {errors,isValid},getValues,setError,setValue } = useForm({
      defaultValues: { ...initialValues },
      resolver: yupResolver(schema),
      mode: "all",
    });


    const loginUser = async(data) =>{

        let obj = {
          username : data.username,
          password : data.password,
          user     : 'client'
        }
       router.post('/login', obj);  
    }
    

    return(
        <>
      <GuestLayout>
      <div className="login">
    
        <div className="container py-5">
          <h2 className="primary-text-color text-center mb-5">
          Client Login
          </h2>
          <form className="row px-5 justify-content-center flex-column-reverse flex-lg-row">
           <div className="col-12 col-lg-6 col-xl-5 bg-lightgray">
              <div className="p-4 p-md-5">
                <h3 className="primary-text-color mb-3">New Client Registration</h3>
                <p>Please complete registration. Thank you.</p>
                <Link href="/register"  className="btn btn-primary text-uppercase">Register</Link>
              </div>
           </div>
           <div className="col-12 col-lg-6 col-xl-5 bg-lightgray">
              <div className="p-4 p-md-5">
                <h3 className="primary-text-color mb-3">Existing Client Login </h3>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Username" className="form-label">
                     Username <sup className="text-danger">*</sup>
                  </label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="input-Username" 
                  name="username"
                  // onChange={(e) => setUsername(e.target.value)}
                  autoComplete="on"
                  placeholder=''
                  {...register("username")}
                  />
                 {errors.username && <p className="text-danger mx-2">{errors.username.message}</p>}
                </div>

                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Password" className="form-label">
                     Password <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="input-Password"
                    name="password"
                    autoComplete='on'
                    placeholder=''
                    {...register("password")}
                  />
                 {errors.password && <p className="text-danger mx-2">{errors.password.message}</p>}
                </div>
                
                {props?.errors?.username && <p className='text-danger  my-2'>{props.errors.username}</p>}
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <button 
                        type="submit" 
                        className="btn btn-primary text-uppercase"
                        name="saveinfo"
                        onClick={handleSubmit(loginUser)}
                    >
                        Sign In
                    </button>
               </div>

               <div className="d-flex justify-content-center align-items-center flex-column flex-xl-row gap-3 mt-3 forgot">
                  <Link href="/forgot-password">Forgot Your Password?</Link> 
                  <Link href="/forgot-username">Forgot Your Username?</Link> 
               </div>
              </div>
            </div>
            
          
          </form>
        </div>
      </div>
      </GuestLayout>
        </>
    )
}