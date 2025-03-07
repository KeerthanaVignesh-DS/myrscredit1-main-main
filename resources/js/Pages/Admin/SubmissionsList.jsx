import { FaSearch } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegFilePdf, FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Link, router } from "@inertiajs/react";
import SlideOver from "@/Components/SlideOver";
import RecommendationSubmission from "../Recommendation Submission/RecommendationSubmission";
import ReportForm from "./ReportForm";
import { Button, Modal } from "react-bootstrap";
import GuestLayout from "@/Layouts/GuestLayout";
import { PDFDownloadLink, Document, Page, Text,pdf } from "@react-pdf/renderer";
import { MyDocument } from "./SubmissionPdf";





export default function SubmissionsList  ({Submissions,Clients})  {
  const [client,setClient] =useState();
  const [status,setStatus] = useState('--All--');
  const [dateFilter,setDateFilter] = useState();
  const [dateFrom,setDateFrom] = useState(new Date());
  const [dateTo,setDateTo] = useState(new Date());
  const [serviceLevel,setServiceLevel] =useState();
  const [show, setShow] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [historicalpdf,setHistoricalpdf] = useState(0);


  const [child, setChild] = useState('');
  const [report, setReport] = useState('');

  console.log(Submissions)

  const handleChangeDateFrom = (date, event) => {
      const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
      console.log(formattedDate);
      setDateFrom(date)
    };
    const handleChangeDateTo = (date, event) => {
      const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
      setDateTo(date)
    };
  

  const tableHeight = {
    maxHeight: "400px",
  };

  const onSearch = () =>{
      let date_from = dateFrom ? format(dateFrom, "dd-MM-yyyy") : null;
      let date_to = dateTo ? format(dateTo, "dd-MM-yyyy") : null;
      console.log("dfdf");
      router.get(route('adminSubmissions'), 
        { status,dateFilter,client,date_from,date_to,serviceLevel}, 
        { preserveState: true }
      );
    }

    const handleshow = (val) =>{
      console.log(val)
      setShow(true);
      setChild(val);
    }
    const handleReportForm = (val) =>{
      console.log(val)
      // setShowReport(true);
      setShowPopup(true);
      setReport(val);
    }
    const handleClose = () => setShow(false);
    const handleCloseReport = () => setShowReport(false);

    const handleHistoricalpdf = (val) => {
      setHistoricalpdf(val);
      if(val === 2){
        setShowReport(true)
        setShowPopup(false);
      }
      

    }
    const handleDownloadAndNavigate = async (data) => {
      // Generate the PDF blob
      console.log('cli')
      try {
        const blob = await pdf(<MyDocument data={data}/>).toBlob();
  
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "my-file.pdf";
        link.click();
  
        URL.revokeObjectURL(url);
  
        console.log("✅ PDF Downloaded!");
      } catch (error) {
        console.error("❌ Failed to generate PDF", error);
      }
  
      // Optional: Wait a bit for download to trigger
      // setTimeout(() => {
      //   navigate("/next-page");
      // }, 1000); // 1-second delay before navigating
    };


  return (
    <>
    <AdminLayout>
      <div className="mx-5 ">
        <h2 className="primary-text-color text-center mb-5">
          Submission List
        </h2>
        <div className="bg-light p-3">
          <div className="row">
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-account" className="form-label">
                Client <sup className="text-danger">*</sup>
              </label>
              <select id="input-name-account" className="form-select" onChange={(e)=>setClient(e.target.value)}>
                  <option selected="selected" value="--All--">
                      All Client
                    </option>
                    {Clients && Clients.length>0 && Clients.map((item,index)=>(
                        <option value={item.id}>{item.company}</option>
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
            <div className="col-lg-1 mb-2">
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
                className="form-control "
                id="input-name-date-from"
              />
              
            </div>
            <div className="col-lg-1 mb-2">
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
                className="form-control "
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
              <label htmlFor="input-name-Service" className="form-label">
                Level Of Service:
              </label>
              <select id="input-name-Service" className="form-select" onChange={(e)=>setServiceLevel(e.target.value)}>
                <option value={0}>All Level Service</option>
                <option value={1}>All except standard</option>
                <option value={2}>Instant</option>
                <option value={3}>Rapid</option>
                <option value={4}>Fast</option>
                <option value={5}>Quick</option>
                <option value={6}>Standard</option>
              </select>
            </div>
            <div className="col-lg-2 mb-2 mt-4 pt-2 d-flex justify-content-start">
              <button type="button" className="btn btn-primary" onClick={()=>onSearch()}>
                Show
              </button>
              <button
                type="button"
                
                className="btn btn-light pf-2 bg-transparent border-0"
              >
                <SiMicrosoftexcel className="text-danger fs-4" />
              </button>
            </div>
          </div>
          {/* <div className="row">
            <div className="d-flex gap-2 justify-content-end">
              <button type="button" className="btn btn-primary" onClick={()=>onSearch()}>
                Show
              </button>
              <button
                type="button"
                
                className="btn btn-light p-0 bg-transparent border-0"
              >
                <SiMicrosoftexcel className="text-danger fs-4" />
              </button>
            </div>
          </div> */}
        </div>

        <div className="mt-4 table-responsive" style={tableHeight}>
          <table className="table table-bordered">
            <thead className="table-light position-sticky top-0">
              <tr>
                <th className="text-nowrap">#</th>  
                <th className="text-center align-middle">Client</th>
                <th className="text-center align-middle">Account Name</th>
                <th className="text-center align-middle">Myrs Product</th>
                <th className="text-center align-middle">Service Level</th>
                <th className="text-center align-middle">Order Amt. ($)</th>
                <th className="text-center align-middle">Submit Date</th>
                <th className="text-center align-middle">Previous #14</th>
                <th className="text-center align-middle">
                  Submission
                  <br /> Status
                </th>
                <th className="text-center align-middle">Comp. Date</th>
                <th className="text-center align-middle">Charge Amt. ($)</th>
                <th className="text-center align-middle">Myrs Rating</th>
                <th className="text-center align-middle">Comment</th>
                <th className="text-center align-middle">View</th>
                <th className="text-center align-middle">PDF Form</th>
                <th className="text-center align-middle">Get Report</th>
                <th className="text-center align-middle">Delete</th>
              </tr>
            </thead>
            <tbody>
              
              {Submissions && Submissions.length > 0 ?( Submissions.map((data,index)=>(
                     <tr>
                     <td className="text-nowrap">{index+1}</td>
                     <td className="text-nowrap">{data.user.name}</td>
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
                            <td className="text-nowrap text-center">NO</td>
              
                     }
                     {data.chk_previous14 === 1 &&
                            <td className="text-nowrap text-center">Yes</td>
              
                     }
                     {data.status === 0 &&
                            <td className="text-nowrap">PENDING</td>
              
                     }
                     {data.status === 1 &&
                            <td className="text-nowrap">COMPLETED</td>
              
                     }
                     {data.completed_date ? (
                            <td className="text-nowrap">{new Date(data.completed_date).getMonth()+1}/{new Date(data.completed_date).getDate()}/{new Date(data.completed_date).getFullYear()}</td>
                     ):(
                      <td className="text-nowrap"></td>

                     )
                     }
                     <td className="text-nowrap">{data.charge_amt}</td>
                     <td className="text-nowrap">{data.myrs_rating}</td>
                     {data.comments && data.comments.length>0 ? (
                        <td className="text-nowrap text-center">Yes</td>
                     ):(
                        <td className="text-nowrap text-center">No</td>
                     )
                     }
                     
                     
                     <td className="text-nowrap">
                       <button className="bg-transparent border-0"><FaSearch className="fs-5 text-warning" onClick={()=>handleshow(data)}/></button>
                     </td>
                     <td className="text-nowrap d-flex justify-content-center">
                       <button className="bg-transparent border-0 "><FaFileDownload  className="fs-5 text-info" onClick={()=>handleReportForm(data)}/></button>
                     </td>
                     <td className="text-center">
                     {data.completed_date &&
                        // <button className="bg-transparent border-0">
                        //   <FaRegArrowAltCircleDown className="fs-5 text-success" />
                        // </button>
                        // <a href="/download-pdf" target="_blank">Download PDF</a>
                        <button onClick={()=>handleDownloadAndNavigate(data)}>Download PDF & Go</button>

                      }
                      </td>
                      <td className="text-center">
                        <button className="bg-transparent border-0">
                          <MdOutlineDeleteForever className="fs-4 text-danger" />
                        </button>
                      </td>
                   </tr>
              
                  ))
                ):(
                  <tr >
                  <td colspan="17" className="text-nowrap text-center">No Submission Found</td>
                </tr>
                )
                  }
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-4">
          <h6>Total Report Charges: $5.00</h6>
        </div>
      </div>
      </AdminLayout>
       {show && (
          <SlideOver title="Recommendation Submission Form" show={show} handleClose={handleClose}>
            {child ? (
              <RecommendationSubmission edit={0} value={child}/>
            ) : (
              <p>Loading...</p>
            )}
            
          </SlideOver>
        )}
        {showReport && (
          <SlideOver title="Myrs Credit Report" show={showReport} handleClose={handleCloseReport}>
            {report ? (
              <ReportForm  edit={0}  value={report} historicalpdf={historicalpdf}/>
            ) : (
              <p>Loading...</p>
            )}
          </SlideOver>
        )}
        
        {showPopup && (
        
        <Modal show={showPopup} onHide={() => setShowPopup(false)} size="xl" style={{ width: '100%' }}>
              <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title className="w-100 text-center">
                  <h1 className="display-5 m-0">Myrs Credit Advisors, Inc.</h1>
                </Modal.Title>
            </Modal.Header>

        <Modal.Body >
          <div className="p-2 ">
            

              <div className="row ">
                <div className="col-md-12 d-flex align-items-center">
                  
                  <label className="fw-bold text-nowrap  col-md-3">Client Name </label>
                  {/* <input typse="text" className="form-control w-50" /> */}
                  <p className=" w-50">: {report?.user.company}</p>
                </div>
              </div>

              <div className="row ">
                <div className="col-md-12 d-flex align-items-center">
                  
                  <label className="fw-bold text-nowrap  col-md-3">Account Name </label>
                  {/* <input typse="text" className="form-control w-50" /> */}
                  <p className=" w-50">: {report?.name}</p>
                </div>
              </div>


              <div className="row ">
                <div className="col-md-12 d-flex align-items-center">
                  
                  <label className="fw-bold text-nowrap  col-md-3">Account Phone # </label>
                  {/* <input typse="text" className="form-control w-50" /> */}
                  <p className=" w-50">: {report?.phone}</p>
                </div>
              </div>

              <div className="row ">
                <div className="col-md-12 d-flex align-items-center">
                  
                  <label className="fw-bold text-nowrap  col-md-3">Myrs Product </label>
                  {/* <input typse="text" className="form-control w-50" /> */}
                  <p className=" w-50">: {report?.myrs_product === "1" ? "Summary Credit Report" : "Summary Credit Report w/details"}</p>
                </div>
              </div>
      
            {/* Filter */}
            <label className="fw-bold text-nowrap me-2 mt-4">Filter on:</label>
            <div className="row mb-3 col-md-12">
              <div className="col-md-6 d-flex align-items-center">
                
                <select className="form-select w-50">
                  <option>Account Name</option>
                  <option>Account Phone</option>
                </select>
                <input type="text" className="form-control w-75 ms-2" />
              </div>
              <div className=" mb-3 col-md-6 mt-3">
              <button className="btn btn-outline-primary me-2" onClick={() => handleHistoricalpdf(1)}>Show Historical Pdf</button>
              <button className="btn btn-outline-primary" onClick={() => handleHistoricalpdf(2)}>Continue Without Historical Pdf</button>
            </div>
            </div>
      
            {/* Buttons */}
           
      
            {/* Table */}
            <div className="mb-3">
              <label className="fw-bold">Historical (Completed) Submissions:</label>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>#</th>  
                    <th>Client</th>
                    <th>Account Name</th>
                    <th>Myrs Product</th>
                    <th>Service Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>usere</td>
                    <td>fname</td>
                    <td>Summary Credit Report</td>
                    <td>Summary Credit Report w/details</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
       

        )}
    </>
  );
};
