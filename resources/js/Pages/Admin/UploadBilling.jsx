import { useForm } from "react-hook-form";
import { FaSearch, FaRegFilePdf, FaRegArrowAltCircleDown } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadBilling({message,logMessages}) {

    const user = usePage().props.auth.user;
  const {
    register,
    handleSubmit,
    setValue ,
    formState: { errors },
  } = useForm();
    
  const currentMonth = new Date().getMonth() + 1;

  // Set the default value of the month when the component loads
  useEffect(() => {
    setValue("month", currentMonth);
  }, [setValue]);

  const onSubmit = async(data) => {
    data.user_id=user.id;
    // console.log("Form Data:", data);
    // Handle form submission here (e.g., upload file, send mail)
    await router.post('/upload-invoice',data,{
                onSuccess: (response) => {
                    // You can store the response here
                    // console.log('Submission successful:', response);
                    // toast.success(message, {
                    //       position: 'top-right', // Position of the toast
                    //       autoClose: 3000, // Duration in ms before it disappears
                    //       hideProgressBar: false, // Show progress bar
                    //       closeOnClick: true, // Close on click
                    //       pauseOnHover: true, // Pause on hover
                    //   });    
                    //   setTimeout(() => {
                    //     router.visit('/upload-invoice');
                    //   }, 3000);
                      
                          },
                onError: (errors) => {
                    console.log('Form submission errors:', errors);
                    // alert('Submission failed!');
                    toast.error(errors[0], {
                                                              position: 'top-right', // Position of the toast
                                                              autoClose: 3000, // Duration in ms before it disappears
                                                              hideProgressBar: false, // Show progress bar
                                                              closeOnClick: true, // Close on click
                                                              pauseOnHover: true, // Pause on hover
                                                          });  
                },
          });
  };

  return (
    <AdminLayout>
      <div className="container pb-5">
        <h2 className="primary-text-color text-center mb-5">Upload Billing PDF</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-light p-3">
            <div className="row">
              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name-type" className="form-label">
                  Type
                </label>
                <select
                  id="input-name-type"
                  className="form-select"
                  {...register("type", { required: "Type is required" })}
                >
                  <option value="Invoice">Invoice</option>
                  <option value="Credit Memo">Credit Memo</option>
                  <option value="Statements">Statements</option>
                </select>
                {errors.type && <small className="text-danger">{errors.type.message}</small>}
              </div>

              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name-month" className="form-label">
                  Month
                </label>
                <select
                  id="input-name-month"
                  className="form-select"
                  {...register("month", { required: "Month is required" })}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthNames = [
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ];
                    return (
                      <option key={i} value={i + 1}>
                        {monthNames[i]}
                      </option>
                    );
                  })}
                </select>
                {errors.month && <small className="text-danger">{errors.month.message}</small>}
              </div>

              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name-year" className="form-label">
                  Year
                </label>
                <select
                  id="input-name-year"
                  className="form-select"
                  {...register("year", { required: "Year is required" })}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                {errors.year && <small className="text-danger">{errors.year.message}</small>}
              </div>

              <div className="col-lg-3 mb-2">
                <label htmlFor="invoice_file" className="form-label">
                  <span className="text-danger">*</span>Select PDF
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="invoice_file"
                  {...register("invoice_file", { required: "File is required" })}
                />
                {errors.invoice_file && (
                  <small className="text-danger">{errors.invoice_file.message}</small>
                )}
              </div>

              <div className="col-lg-3 mb-3">
                <div className="d-flex flex-column">
                  <label className="form-label invisible">Client</label>
                  <button type="submit" className="btn btn-primary">
                    Upload and send mail to clients
                  </button>
                </div>
              </div>
            </div>
            {logMessages && logMessages.length > 0 && logMessages.map((msg, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: msg }} />
        ))}
          </div>
        </form>
      </div>
      <ToastContainer />

    </AdminLayout>
    
  );
}
