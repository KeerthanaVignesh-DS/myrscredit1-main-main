// import { NavLink } from "react-router-dom";
import GuestLayout from '@/Layouts/GuestLayout';
import { Link } from '@inertiajs/react';

export default function Login () {
    return(
        <>
      <GuestLayout>
      <div className="login">
    
        <div className="container py-5">
          <h2 className="primary-text-color text-center mb-5">
          Client Login
          </h2>
          <form className="row px-5 justify-content-center flex-column-reverse flex-lg-row">
           <div className="col-12 col-lg-6 col-xl-5 bg-light">
              <div className="p-4 p-md-5">
                <h3 className="primary-text-color mb-3">New Client Registration</h3>
                <p>Please complete registration. Thank you.</p>
                <Link href="/registration-client"  
                // type="submit"
                 className="btn btn-primary text-uppercase">Register</Link>
              </div>
           </div>
           <div className="col-12 col-lg-6 col-xl-5 bg-light">
              <div className="p-4 p-md-5">
                <h3 className="primary-text-color mb-3">Existing Client Login </h3>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Username" className="form-label">
                     Username <sup className="text-danger">*</sup>
                  </label>
                  <input type="text" className="form-control" id="input-Username" />
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Password" className="form-label">
                     Password <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="input-Password"
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <button type="submit" className="btn btn-primary text-uppercase">Sign In</button>
               </div>
               <div className="d-flex justify-content-center align-items-center flex-column flex-xl-row gap-3 mt-3 forgot">
                  <Link href="/forgot-password">Forgot Your Password?</Link> 
                  <Link href="/">Forgot Your Username?</Link> 
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