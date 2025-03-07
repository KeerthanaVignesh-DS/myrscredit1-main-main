// import { NavLink } from "react-router-dom";
import GuestLayout from "@/Layouts/GuestLayout";
// import { InnerMenu } from "../../Components/innerMenu";


export default function Registration (){
  return (
    <>
    <GuestLayout>
      <div className="mainWrapper">
     
        <div className="container py-5">
          <h2 className="primary-text-color text-center mb-2">
          Client Registration
          </h2>
          <p className="text-center">Completing this form will create a Billing Account. Only one Billing Account is needed per Client. <br/>Multiple Users can login at the same time using the same user id and password.</p>
          <p className="text-center text-danger"><sup>*</sup>Required Field</p>
          <form className="row px-5 justify-content-center mt-5">
            <div className="col-5">
              <div className="bg-light p-4">
                <h3 className="primary-text-color mb-3">Client Information:</h3>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-name" className="form-label">
                    Name <sup className="text-danger">*</sup>
                  </label>
                  <input type="text" className="form-control" id="input-name" />
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-title"
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Company" className="form-label">
                    Company<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-Company"
                  />
                </div>

                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Address1" className="form-label">
                    Address1<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-Address1"
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Address2" className="form-label">
                    Address2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-Address2"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label htmlFor="input-City" className="form-label">
                      City<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-City"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      State/Province
                    </label>
                    <select id="inputState" className="form-select">
                      <option>Select</option>
                      <option>Alabama AL</option>
                      <option>District of Columbia DC</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-2">
                    <label htmlFor="input-Zip" className="form-label">
                      Zip<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-Zip"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      Country<sup className="text-danger">*</sup>
                    </label>
                    <select id="inputState" className="form-select">
                      <option>Select</option>
                      <option>USA</option>
                      <option>CANADA</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-12 mb-2">
                  <label htmlFor="ap-Email" className="form-label">
                    {" "}
                    A/P Email<sup className="text-danger">*</sup>
                  </label>
                  <input type="email" className="form-control" id="ap-Email" />
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="Submission-Email" className="form-label">
                    Submission Email<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Submission-Email"
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <div className="d-flex gap-2 align-items-center">
                    <label htmlFor="copy" className="form-label">
                      Copy
                    </label>
                    <div className="form-check">
                       <label className="form-check-label" htmlFor="flexRadioDefault1">
                       Yes
                      </label>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    </div>
                    <div className="form-check">
                     <label className="form-check-label" htmlFor="flexRadioDefault2">
                       No
                      </label>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                    </div>
                  </div>
                  <p><small>Check the box "Yes", if you want copies of your submissions. Copies will be sent via submission email.</small></p>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label htmlFor="input-Phone" className="form-label">
                      Phone<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="input-Phone"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label htmlFor="input-Fax" className="form-label">
                      Fax<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="input-Fax"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="bg-light p-4">
                <h3 className="primary-text-color mb-3">
                    Login information:
                </h3>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-username" className="form-label">
                    User Name <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-username"
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Password" className="form-label">
                    Password<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-Password"
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Confirm-Password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-Confirm-Password"
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Verification-Code" className="form-label">
                    Verification Code:<sup className="text-danger">*</sup>
                  </label>
                  <div className="d-flex align-items-center gap-2">
                    <div>
                       <h5>IKSM</h5>
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control"
                        id="input-Verification-Code"
                      />
                      </div>
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                    <label htmlFor="Security-Question" className="form-label">
                       Security Question<sup className="text-danger">*</sup>
                    </label>
                    <select id="Security-Question" className="form-select">
                  
                        <option selected="selected" value="0">Choose Your Security Question</option>
                        <option value="What is name of your favorite pet?">What is name of your favorite pet?</option>
                        <option value="What is your favorite color?">What is your favorite color?</option>
                        <option value="What is your favorite holiday">What is your favorite holiday?</option>
                        <option value="What is your favorite region of USA">What is your favorite region of USA?</option>

                    </select>
                  </div>
                  <div className="col-md-12 mb-2">
                  <label htmlFor="input-Security-Answer" className="form-label">
                    Security Answer<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-Security-Answer"
                  />
                </div>
             
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center pt-5">
                 <button type="submit" className="btn btn-primary">Submit Registration</button>
            </div>
          </form>
        </div>
      </div>
      </GuestLayout>
    </>
  );
};
