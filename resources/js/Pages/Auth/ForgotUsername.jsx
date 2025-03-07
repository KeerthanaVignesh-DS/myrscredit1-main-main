import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ForgotPassword(props) {
    // const { data, setData, post, processing, errors } = useForm({
    //     email: '',
    // });

    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route('password.email'));
    // };
    const [securityQues,setSecurityQues]=useState(0);
    const [securityQuestionValues,setSecurityQuestionValues] = useState([
        { label: "Select Question", value:  0},
        { label: "What is name of your favorite pet?", value:  1},
        { label: "What is your favorite color?", value: 2 },
        { label: "What is your favorite holiday?", value: 3 },
        { label: "What is your favorite region of USA?", value: 4},
      ]);

    const initialValues={
        email_address : "",
        security_Ques : 0,
        security_ans  : "",
    }

    const schema = Yup.object().shape({
        email_address  : Yup.string().required("Please enter email address").email("Enter valid email address"),
        security_Ques  : Yup.number().min(1).required("Please select security question"),
        security_ans   : Yup.string().required("Please enter security answer")
      });
  
      const { register, handleSubmit, reset, formState: {errors,isValid},getValues,setError,setValue } = useForm({
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
        setSecurityQues(0);  
      }

      const securityQuestionChange=(e)=>{
        setSecurityQues(e);
        setValue("security_Ques",e)
      }


      const submitForgetPassword = async(data) =>{
          console.log(data,"data");

          let obj = {
            email : data.email_address,
            security_ques : securityQues,
            security_ans  : data.security_ans
          }
        await router.post('/forgot-username',obj,{
        onSuccess: (response) => {
            // You can store the response here
            console.log('Submission successful:', response);
            toast.success(props.status, {
                  position: 'top-right', // Position of the toast
                  autoClose: 5000, // Duration in ms before it disappears
                  hideProgressBar: false, // Show progress bar
                  closeOnClick: true, // Close on click
                  pauseOnHover: true, // Pause on hover
              });    
                  },
        onError: (errors) => {
            console.log('Form submission errors:', errors);
            // alert(errors);
        },
        });
          // try{
          //   post(route('login', obj));
          //   resetForm();
          // }catch(err){
          //   console.log(err);
          //   resetForm();
          // }
          
      }
   

    return (
        <GuestLayout>
            <Head title="Forgot Password" />        
         
            <div className="container py-5">
              <h2 className="primary-text-color text-center mb-2">
                 Forgot Password
              </h2>
            
              <div className="row px-2 px-md-5 justify-content-center mt-5">
                <div className="col-12 col-md-6 col-xl-5">
                  <div className="bg-light p-4">
                   
                    <div className="col-md-12 mb-2">
                      <label htmlFor="input-Email" className="form-label">
                        Your Email-ID: <sup className="text-danger">*</sup>
                      </label>
                      <input 
                            type="email" 
                            className="form-control" 
                            id="email_address"
                            name="email_address"
                            autoComplete="off"
                            placeholder=""
                            {...register("email_address")} 
                        />
                    </div>
                    {errors.email_address && <p className="text-danger mx-1">{errors.email_address.message}</p>}
                  
                    <div className="col-md-12 mb-2">
                        <label htmlFor="SecurityQuestion" className="form-label">
                           Security Question <sup className="text-danger">*</sup>
                        </label>
                        <select 
                              className="form-select form-control" 
                              id="security_ques"
                              name="security_ques"
                              value={securityQues}        
                              onChange={(e) => { securityQuestionChange(e.target.value) }}>
                                {securityQuestionValues.map((item,index) => (
                                <option key={index} value={item.value}>
                                {item.label}
                                </option>
                              ))}
                        </select>
                      </div>
                      {errors.security_Ques && <p className="text-danger mx-1">{errors.security_Ques.message}</p>}

                      
                      <div className="col-md-12 mb-2">
                      <label htmlFor="input-security-answer" className="form-label">
                         Security Answer <sup className="text-danger">*</sup>
                      </label>
                      <input 
                          type="text" 
                          className="form-control" 
                          id="input-security-answer"
                          name="security_ans"
                          placeholder=""
                          autoComplete="off"
                          {...register("security_ans")} 
                      />
                     </div>
                     {errors.security_ans && <p className="text-danger mx-1">{errors.security_ans.message}</p>}

                  </div>
                  {props.errors?.email && <p className="text-danger mx-1">{props.errors?.email}</p>}
                </div>
                
                {console.log(errors)}
               

                <div className="d-flex justify-content-center align-items-center gap-2 pt-5">
                     <button 
                          type="submit" 
                          className="btn btn-primary text-uppercase"
                          name="saveinfo"
                          onClick={handleSubmit(submitForgetPassword)}
                      >
                        Submit
                      </button>
                     <Link href="/login" className="btn btn-primary text-uppercase">Cancel</Link>
                </div>
              </div>
            </div>
          
            <ToastContainer />

    
        </GuestLayout>
        
    );
}
