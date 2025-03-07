import InnerMenu from "@/Components/InnerMenu";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from '@inertiajs/react';



export default function BillingLogin(){


    return(
      <GuestLayout>
          <div className="mainWrapper">
            <div className="container py-5">
              <h2 className="primary-text-color text-center mb-2">
                 Enter Billing Password 
              </h2>
            
              <form className="row px-5 justify-content-center mt-5">
                <div className="col-12 col-lg-6 col-xl-5">
                  <div className="bg-light p-4">
                   
                    <div className="col-md-12 mb-2">
                      <label htmlFor="input-Password" className="form-label">
                        Enter Password:<sup className="text-danger">*</sup>
                      </label>
                      <input type="password" className="form-control" id="input-Password" />
                    </div>
                  
                  
                  </div>
                </div>
                
                <div className="d-flex justify-content-center align-items-center gap-2 pt-5">
                     <button type="submit" className="btn btn-primary text-uppercase">Submit</button>
                     <Link to="/login" className="btn btn-primary text-uppercase">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </GuestLayout>
    )
}