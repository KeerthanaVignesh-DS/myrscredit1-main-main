import GuestLayout from "@/Layouts/GuestLayout";
import InnerMenu from "@/Components/InnerMenu";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { get, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast as toast1, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


export default function RecommendationSubmission({edit,value,handleClose,toast}) {

  const user = usePage().props.auth.user;
  const [accCount,setAccCount] = useState([
    {
    user_id         :  user.id,
    account_name    :  edit === 0 ? value.name : "",
    account_address1:  edit === 0 ? value.address1 :"",
    account_address2:  edit === 0 ? value.address2:"",
    account_city    :  edit === 0 ? value.city:"",
    account_state   :  edit === 0 ? value.state:"",
    account_country :   edit === 0 ? value.country:1,
    account_zip     :  edit === 0 ? value.zip:"",
    account_phone   :  edit === 0 ? value.phone : "",
    myrsProduct     :  edit === 0 ? value.myrs_product:0,
    expressService  :  edit === 0 ? value.express_service:0,
    orderAmount     :  edit === 0 ? value.order_amount : "",
    comments        :  edit === 0 ? value.comments:"",
    status          :   edit === 0 ? value.status:0,
    chk_previous14  :  false,
    lbl_doc_name1   :  '',
    file_upload_controls1   : false,
    doc_name1       :  '',
    lbl_doc_name2   :  '',
    file_upload_controls2   : false,
    doc_name2       :  '',
    }
  ]);
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
    { label : "Select State", value : ''},
    { label : "Alabama AL", value : 'AL'},
    { label : "Alaska AK", value : 'AK'},
    { label : "Arizona AZ", value : 'AZ'},
    { label : "Arkansas AR", value : 'AR'},
    { label : "California CA", value : 'CA'},
    { label : "Colorado CO", value : 'CO'},
    { label : "Connecticut CT", value : 'CT'},
    { label : "District of Columbia DC", value : 'DC'},
    { label : "Delaware DE", value : 'DE'},
    { label : "Florida FL", value : 'FL'},
    { label : "Georgia GA", value : 'GA'},
    { label : "Hawaii HI", value : 'HI'},
    { label : "Idaho ID", value : 'ID'},
    { label : "Illinois IL", value : 'IL'},
    { label : "Indiana IN", value : 'IN'},
    { label : "Iowa IA", value : 'IA'},
    { label : "Kansas KS", value : 'KS'},
    { label : "Kentucky KY", value : 'KY'},
    { label : "Louisiana LA", value : 'LA'},
    { label : "Maine ME", value : 'ME'},
    { label : "Maryland MD", value : 'MD'},
    { label : "Massachusetts MA", value : 'MA'},
    { label : "Michigan MI", value : 'MI'},
    { label : "Minnesota MN", value : 'MN'},
    { label : "Mississippi MS", value : 'MS'},
    { label : "Missouri MO", value : 'MO'},
    { label : "Montana MT", value : 'MT'},
    { label : "Nebraska NE", value : 'NE'},
    { label : "Nevada NV", value : 'NV'},
    { label : "New Hampshire NH", value : 'NH'},
    { label : "New Jersey NJ", value : 'NJ'},
    { label : "New Mexico NM", value : 'NM'},
    { label : "New York NY", value : 'NY'},
    { label : "North Carolina NC", value : 'NC'},
    { label : "North Dakota ND", value : 'ND'},
    { label : "Ohio OH", value : 'OH'},
    { label : "Oklahoma OK", value : 'OK'},
    { label : "Oregon OR", value : 'OR'},
    { label : "Pennsylvania PA", value : 'PA'},
    { label : "Puerto Rico PR", value : 'PR'},
    { label : "Rhode Island RI", value : 'RI'},
    { label : "South Carolina SC", value : 'SC'},
    { label : "South Dakota SD", value : 'SD'},
    { label : "Tennessee TN", value : 'TN'},
    { label : "Texas TX", value : 'TX'},
    { label : "Utah UT", value : 'UT'},
    { label : "Vermont VT", value : 'VT'},
    { label : "Virginia VA", value : 'VA'},
    { label : "Virgin Islands  VI", value : 'VI'},
    { label : "Washington WA", value : 'WA'},
    { label : "Wisconsin WI", value : 'WI'},
    { label : "West Virginia WV", value : 'WV'},
    { label : "Wyoming WY", value : 'WY'},
    { label : "Alberta AB", value : 'AB'},
    { label : "British Columbia BC", value : 'BC'},
    { label : "Manitoba MB", value : 'MB'},
    { label : "New Brunswick NB", value : 'NB'},
    { label : "Newfoundland and Labrador NL", value : 'NL'},
    { label : "Nova Scotia NS", value : 'NS'},
    { label : "Northwest Territories NT", value : 'NT'},
    { label : "Nunavut NU", value : 'NU'},
    { label : "Ontario ON", value : 'ON'},
    { label : "Prince Edward Island PE", value : 'PE'},
    { label : "Quebec QC", value : 'QC'},
    { label : "Saskatchewan SK", value : 'SK'},
    { label : "Yukon YU", value : 'YU'},
  ]);
  const [copy,setCopy] = useState(null);
  const [myrsProduct,setMyrsProduct] = useState(0);
  const [myrsProductValues,setMyrsProductValues] = useState([
    { label: "Choose the Type of Product", value: 0},
    { label: "Summary Credit Report", value:  1},
    { label: "Summary Credit Report w/details", value:  2},
  ]);
  const [expressService,setExpressService] = useState(0);
  const [expressServiceValues,setExpressServiceValues] = useState([
    { label: "Choose Level of Service", value: 0},
    { label: "Instant Response (4 Office Hours)", value:  1},
    { label: "Rapid Response (8 Office Hours)", value:  2},
    { label: "Fast Response (12 Office Hours)", value:  3},
    { label: "Quick Response (16 Office Hours)", value:  4},
    { label: "Standard Response (24+/- Office Hours)", value:  5},
  ]);
  const [fileUploadError,setFileUploadError] = useState([]);


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
    copy            :  user.is_copy,
    
    // account_name    :  "",
    // account_address1:  "",
    // account_address2:  "",
    // account_city    :  "",
    // account_state   :  accountState,
    // account_zip     :  "",
    // account_country :  1,
    // account_phone   :  "",
    // myrsProduct     :  myrsProduct,
    // expressService  :  expressService,
    // orderAmount     :  "",
    // comments        :  ""
    }

    const schema = edit!==0 ? (Yup.object({
      fields: Yup.array().of(
        Yup.object({
      account_name      : Yup.string().required("Enter Account Name"),
      account_address1  : Yup.string().required("Enter Address1 for Account"),
      account_address2  : Yup.string(),
      account_city      : Yup.string().required("Enter City for Account"),
      account_state     : Yup.string().required("Select State/Province for Account"),
      account_zip       : Yup.string().required("Enter Zip for Account"),
      account_phone     : Yup.string().required("Enter Phone for Account"),
      account_country   :Yup.string(),
      myrsProduct       : Yup.number().min(1,"Select Myrs Product").required("Select Myrs Product"), 
      expressService    : Yup.number().min(1,"Select Express Service").required("Select Express Service"),
      orderAmount       : Yup.number().min(1,"Enter Order Amount")
                          // .max(10,"Enter Order Amount")
                          .required("Enter Order Amount"),
      comments          : Yup.string(), 
      chk_previous14  :  Yup.boolean(),
      lbl_doc_name1   :  Yup.string(),
      file_upload_controls1   : Yup.boolean(),
      doc_name1       : Yup.string(),
      lbl_doc_name2   :  Yup.string(),
      file_upload_controls2   : Yup.boolean(),
      doc_name2       : Yup.string(),
        })
      ),
    })):(
      Yup.object({
        fields: Yup.array().of(
          Yup.object({
        account_name      : Yup.string().required("Enter Account Name"),
        account_address1  : Yup.string().required("Enter Address1 for Account"),
        account_city      : Yup.string().required("Enter City for Account"),
        account_state     : Yup.string().required("Select State/Province for Account"),
        account_zip       : Yup.string().required("Enter Zip for Account"),
        account_phone     : Yup.string().required("Enter Phone for Account"),
        myrsProduct       : Yup.number().min(1,"Select Myrs Product").required("Select Myrs Product"), 
        expressService    : Yup.number().min(1,"Select Express Service").required("Select Express Service"),
        orderAmount       : Yup.number().min(1,"Enter Order Amount")
                            // .max(10,"Enter Order Amount")
                            .required("Enter Order Amount")
          })
        ),
      }));
    // const schema = Yup.object().shape({
    //   // name      : Yup.string().required("Enter name"),
    //   // title     : Yup.string(),
    //   // company   : Yup.string().required("Enter valid Company Name"),
    //   // address1  : Yup.string().required("Enter Address1 for Company"),
    //   // address2  : Yup.string(),
    //   // city      : Yup.string().required("Enter City for Company"),
    //   // state     : Yup.string().required("Select State/Province for Company"),
    //   // zip       : Yup.string().required("Enter Zip for Company"),
    //   // apemail   : Yup.string().required("Enter A/P email address").email("Enter valid email address"),
    //   // submissionemail : Yup.string().required("Enter Submission email address").email("Enter valid email address"),
    //   // phone     : Yup.string().required("Enter Phone number for Company"),
    //   // fax       : Yup.string(),
    //   account_name      : Yup.string().required("Enter Account Name"),
    //   account_address1  : Yup.string().required("Enter Address1 for Account"),
    //   account_address2  : Yup.string(),
    //   account_city      : Yup.string().required("Enter City for Account"),
    //   account_state     : Yup.string().required("Select State/Province for Account"),
    //   account_zip       : Yup.string().required("Enter Zip for Account"),
    //   account_phone     : Yup.string().required("Enter Phone for Account"),
    //   myrsProduct       : Yup.number().min(1,"Select Myrs Product").required("Select Myrs Product"), 
    //   expressService    : Yup.number().min(1,"Select Express Service").required("Select Express Service"),
    //   orderAmount       : Yup.number().min(1,"Enter Order Amount").max(10,"Enter Order Amount").required("Enter Order Amount"),
    //   comments          : Yup.string(),    
    // });


  const { control,register,post,watch, handleSubmit, reset, formState: {errors,isValid},getValues,setError,setValue } = useForm({
      defaultValues: { ...initialValues,
        fields:accCount
       },
      resolver: yupResolver(schema),
      mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });
  const watchedItems = watch("fields");

  const resetForm = () => {
    resetAll();
  }

  const resetAll = () => {
    reset((form) => ({
      ...form,
      ...initialValues,
      fields:accCount
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

  const accCountryChange=(e,index)=>{
    setAccountCountry(e);
    setValue(`fields.${index}.account_country`,e);
  }

  const stateChange=(e)=>{
    setState(e);
    setError('state',"");
    setValue('state',e);
  }

  const accStateChange=(e,index)=>{
    setAccountState(e);
    setError(`fields.${index}.account_state`,"");
    setValue(`fields.${index}.account_state`,e);
  }

  const otherCountryClose = () => {
    setOtherCountry(false);
    setState(user.state);
    setCountry(user.country);
  }

  const myrsProductChange = (e,index) => {
    setMyrsProduct(e);
    setValue(`fields.${index}.myrsProduct`,e);
    setError(`fields.${index}.myrsProduct`,'');
  }

  const expressServiceChange = (e,index) => {
    setExpressService(e);
    setValue(`fields.${index}.expressService`,e);
    setError(`fields.${index}.expressService`,'')
  }

  const addMoreSubmissions = () =>{
    // let val = accCount;
    // val.push( {
    //   account_name    :  "",
    // account_address1:  "",
    // account_address2:  "",
    // account_city    :  "",
    // account_state   :  "",
    // account_zip     :  "",
    // account_country :  "",
    // account_phone   :  "",
    // myrsProduct     :  "",
    // expressService  :  "",
    // orderAmount     :  "",
    // comments        :  ""
    // });
    setAccCount([
      ...accCount, // Spread the existing state array
      {
        account_name    :  "",
        account_address1:  "",
        account_address2:  "",
        account_city    :  "",
        account_state   :  "",
        account_zip     :  "",
        account_country :  1,
        account_phone   :  "",
        myrsProduct     :  "",
        expressService  :  "",
        orderAmount     :  "",
        comments        :  ""
      }
    ]);

    
  }

  const removeSubmissions =(i) =>{
    
    setAccCount(accCount.filter((item,ind) => ind !== i));
  }


  const addRecommendation = async(data,e)=>{

    const errorObj = {};

      data.fields.forEach((field, index) => {
        if (field.chk_previous14 && !field.doc_name1) {
          errorObj[index] = "Document is required";
        }
      });

      if (Object.keys(errorObj).length > 0) {
        setFileUploadError(errorObj);
        return;
      }

      setFileUploadError({});   
    
    let id = 0;
    if(edit === 0){
      id= value.id;
    }
    // console.log(data.fields);

   
    await router.post(route('submission.store'),{fields:data.fields,id:id},{
            onSuccess: (response) => {
                // You can store the response here
                // console.log('Submission successful:', response);
                if(user.is_admin !== 1 && edit !== 0){
                toast1.success('Submitted Successfully', {
                  position: 'top-right', // Position of the toast
                  autoClose: 3000, // Duration in ms before it disappears
                  hideProgressBar: false, // Show progress bar
                  closeOnClick: true, // Close on click
                  pauseOnHover: true, // Pause on hover
              });
            }
                  // resetAll();
                  if(user.is_admin === 1 || edit === 0){
                    handleClose();
                    toast.success('Submitted Successfully', {
                      position: 'top-right', // Position of the toast
                      autoClose: 3000, // Duration in ms before it disappears
                      hideProgressBar: false, // Show progress bar
                      closeOnClick: true, // Close on click
                      pauseOnHover: true, // Pause on hover
                  });
                   }
                  setTimeout(() => {
                    if(user.is_admin !== 1 && edit !== 0){
                    
                      router.visit('/my-submissions');

                    }
                  }, 3000);
                  
                  
                      },
            onError: (errors) => {
                console.log('Form submission errors:', errors);
                alert('Submission failed!');
            },
      });

  }
  // const addRecommendation = async (data, e) => {
  //   let id = 0;
  //   if (edit === 0) {
  //     id = value.id;
  //   }
  
  //   console.log("Submitting fields:", data.fields);
  
  //   const formData = new FormData();
  //   formData.append('id', id);
  
  //   // Loop over each field (assuming `data.fields` is an array of objects)
  //   data.fields.forEach((field, index) => {
  //     Object.entries(field).forEach(([key, value]) => {
  //       if (value instanceof File) {
  //         formData.append(`fields[${index}][${key}]`, value);
  //       } else {
  //         formData.append(`fields[${index}][${key}]`, value ?? '');
  //       }
  //     });
  //   });
  
  //   try {
  //     const response = await axios.post(route('submission.store'), formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  
  //     console.log('Submission successful:', response);
  //     toast.success('Submitted Successfully', {
  //       position: 'top-right',
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //     });
  
  //     setTimeout(() => {
  //       if (user.is_admin === 1) {
  //         router.visit('/admin-submissions');
  //       } else {
  //         router.visit('/my-submissions');
  //       }
  //     }, 3000);
  //   } catch (err) {
  //     console.error('Form submission error:', err);
  //     alert('Submission failed!');
  //   }
  // };
  const handleUpload = async (e,i) => {
    let file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // setUploadedUrl(res.data.url);
      // console.log(res.data);
      setValue(`fields.${i}.lbl_doc_name1`, file.name);
    setValue(`fields.${i}.doc_name1`, res.data.path);

      // alert('Upload successful!');
    } catch (err) {
      console.error(err);
      // alert('Upload failed!');
    }
  };
  


  return (
    <>
      <GuestLayout  edit={edit}>
        
        <div className="container py-2">
          {edit !== 0 &&
            <>
                <h2 className="primary-text-color text-center mb-1">
                  Recommendation Submission Form
                </h2>
                <p className="text-center">Please furnish the following information.</p>
                <p className="text-center text-danger mb-3"><sup>*</sup>Required Field</p>
            </>
          }
         
          <form className=" px-xl-5 ">
            
            <div className="col-xl-12">
              <div className="bg-light p-4 mb-3 row">
                <h3 className="primary-text-color mb-3">Client Information:</h3>
                <div className="col-6 mb-2">
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
                      readOnly={edit === 0} 
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
                    readOnly={edit === 0}
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
                    readOnly={edit === 0}
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
                    readOnly={edit === 0}
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
                    readOnly={edit === 0}
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
                      readOnly={edit === 0}
                    />
                    {errors.city && <p className="text-danger mx-1">{errors.city.message}</p>}
                  </div>

                  <div className="col-lg-6 mb-2">
                    <label htmlFor="inputState" className="form-label">
                      State/Province
                    </label>
                    {((!otherCountry || otherCountry=== "")) && 
                      <select 
                      className="form-select form-control" 
                      id="state"
                      name="state"
                      value={state}  
                      disabled={edit===0}      
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
                        {...register('state')}
                        readOnly={edit === 0}
                        />
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
                      readOnly={edit === 0}
                    />
                    {errors.zip && <p className="text-danger mx-1">{errors.zip.message}</p>}
                  </div>

                  <div className="col-lg-6 mb-2">
                    <label htmlFor="inputState" className="form-label">
                      Country
                      {/* <sup className="text-danger">*</sup> */}
                    </label>
                    {((!otherCountry || otherCountry=== "")) && 
                      <select 
                        className="form-select form-control" 
                        id="country"
                        name="country"
                        value={country}  
                        disabled={edit===0}      
                        onChange={(e) => { countryChange(e.target.value) }}>
                          {countryValues.map((item,index) => (
                          <option key={index} value={item.value}>
                          {item.label}
                          </option>
                        ))}
                      </select>
                    }
                    {otherCountry  && 
                    <>
                      <span>
                       <input
                        className=" w-75" 
                        type="text"
                        {...register('country')}
                        readOnly={edit === 0}/>
                        <button className="text-danger mx-2" onClick={otherCountryClose}>X</button>
                      </span>
                    </>   
                    }
                   </div>
                  </div>
                  </div>
                  <div className="col-6 mb-2">

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
                    readOnly={edit === 0}
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
                          <input checked={user.is_copy===1} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        </div>
                        <div className="form-check">
                         <label className="form-check-label" htmlFor="flexRadioDefault2">
                           No
                          </label>
                          <input checked={user.is_copy===0} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
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
                      readOnly={edit === 0}
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
                      readOnly={edit === 0}
                    />
                  </div>

                </div>
                </div>
              </div>
            </div>
            {fields && fields.map((field,index) =>{
              const isChecked = watch(`fields.${index}.chk_previous14`);

              return(
                 <div className="col-xl-12 mb-3" key={index}>
                                {/* {console.log('fields',fields.length)} */}

                 <div className="bg-light p-4 row">
                  {fields.length > 1 && 
                      <h3 className="primary-text-color mb-3">
                        Account Submission Information {index+1}:
                      </h3>
                    }
                   {fields.length === 1 &&
                    <h3 className="primary-text-color mb-3">
                      Account Submission Information :
                    </h3>
                    }
                   <div className="col-6 mb-1">
                   <div className="col-md-12 mb-1">
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
                       {...register(`fields.${index}.account_name`)}
                       readOnly={edit === 0}
                     />
                   </div>
                   {errors.fields?.[index]?.account_name && <p className="text-danger mx-1 mb-0">{errors.fields?.[index]?.account_name.message}</p>}
   
                   <div className="col-md-12 mb-1">
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
                       {...register(`fields.${index}.account_address1`)}
                       readOnly={edit === 0}
                     />
                   </div>
                   {errors.fields?.[index]?.account_address1 && <p className="text-danger mx-1 mb-0">{errors.fields?.[index]?.account_address1.message}</p>}
   
                   <div className="col-md-12 mb-1">
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
                       {...register(`fields.${index}.account_address2`)}
                       readOnly={edit === 0}
                     />
                   </div>
   
                   <div className="row">
                     <div className="col-lg-6 mb-1">
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
                         {...register(`fields.${index}.account_city`)}
                         readOnly={edit === 0}
                       />
                    {errors.fields?.[index]?.account_city && <p className="text-danger mx-1 mb-0">{errors.fields?.[index]?.account_city.message}</p>}
                   </div>
   
                     <div className="col-lg-6 mb-1">
                       <label htmlFor="inputState-sub" className="form-label">
                         State/Province<sup className="text-danger">*</sup>
                       </label>
                       <select 
                         className="form-select form-control" 
                         id="account_state"
                         name="account_state"
                         {...register(`fields.${index}.account_state`)}
                         disabled={edit===0}
                        //  value={fields[index].account_state}        
                        //  onChange={(e) => { accStateChange(e.target.value,index) }}
                         >
                           {stateValues.map((item,index) => (
                           <option key={index} value={item.value}>
                           {item.label}
                           </option>
                         ))}
                       </select>
                     {errors.fields?.[index]?.account_state && <p className="text-danger mx-1 mb-0">{errors.fields?.[index]?.account_state.message}</p>}

                     </div>
   
                     <div className="col-lg-6 mb-1">
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
                         {...register(`fields.${index}.account_zip`)}
                         readOnly={edit === 0}
                       />
                       {errors.fields?.[index]?.account_zip && <p className="text-danger mx-1 mb-0">{errors.fields?.[index]?.account_zip.message}</p>}
                     </div>
   
                     <div className="col-lg-6 mb-1">
                       <label htmlFor="inputState-sub" className="form-label">
                         Country<sup className="text-danger">*</sup>
                       </label>
                       <select 
                           className="form-select form-control" 
                           id="account_country"
                           name="account_country"
                           {...register(`fields.${index}.account_country`)}
                           disabled={edit===0}
                          //  value={fields[index].account_country}        
                          //  onChange={(e) => { accCountryChange(e.target.value,index) }}
                           >
                             {accCountryValues.map((item,index) => (
                             <option key={index} value={item.value}>
                             {item.label}
                             </option>
                           ))}
                         </select>
                     </div>
   
                     <div className="col-md-12 mb-1">
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
                         {...register(`fields.${index}.account_phone`)}
                         readOnly={edit === 0}
                       />                  
                     {errors.fields?.[index]?.account_phone && <p className="text-danger mx-1 mb-0">{errors.fields?.[index]?.account_phone.message}</p>}
                     </div>
                   
                   </div>
                   </div>
                   <div className="col-6 mb-1">
   
                   <div className="col-md-12 mb-1">
                       <label htmlFor="Myrs-Product-sub" className="form-label">
                         Myrs Product:<sup className="text-danger">*</sup>
                       </label>
                       <select 
                           className="form-select form-control" 
                           id="myrsProduct"
                           name="myrsProduct"
                           {...register(`fields.${index}.myrsProduct`)}
                           disabled={edit === 0 && fields[index].status === 1}
                          //  value={fields[index].myrsProduct}        
                          //  onChange={(e) => { myrsProductChange(e.target.value,index) }}
                           >
                             {myrsProductValues.map((item,index) => (
                             <option key={index} value={item.value}>
                             {item.label}
                             </option>
                           ))}
                         </select>
                     </div>
                     {errors.fields?.[index]?.myrsProduct && <p className="text-danger mx-1 mb-0">{errors.fields?.[index]?.myrsProduct.message}</p>}
   
                     <div className="col-md-12 mb-1">
                       <label htmlFor="Myrs-Product-sub" className="form-label">
                          Express Service<sup className="text-danger">*</sup>
                       </label>
                       <select 
                           className="form-select form-control" 
                           id="expressService"
                           name="expressService"
                           {...register(`fields.${index}.expressService`)}
                           disabled={edit===0}
                          //  value={fields[index].expressService}        
                          //  onChange={(e) => { expressServiceChange(e.target.value,index) }}
                           >
                             {expressServiceValues.map((item,index) => (
                             <option key={index} value={item.value}>
                             {item.label}
                             </option>
                           ))}
                         </select>
                     </div>
                     {errors.fields?.[index]?.expressService && <p className="text-danger mx-0 mb-0">{errors.fields?.[index]?.expressService.message}</p>}
   
                     <div className="col-md-12 mb-1">
                       {/* <p className="mb-2" ><small>Express Service Office Hours: M-F 9:00-5:00 Central Time</small></p> */}
                       <p style={{ color: "blue", fontWeight: "bold" }}>
                         Express Service Office Hours: M-F 9:00-5:00 Central Time
                       </p>
                       <label htmlFor="order-amount-sub" className="form-label">
                          Order Amount$<sup className="text-danger">*</sup>
                       </label>
                       <input
                         type="number"
                         className="form-control"
                         id="orderAmount"
                         name="orderAmount"
                         autoComplete="off"
                         placeholder=""
                         {...register(`fields.${index}.orderAmount`)}
                         readOnly={(edit === 0 && fields[index].status === 1) || (edit === 0 && user.is_admin === 0)}
                       />
                     </div>
                     {errors.fields?.[index]?.orderAmount && <p className="text-danger mx-1 mb-1">{errors.fields?.[index]?.orderAmount.message}</p>}
                     {edit !== 0 &&
                     <>
                        <div className="col-md-12 mb-1">
                     <label>
                      <input
                        type="checkbox"
                        id="chk_previous14"
                         name="chk_previous14"
                        {...register(`fields.${index}.chk_previous14`)} // Register the checkbox field
                      />
                     &nbsp; Previous #14
                    </label>
                     
                     </div>
                     
                     {isChecked && 
                     <div className="col-md-12 mb-1">
                     <input
                         type="file"
                         className="form-control mb-2"
                         id="docName1"
                         name="docName1"
                        //  {...register(`fields.${index}.docName1`)}
                        //  onChange={(e) => 
                        //   setValue(`fields.${index}.lbl_doc_name1`, e.target.files[0].name)
                        //   // console.log(e.target.files[0].name)
                        //   } // Handle file change
                        onChange={(e)=>handleUpload(e,index)}

                         
                       />
                      {fileUploadError[index] && (
                        <p className="text-danger mx-1">{fileUploadError[index]}</p>
                      )}
                        {/* <input
                         type="file"
                         className="form-control"
                         id="docName2"
                         name="docName2"
                         
                       /> */}
                        
                      
                     </div>
                     }
                     </>
                     }
                     
                     <div className="col-md-12 mb-2">
                        <label htmlFor="order-amount-sub" className="form-label">
                           Comment
                       </label>
                      <textarea  
                         className="form-control" 
                         style={{height:'100px'}}
                         name="comments"
                         placeholder=""
                         autoComplete="off"
                         {...register(`fields.${index}.comments`)}
                         readOnly={edit === 0}
                       >
                       </textarea>
                     </div>
                      {index !== 0 &&
                       <div className="d-flex justify-content-end align-items-center mt-3">
                          <button type="button" onClick={() => remove(index)} className="btn btn-secondary btn-sm ">Delete Submission</button>
                        </div>
                      }
                    
                    
                     </div>
                     {edit === 0 && fields[index].status !== 1 &&
                        <div className="d-flex justify-content-center align-items-center pt-5">
                          <button 
                                type="submit" 
                                className="btn btn-primary"
                                name="updateinfo"
                                onClick={handleSubmit(addRecommendation)}
                              >
                                Update
                              </button>

                        </div>
                    }
                     
                 </div>
                
               </div>
              
            )
            })}
            {edit !== 0 ?(
            <>
            <div className="d-flex justify-content-end align-items-center mt-3">
            <button type="button" onClick={() => append({  
                    user_id              :  user.id,
                    account_name    :  "",
                    account_address1:  "",
                    account_address2:  "",
                    account_city    :  "",
                    account_state   :  "",
                    account_zip     :  "",
                    account_country :  1,
                    account_phone   :  "",
                    myrsProduct     :  0,
                    expressService  :  0,
                    orderAmount     :  "",
                    comments        :  "",
                    status          :   0,
                    chk_previous14  :  false,
                    lbl_doc_name1   :  '',
                    file_upload_controls1   : false,
                    doc_name1       : '',
                    lbl_doc_name2   :  '',
                    file_upload_controls2   : false,
                    doc_name2       : '',

                  })} 
                    
                    className="btn btn-primary btn-sm">Add More Submissions</button>
                  </div>
                  <div className="d-flex justify-content-center align-items-center pt-5">
                  <button 
                      type="submit" 
                      className="btn btn-primary"
                      name="saveinfo"
                      onClick={handleSubmit(addRecommendation)}
                    >
                      Submit Request
                    </button>
              </div>
              </>
            
                ):(
                  <div className="d-flex justify-content-center  mt-3"> 
                  <button 
                      type="submit" 
                      className="btn btn-primary"
                      name="saveinfo"
                      onClick={()=>handleClose()}
                    >
                      Close
                    </button>
                    </div>
                )
              }

            {/* {console.log(errors)} */}
          
          </form>
        </div>
        {/* </InnerMenu>  */}
        </GuestLayout>
        <ToastContainer />

    </>
  );
};

