// import { InnerMenu } from "../../Components/innerMenu";
import { NavLink } from "react-router-dom"
export const ForgotPassword = () =>{
    return(
        <>
         
            <div className="container py-5">
              <h2 className="primary-text-color text-center mb-2">
                 Forgot Password
              </h2>
            
              <form className="row px-2 px-md-5 justify-content-center mt-5">
                <div className="col-12 col-md-6 col-xl-5">
                  <div className="bg-light p-4">
                   
                    <div className="col-md-12 mb-2">
                      <label htmlFor="input-Email" className="form-label">
                        Your Email-ID: <sup className="text-danger">*</sup>
                      </label>
                      <input type="text" className="form-control" id="input-Email" />
                    </div>
                  
                    <div className="col-md-12 mb-2">
                        <label htmlFor="SecurityQuestion" className="form-label">
                           Security Question
                        </label>
                        <select id="SecurityQuestion" className="form-select">
                          <option>Choose Your Security Question</option>
                          <option>What is your favorite color?</option>
                          <option>What is your favorite holiday?</option>
                        </select>
                      </div>
                      
                      <div className="col-md-12 mb-2">
                      <label htmlFor="input-security-answer" className="form-label">
                         Security Answer
                      </label>
                      <input type="text" className="form-control" id="input-security-answer" />
                     </div>
    
                    
                  
                  </div>
                </div>
                
                <div className="d-flex justify-content-center align-items-center gap-2 pt-5">
                     <button type="submit" className="btn btn-primary text-uppercase">Submit</button>
                     <NavLink to="/login" className="btn btn-primary text-uppercase">Cancel</NavLink>
                </div>
              </form>
            </div>
          
        </>
    )
}