import { FaSearch } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegFilePdf, FaRegArrowAltCircleDown } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BillingList ({Billing,Clients,toast1,message})  {
  const tableHeight = {
    maxHeight: "400px",
  };
  const [type,setType] = useState("Invoice");
  const [year,setYear] = useState(new Date().getFullYear());
  const [client,setClient] =useState();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonth = monthNames[new Date().getMonth()];
  const [month, setMonth] = useState(currentMonth);

  const onSearch = () =>{
    router.get('admin-billing', { type,month,year,client }, {
          preserveState: true, // Preserve component state
          preserveScroll: true, // Prevent scroll reset
          onSuccess: (res) => {
            console.log(res)
          },
          onError: (err) => {
            if (err.response) {
              console.error('Server error:', err.response.data);
              
            } else if (err.request) {
              console.error('No response received:', err.request);
            } else {
              console.error('Request error:', err.message);
            }
          },
        });

  }

  
  const handleDownload = (filename) => {
    window.open(`/download-pdf?fname=${filename}`, "_blank");
  };

  useEffect(()=>{
    if(toast1){
      toast.success(message, {
                                          position: 'top-right', // Position of the toast
                                          autoClose: 3000, // Duration in ms before it disappears
                                          hideProgressBar: false, // Show progress bar
                                          closeOnClick: true, // Close on click
                                          pauseOnHover: true, // Pause on hover
                                      });  
    }
  })

 
  
  return (
    <>
    <AdminLayout>
      <div className="container pb-5">
        <h2 className="primary-text-color text-center mb-5">Billing List</h2>
        <div className="bg-light p-3">
          <div className="row">
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-type" className="form-label">
                Type
              </label>
              <select
                  id="input-name-type"
                  className="form-select"
                  onChange={(e)=>setType(e.target.value)}
                >
                  <option value="Invoice">Invoice</option>
                  <option value="Credit Memo">Credit Memo</option>
                  <option value="Statements">Statements</option>
                </select>
            </div>
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-month" className="form-label">
                Month
              </label>
              {/* <select id="input-name-month" className="form-select">
                <option value="1">January</option>
                <option value="2">February</option>
                <option selected="selected" value="3">
                  March
                </option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select> */}
              <select
                id="input-name-month"
                className="form-select"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setMonth(e.target.value); // Share the selected month
                }}
              >
                {monthNames.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-year" className="form-label">
                Year
              </label>
              {/* <select id="input-name-year" className="form-select">
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option selected="selected" value="2023">
                  2023
                </option>
                <option value="2024">2024</option>
              </select> */}
              <select
                  id="input-name-year"
                  className="form-select"
                  onChange={(e)=>setYear(e.target.value)}
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
            </div>
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-Client" className="form-label">
                Client
              </label>
              <select id="input-name-Client" className="form-select" onChange={(e)=>setClient(e.target.value)}>
                <option selected="selected" value="--All--">
                  All Client
                </option>
                {Clients && Clients.length>0 && Clients.map((item,index)=>(
                    <option value={item.id}>{item.name}</option>
                ))}
                
              </select>
            </div>
            <div className="col-lg-1 mb-2">
              <label className="form-label invisible">
              Show BTN
              </label>
              <button type="button" className="btn btn-primary" onClick={()=>onSearch()}>
                Show
              </button>
            </div>
           
            <div className="col-lg-3 mb-3">
                <div className="d-flex flex-column">
              <label className="form-label invisible">
                Client
              </label>
              <Link href="/upload-invoice" className="btn btn-primary">Upload New Billing</Link>
              {/* <button type="button" className="btn btn-primary" onClick={()=>goToUploadBilling()}>
              Upload New Billing
              </button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 table-responsive" style={tableHeight}>
          <table className="table table-bordered">
            <thead className="table-light position-sticky top-0">
              <tr>
                <th className="text-center align-middle">#</th>
                <th className="text-center align-middle">Account #</th>
                <th className="text-center align-middle">User Name</th>
                <th className="text-center align-middle">Client Name</th>
                <th className="text-center align-middle">A/P Email</th>
                <th className="text-center align-middle">Billing</th>
                
              </tr>
            </thead>
            <tbody>
            {Billing && Billing.length >0 ?( Billing.map((bill,index)=>(
              <tr>
                <td className="text-center">{index+1}</td>
                <td className="text-center">{bill.invoice_number}</td>
                <td className="text-center">{bill.user.name}</td>
                <td className="text-center">{bill.user.company}</td>
                <td className="text-center">{bill.user.ap_email}</td>
               
                <td className="text-center">
                
                  <button className="bg-transparent border-0" onClick={() => handleDownload(bill.invoice_file_name)}>
                  <FaRegFilePdf className="fs-5 text-danger" />
                  </button>

                </td>
                
              </tr>
            ))):
            (
              <tr >
              
              <td colSpan="6" className="text-center">No Data Found</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      </AdminLayout>
      <ToastContainer />

    </>
  );
};
