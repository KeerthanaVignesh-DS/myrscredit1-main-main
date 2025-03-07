import GuestLayout from "@/Layouts/GuestLayout";
import InnerMenu from "@/Components/InnerMenu";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


export default function DemandLetterSubmission() {

  const user = usePage().props.auth.user;
  const [countryValues,setCountryValues] = useState([
    { label: "USA", value:  1},
    { label: "CANADA", value: 2 },
    { label: "Other", value: 3 },
  ]);
  const [accCountryValues,setAccCountryValues] = useState([
    { label: "USA", value:  1},
    { label: "CANADA", value: 2 },
  ]);
  const [country,setCountry] = useState(user.country);
  const [accountCountry,setAccountCountry] = useState(1);
  const [otherCountry,setOtherCountry] = useState();
  const [state,setState] = useState(user.state);
  const [accountState,setAccountState] = useState(0);
  const [stateValues,setStateValues] = useState([
    { label : "Select State", value : 0},
    { label : "Alabama AL", value : 1},
    { label : "Alaska AK", value : 2},
    { label : "Arizona AZ", value : 3},
    { label : "Arkansas AR", value : 4},
    { label : "California CA", value : 5},
    { label : "Colorado CO", value : 6},
    { label : "Connecticut CT", value : 7},
    { label : "District of Columbia DC", value : 8},
    { label : "Delaware DE", value : 9},
    { label : "Florida FL", value : 10},
    { label : "Georgia GA", value : 11},
    { label : "Hawaii HI", value : 12},
    { label : "Idaho ID", value : 13},
    { label : "Illinois IL", value : 14},
    { label : "Indiana IN", value : 15},
    { label : "Iowa IA", value : 16},
    { label : "Kansas KS", value : 17},
    { label : "Kentucky KY", value : 18},
    { label : "Louisiana LA", value : 19},
    { label : "Maine ME", value : 20},
    { label : "Maryland MD", value : 21},
    { label : "Massachusetts MA", value : 22},
    { label : "Michigan MI", value : 23},
    { label : "Minnesota MN", value : 24},
    { label : "Mississippi MS", value : 25},
    { label : "Missouri MO", value : 26},
    { label : "Montana MT", value : 27},
    { label : "Nebraska NE", value : 28},
    { label : "Nevada NV", value : 29},
    { label : "New Hampshire NH", value : 30},
    { label : "New Jersey NJ", value : 31},
    { label : "New Mexico NM", value : 32},
    { label : "New York NY", value : 33},
    { label : "North Carolina NC", value : 34},
    { label : "North Dakota ND", value : 35},
    { label : "Ohio OH", value : 36},
    { label : "Oklahoma OK", value : 37},
    { label : "Oregon OR", value : 38},
    { label : "Pennsylvania PA", value : 39},
    { label : "Puerto Rico PR", value : 40},
    { label : "Rhode Island RI", value : 41},
    { label : "South Carolina SC", value : 42},
    { label : "South Dakota SD", value : 43},
    { label : "Tennessee TN", value : 44},
    { label : "Texas TX", value : 45},
    { label : "Utah UT", value : 46},
    { label : "Vermont VT", value : 47},
    { label : "Virginia VA", value : 48},
    { label : "Virgin Islands  VI", value : 49},
    { label : "Washington WA", value : 50},
    { label : "Wisconsin WI", value : 51},
    { label : "West Virginia WV", value : 52},
    { label : "Wyoming WY", value : 53},
    { label : "Alberta AB", value : 54},
    { label : "British Columbia BC", value : 55},
    { label : "Manitoba MB", value : 56},
    { label : "New Brunswick NB", value : 57},
    { label : "Newfoundland and Labrador NL", value : 58},
    { label : "Nova Scotia NS", value : 59},
    { label : "Northwest Territories NT", value : 60},
    { label : "Nunavut NU", value : 51},
    { label : "Ontario ON", value : 52},
    { label : "Prince Edward Island PE", value : 53},
    { label : "Quebec QC", value : 54},
    { label : "Saskatchewan SK", value : 55},
    { label : "Yukon YU", value : 56},
  ]);
  const [copy,setCopy] = useState(null);


  const initialValues = {
    id              :  user.id,
    name            :  user.name,
    title           :  user.title,
    company         :  user.company,
    address1        :  user.address1,
    address2        :  user.address2,
    city            :  user.city, 
    state           :  user.state,
    zip             :  user.zip,
    country         :  user.country,
    apemail         :  user.ap_email,
    submissionemail :  user.email,
    phone           :  user.phone,
    fax             :  user.fax,
    account_name    :  "",
    account_address1:  "",
    account_address2:  "",
    account_city    :  "",
    account_state   :  accountState,
    account_zip     :  "",
    account_country :  accountCountry,
    account_phone   :  "",
    balanceDue      :  "",
    }


    const schema = Yup.object().shape({
      name      : Yup.string().required("Enter name"),
      title     : Yup.string(),
      company   : Yup.string().required("Enter valid Company Name"),
      address1  : Yup.string().required("Enter Address1 for Company"),
      address2  : Yup.string(),
      city      : Yup.string().required("Enter City for Company"),
      state     : Yup.number().min(1,"Select State/Province for Company").required("Select State/Province for Company"),
      zip       : Yup.string().required("Enter Zip for Company"),
      apemail   : Yup.string().required("Enter A/P email address").email("Enter valid email address"),
      submissionemail : Yup.string().required("Enter Submission email address").email("Enter valid email address"),
      phone     : Yup.string().required("Enter Phone number for Company"),
      fax       : Yup.string(),
      account_name      : Yup.string().required("Enter Account Name"),
      account_address1  : Yup.string().required("Enter Address1 for Account"),
      account_address2  : Yup.string(),
      account_city      : Yup.string().required("Enter City for Account"),
      account_state     : Yup.number().min(1,"Select State/Province for Account").required("Select State/Province for Account"),
      account_zip       : Yup.string().required("Enter Zip for Account"),
      account_phone     : Yup.string().required("Enter Phone for Account"),
      balanceDue        : Yup.number().min(1,"Enter Balance Due").max(10,"Enter Balance Due").required("Enter Order Amount"),
    });


    const { register,post, handleSubmit, reset, formState: {errors,isValid},getValues,setError,setValue } = useForm({
      defaultValues: { ...initialValues },
      resolver: yupResolver(schema),
      mode: "all",
    });


    const resetForm = () => {
      resetAll();
    }

    const resetAll = () => {
      reset((form) => ({
        ...form,
        ...initialValues,
      }));  
    }


    const countryChange=(e)=>{
      setCountry(e);
      if(e === "3"){
        setOtherCountry(true);
      }else{
        setOtherCountry(false);
      }  
    }


    const accCountryChange=(e)=>{
      setAccountCountry(e);
      setValue('account_country',e);
    }
  
    const stateChange=(e)=>{
      setState(e);
      setError('state',"");
      setValue('state',e);
    }
  
    const accStateChange=(e)=>{
      setAccountState(e);
      setError('account_state',"");
      setValue('account_state',e);
    }
  
    const otherCountryClose = () => {
      setOtherCountry(false);
      setState(user.state);
      setCountry(user.country);
    }
  

    const addDemandLetterSubmission = async(data)=>{
      console.log(data,"data");
  
      let obj = {
      id              :  user.id,
      name            :  data.name,
      title           :  data.title,
      company         :  data.company,
      address1        :  data.address1,
      address2        :  data.address2,
      city            :  data.city, 
      state           :  state,
      zip             :  data.zip,
      country         :  country,
      apemail         :  data.ap_email,
      submissionemail :  data.email,
      phone           :  data.phone,
      fax             :  data.fax,
      account_name    :  data.account_name,
      account_address1:  data.account_address1,
      account_address2:  data.account_address2,
      account_city    :  data.account_city,
      account_state   :  accountState,
      account_zip     :  data.account_zip,
      account_country :  accountCountry,
      account_phone   :  data.account_phone,
      balanceDue      :  data.balanceDue,
      }
  
      console.log(obj,"obj")
  
    }



    return(
        <GuestLayout>
        <div className="container py-5">
          <h2 className="primary-text-color text-center mb-2">
              Demand Letter Submission Form
          </h2>
          <h5 className="text-center mb-2">DEBTOR "COURSE OF ACTION" COMMUNICATION</h5>
          <p className="primary-text-color text-center mb-3">Please furnish the following information.</p>
          <p class="text-center text-danger mb-5"><sup>*</sup>Required Field</p>
          
          <form className="row px-xl-5 justify-content-center">
            <div className="col-12 col-md-6 col-xl-5">
              <div className="bg-light p-4">
                <h3 className="primary-text-color mb-3">Client Information:</h3>
                
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-name" className="form-label">
                    Name <sup className="text-danger">*</sup>
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder=""
                      autoComplete="off"
                      {...register("name")}
                    />    
                </div>
                {errors.name && <p className="text-danger mx-1">{errors.name.message}</p>}


                <div className="col-md-12 mb-2">
                  <label htmlFor="input-title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder=""
                    autoComplete="off"
                    {...register("title")}
                  />
                </div>

                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Company" className="form-label">
                    Company<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder=""
                    autoComplete="off"
                    {...register("company")}
                  />
                </div>
                {errors.company && <p className="text-danger mx-1">{errors.company.message}</p>}


                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Address1" className="form-label">
                    Address1<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    name="address1"
                    placeholder=""
                    autoComplete="off"
                    {...register("address1")}
                  />
                </div>
                {errors.address1 && <p className="text-danger mx-1">{errors.address1.message}</p>}

                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Address2" className="form-label">
                    Address2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address"
                    placeholder=""
                    autoComplete="off"
                    {...register("address2")}
                  />
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="input-City" className="form-label">
                      City<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      placeholder=""
                      autoComplete="off"
                      {...register("city")}
                    />
                    {errors.city && <p className="text-danger mx-1">{errors.city.message}</p>}
                  </div>

                  <div className="col-lg-6 mb-2">
                    <label htmlFor="inputState" className="form-label">
                      State/Province
                    </label>
                    {(!otherCountry || otherCountry=== "") && 
                      <select 
                      className="form-select form-control" 
                      id="state"
                      name="state"
                      value={state}        
                      onChange={(e) => { stateChange(e.target.value) }}>
                        {stateValues.map((item,index) => (
                        <option key={index} value={item.value}>
                        {item.label}
                        </option>
                      ))}
                    </select>
                    }
                    
                    {otherCountry && 
                    <>
                      <span>
                       <input
                        className=" w-75" 
                        type="text"/>
                        <button className="text-danger mx-2" onClick={otherCountryClose}>X</button>
                      </span>
                    </>                       
                    } 
                    {errors.state && <p className="text-danger mx-1">{errors.state.message}</p>}
                  </div>

                  <div className="col-lg-6 mb-2">
                    <label htmlFor="input-Zip" className="form-label">
                      Zip<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      placeholder=""
                      autoComplete="off"
                      {...register("zip")}
                    />
                    {errors.zip && <p className="text-danger mx-1">{errors.zip.message}</p>}
                  </div>

                  <div className="col-lg-6 mb-2">
                    <label htmlFor="inputState" className="form-label">
                      Country
                      {/* <sup className="text-danger">*</sup> */}
                    </label>
                    {(!otherCountry || otherCountry=== "") && 
                      <select 
                        className="form-select form-control" 
                        id="country"
                        name="country"
                        value={country}        
                        onChange={(e) => { countryChange(e.target.value) }}>
                          {countryValues.map((item,index) => (
                          <option key={index} value={item.value}>
                          {item.label}
                          </option>
                        ))}
                      </select>
                    }
                    {otherCountry && 
                    <>
                      <span>
                       <input
                        className=" w-75" 
                        type="text"/>
                        <button className="text-danger mx-2" onClick={otherCountryClose}>X</button>
                      </span>
                    </>   
                    }
                   </div>
                  </div>

                <div className="col-md-12 mb-2">
                  <label htmlFor="ap-Email" className="form-label">
                    {" "}
                    A/P Email<sup className="text-danger">*</sup>
                  </label>
                  <input 
                      type="email" 
                      className="form-control" 
                      id="ap-Email" 
                      name="apemail"
                      placeholder=""
                      autoComplete="off"
                      {...register("apemail")}
                  />
                </div>
                {errors.apemail && <p className="text-danger mx-1">{errors.apemail.message}</p>}

                <div className="col-md-12 mb-2">
                  <label htmlFor="Submission-Email" className="form-label">
                    Submission Email<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Submission-Email"
                    name="submissionemail"
                    placeholder=""
                    autoComplete="off"
                    {...register("submissionemail")}
                  />
                </div>
                {errors.submissionemail && <p className="text-danger mx-1">{errors.submissionemail.message}</p>}

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
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="input-Phone" className="form-label">
                      Phone<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-Phone"
                      name="phone"
                      placeholder=""
                      autoComplete="off"
                      {...register("phone")}
                    />                  
                  {errors.phone && <p className="text-danger mx-1">{errors.phone.message}</p>}
                  </div>

                   <div className="col-lg-6 mb-2">
                    <label htmlFor="input-Fax" className="form-label">
                      Fax
                      {/* <sup className="text-danger">*</sup> */}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-Fax"
                      name="fax"
                      placeholder=""
                      autoComplete="off"
                      {...register("fax")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-5">
              <div className="bg-light p-4">
                <h3 className="primary-text-color mb-3">
                  Account Submission Information:
                </h3>
                <div className="col-md-12 mb-2">
                  <label htmlFor="input-accountNumber" className="form-label">
                    Account Name <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="account_name"
                    name="account_name"
                    placeholder=""
                    autoComplete="off"
                    {...register("account_name")}
                  />
                </div>
                {errors.account_name && <p className="text-danger mx-1">{errors.account_name.message}</p>}

                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Address1-sub" className="form-label">
                    Address1<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="account_address1"
                    name="account_address1"
                    placeholder=""
                    autoComplete="off"
                    {...register("account_address1")}
                  />
                </div>
                {errors.account_address1 && <p className="text-danger mx-1">{errors.account_address1.message}</p>}

                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Address2-sub" className="form-label">
                    Address2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="account_address2"
                    name="account_address2"
                    placeholder=""
                    autoComplete="off"
                    {...register("account_address2")}
                  />
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label htmlFor="input-City-sub" className="form-label">
                      City<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="account_city"
                      name="account_city"
                      placeholder=""
                      autoComplete="off"
                      {...register("account_city")}
                    />
                 {errors.account_city && <p className="text-danger mx-1">{errors.account_city.message}</p>}
                </div>

                  <div className="col-lg-6 mb-2">
                    <label htmlFor="inputState-sub" className="form-label">
                      State/Province<sup className="text-danger">*</sup>
                    </label>
                    <select 
                      className="form-select form-control" 
                      id="account_state"
                      name="account_state"
                      value={accountState}        
                      onChange={(e) => { accStateChange(e.target.value) }}>
                        {stateValues.map((item,index) => (
                        <option key={index} value={item.value}>
                        {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-lg-6 mb-2">
                    <label htmlFor="input-Zip-sub" className="form-label">
                      Zip<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="account_zip"
                      name="account_zip"
                      placeholder=""
                      autoComplete="off"
                      {...register("account_zip")}
                    />
                    {errors.account_zip && <p className="text-danger mx-1">{errors.account_zip.message}</p>}
                  </div>

                   <div className="col-lg-6 mb-2">
                    <label htmlFor="inputState-sub" className="form-label">
                      Country<sup className="text-danger">*</sup>
                    </label>
                    <select 
                        className="form-select form-control" 
                        id="account_country"
                        name="account_country"
                        value={accountCountry}        
                        onChange={(e) => { accCountryChange(e.target.value) }}>
                          {accCountryValues.map((item,index) => (
                          <option key={index} value={item.value}>
                          {item.label}
                          </option>
                        ))}
                      </select>
                  </div>

                  <div className="col-md-12 mb-2">
                    <label htmlFor="input-Phone-sub" className="form-label">
                      Phone<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="account_phone"
                      name="account_phone"
                      placeholder=""
                      autoComplete="off"
                      {...register("account_phone")}
                    />                  
                  {errors.account_phone && <p className="text-danger mx-1">{errors.account_phone.message}</p>}
                  </div>
                
                </div>
    
                  <div className="col-md-12 mb-2">
                    <label htmlFor="order-amount-sub" className="form-label">
                      Balance Due$<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="balanceDue"
                      name="balanceDue"
                      autoComplete="off"
                      placeholder=""
                      {...register("balanceDue")}
                    />
                  </div>
                  {errors.balanceDue && <p className="text-danger mx-1">{errors.balanceDue.message}</p>}
                 
                  <div className="d-flex justify-content-end align-items-center mt-3">
                     <button className="btn btn-primary btn-sm">Add More Submissions</button>
                  </div>
                  
              </div>
            </div>

            {console.log(errors)}

            <div className="d-flex justify-content-center align-items-center pt-5">
                 <button 
                    type="submit" 
                    className="btn btn-primary"
                    name="saveinfo"
                    onClick={handleSubmit(addDemandLetterSubmission)}
                  >
                    Submit Request
                  </button>
            </div>
          </form>
        </div>
        </GuestLayout>
    )
}
