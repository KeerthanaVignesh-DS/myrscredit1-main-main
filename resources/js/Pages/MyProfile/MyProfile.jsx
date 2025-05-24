import GuestLayout from "@/Layouts/GuestLayout";
import InnerMenu from "@/Components/InnerMenu";
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DeleteComponent from "@/Components/DeleteComponent"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function MyProfile(){

  const user = usePage().props.auth.user;
  const [country,setCountry] = useState(user.country);
  const [otherCountry,setOtherCountry] = useState();
  const [state,setState] = useState(user.state);
  const [countryValues,setCountryValues] = useState([
    { label: "USA", value:  1},
    { label: "CANADA", value: 2 },
    { label: "Other", value: 3 },
  ]);
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
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    title: "",
    message: "",
    confirmation: ""
  });
  const [openDelete, setDeleteItem] = useState(false);

  const showDeleteModal = () => {
    setDeleteItem(true)
  }

  function onClose (){
  setDeleteItem(false)
 }

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

    const stateChange=(e)=>{
      setState(e);
      setError('state',"");
      setValue('state',e);
    }

    const otherCountryClose = () => {
      setOtherCountry(false);
      setState(user.state);
      setCountry(user.country);
    }
  

    const updateProfile = async()=>{
      let data = getValues();

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
        ap_email        :  data.apemail,
        email           :  data.submissionemail,
        phone           :  data.phone,
        fax             :  data.fax,
        username        :  user.username
        }
    

        router.patch('/profile',obj,{
          onSuccess: (response) => {
              // You can store the response here
              // console.log('Submission successful:', response);
              toast.success('updated Successfully', {
                    position: 'top-right', // Position of the toast
                    autoClose: 5000, // Duration in ms before it disappears
                    hideProgressBar: false, // Show progress bar
                    closeOnClick: true, // Close on click
                    pauseOnHover: true, // Pause on hover
                });  
                    },
          onError: (errors) => {
              console.log('Form submission errors:', errors);
              alert('Submission failed!');
          },
    });
    
      }

      const onLogout =() =>{
        router.post('/logout')
      }
  



    return (
        <>
          <GuestLayout>
            <div className="container pt-2">
              <h2 className="primary-text-color text-center mb-2">
              My Profile
              </h2>
            
              <form className="row px-3 px-md-5 justify-content-center mt-3">
                <div className="col-12 col-md-12 col-lg-8 col-xl-8">
                  <div className="bg-lightgray p-4">
                    <h3 className="primary-text-color mb-3">Company Information:</h3>
                    <div className="row">
                    <div className="col-md-6">
                    <div className="col-md-12 mb-1">
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

                    <div className="col-md-12 mb-1">
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

                    <div className="col-md-12 mb-1">
                      <label htmlFor="input-Company" className="form-label">
                        Company<sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        placeholder=""
                        disabled
                        autoComplete="off"
                        {...register("company")}
                      />
                    </div>
                    {errors.company && <p className="text-danger mx-1">{errors.company.message}</p>}

    
                    <div className="col-md-12 mb-1">
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

                    <div className="col-md-12 mb-1">
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
                      <div className="col-md-12 mb-1">
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

                      <div className="col-lg-12 mb-1">
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

                      <div className="col-md-12 mb-1">
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

                       <div className="col-lg-12 mb-1">
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
                      </div>
                      <div className="col-md-6">
    
                    <div className="col-md-12 mb-1">
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

                    <div className="col-md-12 mb-1">
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

                    <div className="row">
                      <div className="col-md-12 mb-1">
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

                      <div className="col-md-12 mb-1">
                        <label htmlFor="input-Fax" className="form-label">
                          Fax
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
                  </div>
                </div>
                
                <div className="d-flex justify-content-center align-items-center gap-2 pt-5 mb-3">
                     <button 
                        type="button" 
                        className="btn btn-primary text-uppercase"
                        name="saveinfo"
                        // onClick={handleSubmit(updateProfile)}
                        onClick={showDeleteModal}
                      >
                        Update
                      </button>

                     <button 
                        onClick={resetAll} 
                        className="btn btn-primary text-uppercase"
                        type="button"
                        name="close"
                        >
                          Reset
                     </button>
                </div>
              </form>
            </div>
            </GuestLayout>
            <ToastContainer />
            {openDelete && (
              <DeleteComponent
                open={openDelete}
                setDelete={setDeleteItem}                
                cancelOnClick={onClose}
                deleteOnClick={updateProfile}
              >
          <p className="text-sm text-gray-500">{deleteModal.message}</p>
              </DeleteComponent>
            )}
        </>
      );
}