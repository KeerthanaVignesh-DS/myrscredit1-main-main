import { FaSearch } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import GuestLayout from "@/Layouts/GuestLayout";
import InnerMenu from "@/Components/InnerMenu";
import { useState } from "react";
import { router } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import SlideOver from "@/Components/SlideOver";
import RecommendationSubmission from "../Recommendation Submission/RecommendationSubmission";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";



export default function MySubmissions({submissions,auth}){
  console.log(auth.user)
  const [account,setAccount] = useState('--All--');
  const [status,setStatus] = useState('--All--');
  const [dateFilter,setDateFilter] = useState();
  const [dateFrom,setDateFrom] = useState(new Date());
  const [dateTo,setDateTo] = useState(new Date());
  const [month_to_date,setMonthToDate] = useState(0);

  const onSearch = () =>{
    let date_from = dateFrom ? format(dateFrom, "dd-MM-yyyy") : null;
    let date_to = dateTo ? format(dateTo, "dd-MM-yyyy") : null;
    let name = account;
    router.get(route('submission'), { status,dateFilter,name,date_from,date_to}, { preserveState: true });
  }
  const onSearchPending = () =>{
    router.get(route('submission'), { status:0,month_to_date  }, { preserveState: true });
  }
  const onSearchCompleted = () =>{
    router.get(route('submission'), { status:1,month_to_date  }, { preserveState: true });
  }
  const handleChangeDateFrom = (date, event) => {
    const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
    console.log(formattedDate);
    setDateFrom(date)
  };
  const handleChangeDateTo = (date, event) => {
    const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
    setDateTo(date)
  };
  const [show, setShow] = useState(false);
  const [child, setChild] = useState('');


  const handleClose = () => setShow(false);
  const handleshow = (val) =>{
    console.log(val)
    setShow(true);
    setChild(val);
  }
  const handleDownload = () => {
    const transformedData = submissions.map((row) => {
      let serviceLevel = "";
      if (row.express_service === "1") {
        serviceLevel = "Instant Response (4 Office Hours)";
      } else if (row.express_service === "2") {
        serviceLevel = "Rapid Response (8 Office Hours)";
      } else if (row.express_service === "3") {
        serviceLevel = "Fast Response (12 Office Hours)";
      } else if (row.express_service === "4") {
        serviceLevel = "Quick Response (16 Office Hours)";
      } else if (row.express_service === "5") {
        serviceLevel = "Standard Response (24+/- Office Hours)";
      } else {
        serviceLevel = "";
      }
      return{
          "Contact": row.phone,
          "Submission Date": row.submitted_date,
          "Account Name": row.name,
          "Myrs Product": row.myrs_product === 1 ? "Summary Credit Report" : "Summary Credit Report w/details",
          "Service Level": serviceLevel,
          "Order Amount": row.order_amount,
          "Status": row.status === 0 ? "PENDING" : "COMPLETED",
          "ChargeAmount": row.charge_amount,
          "Account ReportCompletedDate": row.completed_date,
          "MyrsRating": row.myrs_rating,
          "Account IsPrevious14": row.is_previous,
          "Account DocumentName": row.document_name1,
          "Account DocumentName2": row.document_name2,
      }
      
    
    });
    // Convert table data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C }); // Header row (r: 0)
      if (!worksheet[cellAddress]) continue;
      worksheet[cellAddress].s = {
        fill: {
          fgColor: { rgb: "FFFF00" }, // Yellow background
        },
        font: {
          bold: true,
          color: { rgb: "000000" }, // Black text
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
      };
    }
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "FormattedData");

    // Generate a binary Excel file and download
    XLSX.writeFile(workbook, "Mysubmissionlist.xlsx");
  };
  return (
    <>
      <GuestLayout>
        {/* <div className="container py-3"> */}
        <div className="px-5 py-3">
          <h2 className="primary-text-color text-center mb-5">
            My Submissions
          </h2>
          <div className="bg-light p-3">
            <div className="row">
              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name-account" className="form-label">
                  Account <sup className="text-danger">*</sup>
                </label>
                <select id="input-name-account" className="form-select" onChange={(e)=>setAccount(e.target.value)}>
                  <option value={"--All--"}>All</option>
                  {/* <option value={"aaa"}>aaa</option>
                  <option value={"5 STAR MEDICAL PARTNERS"}>5 STAR MEDICAL PARTNERS</option>
                  <option value={"AC HOTEL SUNNYVALE CUPERTINO"}>AC HOTEL SUNNYVALE CUPERTINO</option> */}
                  {submissions && submissions.length>0 && submissions.map((option) => (
                    <>
                    {auth.user.id===option.user_id &&
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    }
                      
                    </>
                    
                  ))}
                </select>
              </div>
              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name-submission" className="form-label">
                  Submission Status <sup className="text-danger">*</sup>
                </label>
                <select id="input-name-submission" className="form-select" onChange={(e)=>setStatus(e.target.value)}>
                  <option value="--All--">All</option>
                  <option value="0">Pending</option>
                  <option value="1">Completed</option>
                </select>
              </div>
              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name-date-from" className="form-label">
                  Date From <sup className="text-danger">*</sup>
                </label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="input-name-date-from"
                /> */}
                <DatePicker
                  selected={dateFrom}
                  onChange={handleChangeDateFrom}
                  className="form-control"
                  id="input-name-date-from"
                />
                
              </div>
              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name-date-to " className="form-label">
                  Date To <sup className="text-danger">*</sup>
                </label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="input-name-date-to"
                /> */}
                <DatePicker
                  selected={dateTo}
                  onChange={handleChangeDateTo}
                  className="form-control"
                  id="input-name-date-to"
                />
              </div>
              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name-Filter" className="form-label">
                  Filter On <sup className="text-danger">*</sup>
                </label>
                <select id="input-name-Filter" className="form-select" onChange={(e)=>setDateFilter(e.target.value)}>
                  <option value="submitted_date">Submission Date</option>
                  <option value="completed_date">Completed Date</option>
                </select>
              </div>
              <div className="col-lg-2 mb-2">
                <label htmlFor="input-name" className="form-label invisible">
                  Show Button
                </label>
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-primary" onClick={()=>onSearch()}>
                    Show
                  </button>
                  <button
                    type="button"
                    className="btn btn-light p-0 bg-transparent border-0"
                  >
                    <SiMicrosoftexcel className="text-danger fs-4" onClick={handleDownload}/>
                  </button>
                </div>
              </div>
            </div>
            <div className="py-2">
              <h5 className="primary-text-color">OR</h5>
            </div>
            <div className="row">
              <div className="col-lg-2 mb-2">
                <select id="inputState" className="form-select" onChange={(e)=>setMonthToDate(e.target.value)}>
                  
                  <option value={'1'}>Month to date</option>
                  <option  value={'2'}>Last Month</option>
                  <option value={'3'}>Year to date</option>
                </select>
              </div>

              <div className="col-lg-4 mb-2">
                <div className="d-flex flex-column flex-md-row gap-2">
                  <button type="button" className="btn btn-primary" onClick={()=>onSearchCompleted()}>
                    Show My Completed
                  </button>

                  <button type="button" className="btn btn-primary" onClick={()=>onSearchPending()}>
                    Show My Pending
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 table-responsive">
          <table className="table table-bordered">
      <thead className="table-light">
    <tr>
      <th className="text-nowrap">#</th>
      <th className="text-nowrap">Account Name</th>
      <th className="text-nowrap">Myrs Product</th>
      <th className="text-nowrap">Service Level</th>
      <th className="text-nowrap">Order Amt. ($)</th>
      <th className="text-nowrap">Submit Date</th>
      <th className="text-nowrap">Previous #14</th>
      <th className="text-nowrap">Submission Status</th>
      <th className="text-nowrap">Completed Date</th>
      <th className="text-nowrap">Charge Amt. ($)</th>
      <th className="text-nowrap">Myrs Rating</th>
      <th className="text-nowrap">View Data</th>
      <th className="text-nowrap">Get Report</th>
    </tr>
  </thead>
  <tbody>
    {submissions.length > 0 && submissions.map((data,index)=>(
       <tr>
       <td className="text-nowrap">{data.id}</td>
       <td className="text-nowrap">{data.name}</td>
       {data.myrs_product === "1" &&
               <td className="text-nowrap">Summary Credit Report</td>
       }
       {data.myrs_product === "2" &&
               <td className="text-nowrap">Summary Credit Report w/details</td>
       }
       {data.express_service === "1" &&
               <td className="text-nowrap">Instant Response (4 Office Hours)</td>
       }
       {data.express_service === "2" &&
               <td className="text-nowrap">Rapid Response (8 Office Hours)</td>
       }
       {data.express_service === "3" &&
               <td className="text-nowrap">Fast Response (12 Office Hours)</td>
       }
       {data.express_service === "4" &&
               <td className="text-nowrap">Quick Response (16 Office Hours)</td>
       }
       {data.express_service === "5" &&
               <td className="text-nowrap">Standard Response (24+/- Office Hours)</td>
       }
       <td className="text-nowrap">{data.order_amount}</td>
       <td className="text-nowrap">{new Date(data.submitted_date).getMonth()+1}/{new Date(data.submitted_date).getDate()}/{new Date(data.submitted_date).getFullYear()}</td>
       {data.chk_previous14 === 0 &&
              <td className="text-nowrap">NO</td>

       }
       {data.chk_previous14 === 1 &&
              <td className="text-nowrap">Yes</td>

       }
       {data.status === 0 &&
              <td className="text-nowrap">PENDING</td>

       }
       {data.status === 1 &&
              <td className="text-nowrap">COMPLETED</td>

       }
       {data.completed_date &&
              <td className="text-nowrap">{new Date(data.completed_date).getMonth()+1}/{new Date(data.completed_date).getDate()}/{new Date(data.completed_date).getFullYear()}</td>

       }
       <td className="text-nowrap"></td>
       <td className="text-nowrap">0</td>
       <td className="text-nowrap">xxx</td>
       <td className="text-nowrap">
         <button className="bg-transparent border-0"><FaSearch className="fs-5 text-warning" onClick={()=>handleshow(data)}/></button>
       </td>
       <td className="text-nowrap">
         <button className="bg-transparent border-0"><FaFileDownload  className="fs-5 text-info"/></button>
       </td>
     </tr>

    ))
    
    }
    {submissions.length === 0 && 
     <tr>
     <td className="text-nowrap">No Records Found</td>
   </tr>
    }
   
   
  </tbody>

  </table>
          </div>
          <div className="d-flex justify-content-end mt-4">
              <h6>Total Report Charges: $0.00</h6>
          </div>
        </div>
        </GuestLayout>
         <ToastContainer />
        {show && (
                <SlideOver title="Recommendation Submission Form" show={show} handleClose={handleClose}>
                  {child ? (
                    <RecommendationSubmission edit={0} value={child}/>
                  ) : (
                    <p>Loading...</p>
                  )}
                </SlideOver>
              )}
    </>
  );
};
