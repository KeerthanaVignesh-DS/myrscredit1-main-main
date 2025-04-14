import InnerMenu from "@/Components/InnerMenu";
import GuestLayout from "@/Layouts/GuestLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword(props){

    const user = usePage().props.auth.user;
    const is_admin = usePage().props.auth.user.is_admin;
    const [securityQuestion,setSecurityQuestion] = useState(user.security_question);
    const [securityQuestionValues,setSecurityQuestionValues] = useState([
        { label: "Select Question", value: 0},
        { label: "What is name of your favorite pet?", value:  1},
        { label: "What is your favorite color?", value: 2 },
        { label: "What is your favorite holiday?", value: 3 },
        { label: "What is your favorite region of USA?", value: 4},
      ]);


    const initialValues={
      oldPassword     : "",
      newPassword     : "",
      confPassword    : "",
      securityQuestion: user.security_question,
      security_answer : user.security_answer,
    }


    const schema = Yup.object().shape({
        oldPassword  : Yup.string().required("Enter Old Password"),
        newPassword  : Yup.string().required("Enter New Password").max(20,"Maximum 20 characters allowed"),
        confPassword : Yup.string()
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                        .required('Confirm Password is required'),
        securityQuestion  : Yup.number().min(1,"Select Security Question").required("Select Security Question"),
        security_answer   : Yup.string().required("Enter Security Answer").max(30,"Maximum 30 characters allowed"),
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
      setSecurityQuestion(user.security_question);  
    }

    const securityQuestionChange=(e)=>{
      setSecurityQuestion(e);
      setError('securityQuestion',"");
      setValue('securityQuestion',e)
    }


    const ChangePassword = async(data)=>{
      console.log(data,"data");

      let obj={
        id                : user.id,
        current_password  : data.oldPassword,
        password          : data.newPassword,
        security_question : securityQuestion,
        security_answer   : data.security_answer
      }
      console.log(obj,"obj");
      router.put('/password',obj,{
        onSuccess: (response) => {
          // You can store the response here
          console.log('Submission successful:', response);
                toast.success('Password Changed Successfully', {
                    position: 'top-right', // Position of the toast
                    autoClose: 5000, // Duration in ms before it disappears
                    hideProgressBar: false, // Show progress bar
                    closeOnClick: true, // Close on click
                    pauseOnHover: true, // Pause on hover
                });
              resetForm();
              setSecurityQuestion(user.securityQuestion);
              setValue("security_answer",data.security_answer);
                              },
      onError: (errors) => {
          console.log('Form submission errors:', props);
          // alert('Submission failed!');
      },
      })
    }
    
  
    return(
        <>
         <GuestLayout>
          
            <div className="container pb-5 pt-2">
              <h2 className="primary-text-color text-center mb-2">
              Change Password
              </h2>
            
              <form className="row px-5 justify-content-center mt-3">
                <div className="col-12 col-lg-6 col-xl-5">
                  <div className="bg-lightgray p-4">
                   
                    <div className="col-md-12">
                      <label htmlFor="input-old-password" className="form-label">
                         Old Password <sup className="text-danger">*</sup>
                      </label>
                      <input 
                        type="text"  
                        className="form-control" 
                        id="oldPassword"
                        name="oldPassword"
                        placeholder=""
                        autoComplete="off"
                        {...register("oldPassword")}
                      />
                      {errors.oldPassword && <p className="text-danger mx-1">{errors.oldPassword.message}</p>}
                    </div>

                   
                    <div className="col-md-12 ">
                      <label htmlFor="input-confirm-password" className="form-label">
                        New Password <sup className="text-danger">*</sup>
                      </label>
                      <input 
                        type="text"  
                        className="form-control" 
                        id="newPassword"
                        name="newPassword"
                        placeholder=""
                        autoComplete="off"
                        {...register("newPassword")}
                      />
                      {errors.newPassword && <p className="text-danger mx-1">{errors.newPassword.message}</p>}
                    </div>
                    
                    <div className="col-md-12 ">
                      <label htmlFor="input-new-password" className="form-label">
                         Confirm Password <sup className="text-danger">*</sup>
                      </label>
                      <input 
                        type="text"  
                        className="form-control" 
                        id="confPassword"
                        name="confPassword"
                        placeholder=""
                        autoComplete="off"
                        {...register("confPassword")}
                      />                    
                    {errors.confPassword && <p className="text-danger mx-1">{errors.confPassword.message}</p>}
                    </div>
                    
                    {is_admin !==1 && 
                    <>
                    <div className="col-md-12 ">
                        <label htmlFor="SecurityQuestion" className="form-label">
                           Security Question <sup className="text-danger">*</sup>
                        </label>
                        <select 
                          className="form-select form-control" 
                          id="securityQuestion"
                          name="securityQuestion"
                          value={securityQuestion}        
                          onChange={(e) => { securityQuestionChange(e.target.value) }}>
                            {securityQuestionValues.map((item,index) => (
                            <option key={index} value={item.value}>
                            {item.label}
                            </option>
                          ))}
                        </select>
                        {errors.securityQuestion && <p className="text-danger mx-1">{errors.securityQuestion.message}</p>}
                      </div>

                      
                      <div className="col-md-12 ">
                      <label htmlFor="input-security-answer" className="form-label">
                         Security Answer
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="security_answer"
                        name="security_answer"
                        placeholder=""
                        autoComplete="off"
                        {...register("security_answer")}
                      />
                      {errors.security_answer && <p className="text-danger mx-1">{errors.security_answer.message}</p>}
                    </div>
                    </>
                    }
                    
                    {props?.errors?.password && <p className="text-danger">{props.errors.password}</p>}
                    
                  </div>
                  
                </div>
                
                <div className="d-flex justify-content-center align-items-center gap-2 pt-5">
                     <button 
                        type="submit" 
                        className="btn btn-primary text-uppercase"
                        name="saveinfo"
                        onClick={handleSubmit(ChangePassword)}
                      >
                        Submit
                      </button>
                      {is_admin === 1 ? (
                        <Link href="/admin-home" className="btn btn-primary text-uppercase">Cancel</Link>
                       ):(
                        <Link href="/" className="btn btn-primary text-uppercase">Cancel</Link>

                       )}
                </div>
              </form>
            </div>
          </GuestLayout>
          <ToastContainer />

        </>
    )
}