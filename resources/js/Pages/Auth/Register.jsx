import GuestLayout from "@/Layouts/GuestLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "@inertiajs/react";


export default function Registration (props){
  
  const [country, setCountry] = useState(() => {
    if (props.edit === 0) {
      return (props.editUser?.country !== 'USA' && props.editUser?.country !== 'CANADA') 
        ? props.editUser?.country 
        : props.editUser?.country || "USA";
    }
    return "USA";
  });
  const created = props.edit === 0 ? new Date(props.editUser.created_at).getMonth()+1+'/'+new Date(props.editUser.created_at).getDate()+'/'+new Date(props.editUser.created_at).getUTCFullYear() : ""
  const [countryValues,setCountryValues] = useState([
    { label: "USA", value:  "USA"},
    { label: "CANADA", value: "CANADA"},
    { label: "Other", value: "Other" },
  ]);

  const [captchaValue,setCaptchaValue] = useState("");
  const [captchaError,setCaptchaError] = useState();
  const [otherCountry,setOtherCountry] = useState((props.edit === 0 && (props.editUser.country !== 'USA' && props.editUser.country !== 'CANADA')) ? true : false );
  const [state,setState] = useState(props.edit === 0 ? props.editUser.state : "");

  const [stateValues,setStateValues] = useState([
    { label : "Select State", value : ""},
    { label : "Alabama AL", value : "AL"},
    { label : "Alaska AK", value : "AK"},
    { label : "Arizona AZ", value : "AZ"},
    { label : "Arkansas AR", value : "AR"},
    { label : "California CA", value : "CA"},
    { label : "Colorado CO", value : "CO"},
    { label : "Connecticut CT", value : "CT"},
    { label : "District of Columbia DC", value : "DC"},
    { label : "Delaware DE", value : "DE"},
    { label : "Florida FL", value : "FL"},
    { label : "Georgia GA", value : "GA"},
    { label : "Hawaii HI", value : "HI"},
    { label : "Idaho ID", value : "ID"},
    { label : "Illinois IL", value : "IL"},
    { label : "Indiana IN", value : "IN"},
    { label : "Iowa IA", value : "IA"},
    { label : "Kansas KS", value : "KS"},
    { label : "Kentucky KY", value : "KY"},
    { label : "Louisiana LA", value : "LA"},
    { label : "Maine ME", value : "ME"},
    { label : "Maryland MD", value : "MD"},
    { label : "Massachusetts MA", value : "MA"},
    { label : "Michigan MI", value : "MI"},
    { label : "Minnesota MN", value : "MN"},
    { label : "Mississippi MS", value : "MS"},
    { label : "Missouri MO", value : "MO"},
    { label : "Montana MT", value : "MT"},
    { label : "Nebraska NE", value : "NE"},
    { label : "Nevada NV", value : "NV"},
    { label : "New Hampshire NH", value : "NH"},
    { label : "New Jersey NJ", value : "NJ"},
    { label : "New Mexico NM", value : "NM"},
    { label : "New York NY", value : "NY"},
    { label : "North Carolina NC", value : "NC"},
    { label : "North Dakota ND", value : "ND"},
    { label : "Ohio OH", value : "OH"},
    { label : "Oklahoma OK", value : "OK"},
    { label : "Oregon OR", value : "OR"},
    { label : "Pennsylvania PA", value : "PA"},
    { label : "Puerto Rico PR", value : "PR"},
    { label : "Rhode Island RI", value : "RI"},
    { label : "South Carolina SC", value : "SC"},
    { label : "South Dakota SD", value : "SD"},
    { label : "Tennessee TN", value : "TN"},
    { label : "Texas TX", value : "TX"},
    { label : "Utah UT", value : "UT"},
    { label : "Vermont VT", value : "VT"},
    { label : "Virginia VA", value : "VA"},
    { label : "Virgin Islands  VI", value : "VI"},
    { label : "Washington WA", value : "WA"},
    { label : "Wisconsin WI", value : "WI"},
    { label : "West Virginia WV", value : "WV"},
    { label : "Wyoming WY", value : "WY"},
    { label : "Alberta AB", value : "AB"},
    { label : "British Columbia BC", value : "BC"},
    { label : "Manitoba MB", value : "MB"},
    { label : "New Brunswick NB", value : "NB"},
    { label : "Newfoundland and Labrador NL", value : "NL"},
    { label : "Nova Scotia NS", value : "NS"},
    { label : "Northwest Territories NT", value : "NT"},
    { label : "Nunavut NU", value : "NU"},
    { label : "Ontario ON", value : "ON"},
    { label : "Prince Edward Island PE", value : "PE"},
    { label : "Quebec QC", value : "QC"},
    { label : "Saskatchewan SK", value : "SK"},
    { label : "Yukon YU", value : "YU"},
  ]);
  const [copy,setCopy] = useState(props.edit === 0 ? props.editUser.is_copy : 0);
  const [securityQuestion,setSecurityQuestion] = useState(props.edit === 0 ? props.editUser.security_question : 0);
  const [securityQuestionValues,setSecurityQuestionValues] = useState([
    { label: "Select Question", value: 0},
    { label: "What is name of your favorite pet?", value:  1},
    { label: "What is your favorite color?", value: 2 },
    { label: "What is your favorite holiday?", value: 3 },
    { label: "What is your favorite region of USA?", value: 4},
  ]);

  const initialValues = {
    id              :  props.edit === 0 ? props.editUser.id : "",
    name            :  props.edit === 0 ? props.editUser.name : "",
    title           :  props.edit === 0 ? props.editUser.title : "",
    company         :  props.edit === 0 ? props.editUser.company : "",
    address1        :  props.edit === 0 ? props.editUser.address1 : "",
    address2        :  props.edit === 0 ? props.editUser.address2 : "",
    city            :  props.edit === 0 ? props.editUser.city : "", 
    state           :  props.edit === 0 ? props.editUser.state : "",
    zip             :  props.edit === 0 ? props.editUser.zip : "",
    country         :  props.edit === 0 ? props.editUser.country : "",
    apemail         :  props.edit === 0 ? props.editUser.ap_email : "",
    submissionemail :  props.edit === 0 ? props.editUser.email : "",
    phone           :  props.edit === 0 ? props.editUser.phone : "",
    fax             :  props.edit === 0 ? props.editUser.fax : "",
    username        :  props.edit === 0 ? props.editUser.username : "",
    password        :  props.edit === 0 ? props.editUser.show_password : "",
    b_password      :  props.edit === 0 ? props.editUser.b_password : "",
    cpassword       :  props.edit === 0 ? props.editUser.show_password : "",
    verify_code     :  captchaValue,
    security_ques   :   props.edit === 0 ? props.editUser.security_question : 0,
    security_ans    :  props.edit === 0 ? props.editUser.security_answer : "",
    iscopy          :   props.edit === 0 ? props.editUser.is_copy : 0,
    acc_number      :   props.edit === 0 ? props.editUser.account_number : "",
  }


  const schema = props.edit!==0 ? (Yup.object().shape({
    name      : Yup.string().required("Enter name"),
    title     : Yup.string(),
    company   : Yup.string().required("Enter valid Company Name"),
    address1  : Yup.string().required("Enter Address 1 for Company"),
    address2  : Yup.string(),
    city      : Yup.string().required("Enter City for Company"),
    state     : Yup.string().required("Select State/Province for Company"),
    zip       : Yup.string().required("Enter Zip for Company"),
    apemail   : Yup.string().required("Enter A/P email address").email("Enter valid email address"),
    submissionemail : Yup.string().required("Enter Submission email address").email("Enter valid email address"),
    phone     : Yup.string().required("Enter Phone number for Company"),
    fax       : Yup.string(),
    username  : Yup.string().required("Enter User Name"),
    password  : Yup.string().required("Password is required").max(20,"Maximum 20 characters allowed"),
    cpassword : Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Retype password is required'),
    security_ques : Yup.number().min(1,"Select Security Question").required("Select Security Question"),
    security_ans  : Yup.string().required("Enter Security Answer").max(30,"Maximum 30 characters allowed"),
    verify_code   : Yup.string().required("Please enter Verification Code")
  })) : (Yup.object().shape({
    name      : Yup.string().required("Enter name"),
    company   : Yup.string().required("Enter valid Company Name"),
    address1  : Yup.string().required("Enter Address 1 for Company"),
    city      : Yup.string().required("Enter City for Company"),
    state     : Yup.string().required("Select State/Province for Company"),
    zip       : Yup.string().required("Enter Zip for Company"),
    apemail   : Yup.string().required("Enter A/P email address").email("Enter valid email address"),
    submissionemail : Yup.string().required("Enter Submission email address").email("Enter valid email address"),
    phone     : Yup.string().required("Enter Phone number for Company"),
    username  : Yup.string().required("Enter User Name"),
    password  : Yup.string().required("Password is required").max(20,"Maximum 20 characters allowed"),
    security_ques : Yup.number().min(1,"Select Security Question").required("Select Security Question"),
    security_ans  : Yup.string().required("Enter Security Answer").max(30,"Maximum 30 characters allowed"),
}));



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
    setCountry("USA");
    setState(0); 
    setSecurityQuestion(0);   
  }


  const countryChange=(e)=>{
      setCountry(e);
      if(e === "Other"){
        setOtherCountry(true);
      }else{
        setOtherCountry(false);
      }  
  }

  const stateChange=(e)=>{
    setState(e);
    setError('state',"");
    setValue('state',e);
  }

  const securityQuestionChange=(e)=>{
    setSecurityQuestion(e);
    setError('security_ques',"");
    setValue('security_ques',e)
  }

  const captchaChange = (e) =>{
    setCaptchaValue(e.target.value)
  }
  
  const otherCountryClose = () => {
    setOtherCountry(false);
    setState(0);
    setCountry("USA");
    
  }

  const copyChange = ( ) =>{
    if(copy===0)  {
      setCopy(1)
    } else {
      setCopy(0)
    }  
    
  }


  const addUser = async(data) =>{
    


    if(props.edit !== 0 && (props.captcha !== data.verify_code)){
      setCaptchaError("Please Enter Correct Value")
      return;
    }
    const edit = props.edit !==0 ? 0 : 1;
      
    let obj = {
      id              :  data.id,
      name            :  data.name,
      title           :  data.title,
      company         :  data.company,
      address1        :  data.address1,
      address2        :  data.address2,
      city            :  data.city, 
      state_province  :  state,
      zip             :  data.zip,
      country         :  country,
      apemail         :  data.apemail,
      submissionemail :  data.submissionemail,
      copy            :  copy,
      phone           :  data.phone,
      fax             :  data.fax,
      username        :  data.username,
      password        :  data.password,
      cpassword       :  data.cpassword,
      verify_code     :  data.verify_code,
      security_question  :  securityQuestion,
      security_answer    :  data.security_ans,
      is_admin        : 0,
      edit            : edit,
      account_number  : data.acc_number
    } 

      setCaptchaError()
      // Inertia.post('/register', data); // Send data to the backend
    if(props.edit !== 0 ){
      router.post('/register', { data: obj }, {
        onError: (errors) => {
          console.log('Form submission errors:', errors);
          toast.error(errors?.username || errors?.company, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        }); 
        },
      });
    }else{
      router.post('/updateUser', { data: obj }, {
        onSuccess: (response) => {
          props.setMakeToast(true);
        props.onClose(); 
        },
        onError: (errors) => {
          alert('Submission failed!');
        },
      });
    }
     
}    




  return (
    <>
    <GuestLayout edit={props.edit}>
      <div className="mainWrapper">
     
        <div className="container py-2">
          {props.edit !== 0 && 
          <>
                <h2 className="primary-text-color text-center mb-2">
                Client Registration
                </h2>
                <p className="text-center">Completing this form will create a Billing Account. Only one Billing Account is needed per Client. <br/>Multiple Users can login at the same time using the same user id and password.</p>
                <p className="text-center text-danger"><sup>*</sup>Required Field</p>
          </>
          }
          
          <div className="row px-1 justify-content-center mt-2">
            <div className="col-5">
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
                  {props.errors?.company && <p className="text-danger mx-1">Company exist. Try different one</p>}


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
                  <div className="col-md-6 mb-2">
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
                  

                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      State/Province <sup className="text-danger">*</sup>
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
                        type="text"
                        value={state}
                        onChange={(e)=>{
                          setState(e.target.value);
                          setValue('state',e.target.value);
                          }}/>
                        <button className="text-danger mx-2" onClick={otherCountryClose}>X</button>
                      </span>
                    </>                       
                    } 
                    {errors.state && <p className="text-danger mx-1">{errors.state.message}</p>}
                  </div>
                  

                  <div className="col-md-6 mb-2">
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
                  

                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      Country<sup className="text-danger">*</sup>
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
                        type="text"
                        value={country}
                        onChange={(e)=>{
                          setCountry(e.target.value);
                          setValue('country',e.target.value)
                        }}/>
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
                      <input 
                      className="form-check-input" 
                      type="radio" 
                      name="flexRadioDefault" 
                      id="flexRadioDefault1" 
                      checked={copy === 1}
                      onClick={copyChange}
                      />
                    </div>
                    <div className="form-check">
                     <label className="form-check-label" htmlFor="flexRadioDefault2">
                       No
                      </label>
                      <input 
                      className="form-check-input" 
                      type="radio" 
                      name="flexRadioDefault" 
                      id="flexRadioDefault2"
                      checked={copy === 0}
                      onClick={copyChange}
                      />
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

                  <div className="col-md-6 mb-2">
                    <label htmlFor="input-Fax" className="form-label">
                      Fax<sup className="text-danger"></sup>
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
                    id="username"
                    name="username"
                    placeholder=""
                    autoComplete="off"
                    {...register("username")}
                  />
                </div>
                {errors.username && <p className="text-danger mx-1">{errors.username.message}</p>}
                {props.errors?.username && <p className="text-danger mx-1">Username exist. Try different one</p>}


                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Password" className="form-label">
                    Password<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder=""
                    autoComplete="off"
                    readOnly = {props.edit === 0}
                    {...register("password")}
                  />
                </div>
                {errors.password && <p className="text-danger mx-1">{errors.password.message}</p>}
                {props.edit !== 0 && 
                  <>
                    <div className="col-md-12 mb-2">
                  <label htmlFor="input-Confirm-Password" className="form-label">
                    Confirm Password<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    autoComplete="off"
                    placeholder=""
                    {...register("cpassword")}
                  />
                </div>
                {errors.cpassword && <p className="text-danger mx-1">{errors.cpassword.message}</p>}

                <div className="col-md-12 mb-2">
                  <label htmlFor="input-Verification-Code" className="form-label">
                    Verification Code:<sup className="text-danger">*</sup>
                  </label>
                  <div className="d-flex align-items-center gap-2">
                    <div>
                       <h5>{props.captcha}</h5>
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        maxLength={4}
                        className="form-control"
                        id="input-Verification-Code"
                        // value={captchaValue}
                        // onChange={captchaChange}
                        {...register("verify_code")}
                      />
                      </div>
                      
                  </div>
                </div>
                {errors.verify_code && <p className="text-danger mx-1">{errors.verify_code.message}</p>}
                {captchaError &&  <p className="text-danger mx-1">{captchaError}</p>}
                  </>
                }
                

                <div className="col-md-12 mb-2">
                    <label htmlFor="Security-Question" className="form-label">
                       Security Question<sup className="text-danger">*</sup>
                    </label>
                     <select 
                      className="form-select form-control" 
                      id="security_ques"
                      name="security_ques"
                      value={securityQuestion}        
                      onChange={(e) => { securityQuestionChange(e.target.value) }}>
                        {securityQuestionValues.map((item,index) => (
                        <option key={item.value} value={item.value}>
                        {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.security_ques && <p className="text-danger mx-1">{errors.security_ques.message}</p>}

                  <div className="col-md-12 mb-2">
                  <label htmlFor="input-Security-Answer" className="form-label">
                    Security Answer<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="security_ans"
                    name="security_ans"
                    placeholder=""
                    autoComplete="off"
                    {...register("security_ans")}
                  />
                </div>
                {errors.security_ans && <p className="text-danger mx-1">{errors.security_ans.message}</p>}
                {/* {props.edit === 0 && 
                    <div className="col-md-12 mb-2">
                    <label htmlFor="input-Password" className="form-label">
                      Billing Password<sup className="text-danger">*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="b_password"
                      name="b_password"
                      placeholder=""
                      autoComplete="off"
                      {...register("b_password")}
                    />
                  </div>
                } */}
                
             
              </div>
              {props.edit === 0 &&
              <div className="bg-light mt-4 p-4">
              <h3 className="primary-text-color mb-3">
              Account Information::
                </h3>
              <div className="col-md-12 mb-2">
                  <label htmlFor="input-username" className="form-label">
                    Account Number <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="acc_number"
                    name="acc_number"
                    placeholder=""
                    autoComplete="off"
                    {...register("acc_number")}
                  />
                </div>

              </div>
              }
              {props.edit === 0 &&
              <div className="bg-light mt-4 p-4">
              <h5 >
              <span className="primary-text-color mb-3">Registration Date: </span><span>{created}</span>
                </h5>
              

              </div>
              }
              
            </div>
            <div className="d-flex justify-content-center align-items-center pt-5">
                {props.edit === 0 ?(
                  <>
                  <button 
                  type="submit" 
                  className="btn btn-primary"
                  name="updateinfo"
                  onClick={handleSubmit(addUser)}
                  >
                    Update
                </button>
                 <button 
                 type="submit" 
                 className="btn btn-danger mx-2"
                 name="updateinfo"
                 onClick={props.onClose}
                 >
                   Close
               </button>
               </>
                ):(
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    name="saveinfo"
                    onClick={handleSubmit(addUser)}
                    >
                      Submit Registration
                  </button>
                )}
                 
            </div>
          </div>
        </div>
      </div>
      </GuestLayout>
      <ToastContainer />

    </>
  );
};
