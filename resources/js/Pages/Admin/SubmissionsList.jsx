import { FaSearch } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegFilePdf, FaRegArrowAltCircleDown , FaEdit, FaSyncAlt} from "react-icons/fa";
import { FaFileDownload,FaFileAlt  } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState,useRef, useEffect } from "react";
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
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import HistoricalGrid from "./HistoricalGrid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteComponent from "@/Components/DeleteComponent";
import { FiDownload } from 'react-icons/fi';
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";



export default function SubmissionsList  ({Submissions,Clients,Total})  {
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
  const pdfRef = useRef();
  const [pdfShow,setPdfShow] = useState(false);
  let value = {};
  const [showChargePopup, setShowChargePopup] = useState(false);
  const [chargeId,setChargeId] = useState();
  const [chargeAmt,setChargeAmt] = useState();
  const [historicalSubmissions,setHistoricalSubmissions] = useState([])
  const [child, setChild] = useState('');
  const [histValue, setHistValue] = useState('');
  const [type,setType] = useState('name');
  const [report, setReport] = useState('');
  const [useReport, setUseReport] = useState('');

  const handleChangeDateFrom = (date, event) => {
      const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
      setDateFrom(date);
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
      router.get(route('adminSubmissions'), 
        { status,dateFilter,client,date_from,date_to,serviceLevel}, 
        { preserveState: true }
      );
    }

    const handleshow = (val) =>{
      setShow(true);
      setChild(val);
    }
    const handleReportForm = (val) =>{
      if(val.completed_date){
        setShowReport(true);
      }else{
        setHistValue(val.name)
        setShowPopup(true);
        handleShowHistoricalpdf(val.name,'name');

      }
      setReport(val);
    }
    const handleClose = () => setShow(false);
    const handleCloseReport = () => setShowReport(false);

    const handleHistoricalpdf = (val) => {
      setHistoricalpdf(val);
      if(val === 2){
        setShowReport(true)
        setShowPopup(false);
        setUseReport('')
      }
      

    }
    const handleShowHistoricalpdf = async(val,type1) => {
      let date_from = dateFrom ? format(dateFrom, "dd-MM-yyyy") : null;
      let date_to = dateTo ? format(dateTo, "dd-MM-yyyy") : null;
    let type2 = type1 ? type1 : type;
    let value = val ? val : histValue; 
    try {
      const response = await axios.get(route('showHistorical'), {
        params: {
          type : type2,
          histValue : value,
          status,
          dateFilter,
          client,
          date_from,
          date_to,
          serviceLevel
        }
      });
  
      setHistoricalSubmissions(response.data.historicalSubmissions);
      // console.log('Got historical submissions:', historicalSubmissions);
      // Set state or do something with the data
  
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }

    }
    const handleDownloadAndNavigate = async (data) => {
      // Generate the PDF blob
      try {
        const blob = await pdf(<MyDocument data={data}/>).toBlob();
  
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "my-file.pdf";
        link.click();
  
        URL.revokeObjectURL(url);
  
        // console.log("✅ PDF Downloaded!");
      } catch (error) {
        console.error("❌ Failed to generate PDF", error);
      }
    };
    const beforeDownload = (data) => {
      setReport(data)
      setPdfShow(true)
      // console.log("🚀 Running before download!");
      // Example: You can do validations, API calls, loading states, etc.
    };
    
    const generatePdf = (data) => {
      setReport(data);
      setPdfShow(true);
      // setTimeout(() => {
      //   html2pdf().from(pdfRef.current).save(filename);
      // }, 1000); // Small delay to ensure state updates
    };
    useEffect(() => {
                  if (pdfShow && report) {
                      requestAnimationFrame(() => {
                          setTimeout(() => {
                              if (pdfRef.current) {
                                const filename = `${report.user.company}_${report.name}.pdf`;

                                html2pdf()
              .set({
                margin: 0.5,
                filename: filename,
                image: { type: "jpeg", quality: 0.98 },
               html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                pagebreak: { mode: ['css', 'legacy'] }
              })
              .from(pdfRef.current)
              // .save();
              .toPdf()
                .get('pdf')
                .then((pdf) => {
                  const totalPages = pdf.internal.getNumberOfPages();

                  for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    // Set low opacity
                    pdf.setGState(new pdf.GState({ opacity: 0.1 }));
                    // Set font color (optional)
                    pdf.setTextColor(0, 0, 0);
                    // Set font size
                    pdf.setFontSize(160);
                    // Draw rotated watermark text
                    pdf.text('Myrs', 70, 180, { angle: 30 });
                    // Reset opacity back to full (1)
                    pdf.setGState(new pdf.GState({ opacity: 1 }));
                  }
                  pdf.save(filename);
                });
                  }
                  setPdfShow(false);
              }, 500); // Small delay
          });
      }
  }, [pdfShow, report]); 

  
  const handleDownload = async() => {
  
    const todayDate = new Date().toISOString().split("T")[0];

      const transformedData = Submissions.map((row) => {
        let serviceLevel = "";
        switch (row.express_service) {
          case "1":
            serviceLevel = "Instant Response (4 Office Hours)";
            break;
          case "2":
            serviceLevel = "Rapid Response (8 Office Hours)";
            break;
          case "3":
            serviceLevel = "Fast Response (12 Office Hours)";
            break;
          case "4":
            serviceLevel = "Quick Response (16 Office Hours)";
            break;
          case "5":
            serviceLevel = "Standard Response (24+/- Office Hours)";
            break;
          default:
            serviceLevel = "";
        }
      
        return [
           row.user.name,
           row.user.company,
           row.user.city,
           row.user.state,
           row.submitted_date,
           row.name,
           row.phone,
           row.myrs_product === 1
             ? "Summary Credit Report"
             : "Summary Credit Report w/details",
           serviceLevel,
           row.order_amount,
           row.status === 0 ? "PENDING" : "COMPLETED",
           row.user.email,
           row.charge_amt,
           row.completed_date,
           row.myrs_rating,
           row.chk_previous14 ===0 ? "No" : "Yes",
          // row.doc_name1,
           row.comments,
        ];
      });
      
  
       // Create Workbook and Worksheet
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet("My_Submissions");
  
          // Define Headers
          const headers = [
          // "Last Submission",
            "Client Name", "Company Name", "User City", "User State", "Submission Date",
            "Account Name", "Phone","Myrs Product",
            "Service Level", "Order Amount", "Status", "Comp_Email", "Charge Amount",
            "Account_Report_Completed_Date", "Myrs Rating", "Account Is Previous 14", 
            // "Account_Document_Name",
             "Comments"
           ];
                       
           worksheet.addRow(headers); // Add header row
                 
           // Add Data Rows
          transformedData.forEach(row => worksheet.addRow(row));
                   
          // Apply Header Styling
          const headerRow = worksheet.getRow(1);
           headerRow.eachCell((cell) => {
             cell.font = { bold: true, color: { argb: "FFFFFF" } }; // White text
             cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4F81BD" } }; // Blue background
             cell.alignment = { horizontal: "center", vertical: "middle" };
             cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
           });
                   
                       // Apply Borders to Data Cells
             worksheet.eachRow((row, rowNumber) => {
               if (rowNumber !== 1) {
                  row.eachCell((cell) => {
             // cell.alignment = { horizontal: "center", vertical: "middle" };
                 cell.border = {
                    top: { style: "thin" }, left: { style: "thin" },
                    bottom: { style: "thin" }, right: { style: "thin" }
                    };
                   });
               }
            });
                   
             // Adjust Column Widths
             worksheet.columns.forEach(column => {
              column.width = 20;
                 });
                   
                       // Generate & Download Excel File
             const buffer = await workbook.xlsx.writeBuffer();
             const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
             saveAs(blob, `SubmissionList_${todayDate}.xlsx`);
             }



    const handleHistValue = (e) =>{
      if(e.target.value === '1'){
        setHistValue(report.name)
        setType('name');

      }else{
        setHistValue(report.phone)
        setType('phone');

      }
    }
    const [id,setId] = useState("");

    const [deleteModal, setDeleteModal] = useState({
      show: false,
      title: "",
      message: "",
      confirmation: ""
    });
    const [openDelete, setDeleteItem] = useState(false);
    const [message,setMessage] = useState("");

    const showDeleteModal = () => {
      setDeleteItem(true)
    }
  
    function onClose (){
    setDeleteItem(false)
   }
   const deleteSubmission = () => {
      
      router.post('/deleteSubmission', { id }, {
        headers: { Accept: 'application/json' },

        onSuccess: (response) => {
          // You can store the response here
         toast.success("Submission deleted successfully", {
                     position: 'top-right', // Position of the toast
                     autoClose: 3000, // Duration in ms before it disappears
                     hideProgressBar: false, // Show progress bar
                     closeOnClick: true, // Close on click
                     pauseOnHover: true, // Pause on hover
                 }); 
          
        },
        onError: (errors) => {
          alert('Submission failed!');
        },
      });

   }
    const onDelete = (submission) => {
      setDeleteItem(true);
      setId(submission.id);
      setMessage(
        <>
          Are you sure you want to delete <b>{submission.name}</b> ?
        </>
      );
      
    }

    const handleChargeAmount = (data) =>{
      setShowChargePopup(true);
      setChargeId(data.id);
      setChargeAmt(data.charge_amt);

    }

    const handleChargeAmountUpdate = async() =>{
      let data = {
        id: chargeId,
        charge_amt:chargeAmt
      }
      await router.post('/charge-update', { data}, {
        onSuccess: (resp) =>{
          toast.success("Charge amount updated successfully", {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        }); 
        setShowChargePopup(false);
        },
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
    }

    const handleDownloadPrevious = (filename) => {
      window.open(`/download-previous?fname=${filename}`, "_blank");
    };
  
    const handleUseReport = (reportval) =>{
      console.log(reportval)
      setUseReport(reportval);
      setShowReport(true)
      setShowPopup(false);
    }

  return (
    <>
    <AdminLayout>
      <div className="mx-5 ">
        <h2 className="primary-text-color text-center mb-5">
          Submission List
        </h2>
        <div className="bg-lightgray p-3">
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
                        <option key={index} value={item.id}>{item.company}</option>
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
          
              <DatePicker
                selected={dateFrom}
                onChange={handleChangeDateFrom}
                className="form-control "
                id="input-name-date-from"
              />
              
            </div>
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-date-to " className="form-label">
                Date To <sup className="text-danger">*</sup>
              </label>&nbsp; &nbsp;&nbsp;
              
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
            <div className=" pt-2 d-flex justify-content-end">
              <button type="button" className="btn btn-primary" onClick={()=>onSearch()}>
                Show
              </button>
              <button
                type="button"
                
                className="btn btn-light pf-2 bg-transparent border-0"
              >
                <SiMicrosoftexcel className="text-danger fs-4" onClick={handleDownload}/>
              </button>
            </div>
          </div>
          
        </div>

        <div className="mt-4 table-responsive" style={tableHeight}>
          <table className="table table-bordered">
            <thead className="table-secondary position-sticky top-1">
              <tr>
                <th className="text-center align-middle">#</th>  
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
                {Submissions && Submissions.length > 0 ? (
                  [...Submissions]
                    .sort((a, b) => new Date(b.submitted_date) - new Date(a.submitted_date)) // Sorting by submitted date (newest first)
                    .map((data, index) => (
                      <tr key={data.id || index}>
                        <td className="text-center align-middle">{index + 1}</td>
                        <td className="text-start align-middle">{data.user?.company}</td>
                        <td className="text-start align-middle">{data.name}</td>
                        
                        <td className="text-center align-middle">
                          {data.myrs_product === "1"
                            ? "Summary Credit Report"
                            : data.myrs_product === "2"
                            ? "Summary Credit Report w/details"
                            : ""}
                        </td>

                        <td className="text-center align-middle">
                          {data.express_service === "1"
                            ? "Instant Response (4 Office Hours)"
                            : data.express_service === "2"
                            ? "Rapid Response (8 Office Hours)"
                            : data.express_service === "3"
                            ? "Fast Response (12 Office Hours)"
                            : data.express_service === "4"
                            ? "Quick Response (16 Office Hours)"
                            : data.express_service === "5"
                            ? "Standard Response (24+/- Office Hours)"
                            : ""}
                        </td>

                        <td className="text-center align-middle">{parseFloat(data.order_amount)}</td>
                        <td className="text-nowrap text-center align-middle">{new Date(data.submitted_date).getMonth()+1}/{new Date(data.submitted_date).getDate()}/{new Date(data.submitted_date).getFullYear()}</td>


                         {data.chk_previous14 === 0 &&
                                      <td className="text-nowrap text-center align-middle">NO</td>
                        
                               }
                               {data.chk_previous14 === 1 &&
                                      <td className="text-wrap d-flex justify-content-center w-full align-middle"><span>Yes</span>
                                      <div className="mx-2">
                                      <button
                                        onClick={() => handleDownloadPrevious(data.doc_name1)}
                                        className="flex items-center gap-2 text-blue-600 hover:underline"
                                      >
                                        <FiDownload />
                                      </button>
                                      </div>
                                      </td>
                                     
                                      
                        
                               }

                        <td className="text-center align-middle">
                          {data.status === 1 ? "COMPLETED" : "PENDING"}
                        </td>

                        <td className="text-center align-middle">
                          {data.completed_date
                            ? new Date(data.completed_date).toLocaleDateString()
                            : ""}
                        </td>

                        <td className="text-center align-middle">{data.charge_amt ? parseFloat(data.charge_amt) : ""}
                        {data.completed_date && (
                          <>&nbsp;
                            <button className="bg-transparent border-0" onClick={() => handleChargeAmount(data)}>
                              <FaSyncAlt size={20} color="green" />
                            </button>
                            </>
                          )}
                        </td>
                        <td className="text-center align-middle">{data.myrs_rating}</td>
                        <td className="text-center align-middle">{data.comments?.length > 0 ? "Yes" : "No"}</td>

                        <td className="text-center align-middle">
                          <button className="bg-transparent border-0">
                            <FaSearch className="fs-5 text-warning" onClick={() => handleshow(data)} />
                          </button>
                        </td>

                        <td className="text-center align-middle">
                          <button className="bg-transparent border-0" onClick={() => handleReportForm(data)}>
                            {data.completed_date ?(
                              <FaFileDownload className="fs-5 text-info"  />

                            ):(
                              <FaFileAlt size={20} color="gray" title="View File" />

                            )}
                          </button>
                        </td>

                        <td className="text-center align-middle">
                          {data.completed_date && (
                            <button className="bg-transparent border-0 " onClick={() => generatePdf(data)}>
                              <FaRegArrowAltCircleDown className="fs-5 text-success" />
                            </button>
                          )}
                        </td>

                        <td className="text-center">
                          <button className="bg-transparent border-0" disabled={!!data.completed_date} onClick={()=>onDelete(data)}>
                            <MdOutlineDeleteForever
                              className={`fs-4 ${data.completed_date ? "" : "text-danger"}`}
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="17" className="text-nowrap text-center">No Submission Found</td>
                  </tr>
                )}
              </tbody>

          </table>
        </div>
        <div className="d-flex justify-content-end mt-4">
          {Total > 0 ? (
            <h6>Total Report Charges: $ {Total?.toFixed(0)}</h6>
          ):(
            <h6>Total Report Charges: $ 0</h6>
          )}
          
        </div>
      </div>
      </AdminLayout>
       {show && (
          <SlideOver title="Recommendation Submission Form" show={show} handleClose={handleClose}>
            {child ? (
              <RecommendationSubmission edit={0} value={child} handleClose={handleClose} toast={toast}/>
            ) : (
              <p>Loading...</p>
            )}
            
          </SlideOver>
        )}
        {showReport && (
          <SlideOver title="Myrs Credit Report" show={showReport} handleClose={handleCloseReport}>
            {report ? (
              <ReportForm  edit={0}  value={report} historicalpdf={historicalpdf} ispdf={0} handleClose={handleCloseReport} toast={toast} useReport={useReport}/>
            ) : (
              <p>Loading...</p>
            )}
          </SlideOver>
        )}
        
        {showPopup && (
          // <HistoricalGrid showPopup={showPopup} setShowPopup={setShowPopup} report={report} type={type} histValue={histValue} handleShowHistoricalpdf={handleHistoricalpdf} setHistValue={setHistValue}/>
        
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
                
                <select className="form-select w-50" onChange={(e)=>handleHistValue(e)}>
                  <option value={1}>Account Name</option>
                  <option value={2}>Account Phone</option>
                </select>
                <input type="text" value={histValue} className="form-control w-75 ms-2" onChange={(e)=>setHistValue(e.target.value)}/>
              </div>
              <div className=" mb-3 col-md-6 mt-3">
              <button className="btn btn-outline-primary me-2" onClick={() => handleShowHistoricalpdf()}>Show Historical Pdf</button>
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
                <thead className="table-secondary">
                  <tr>
                    <th className="text-center align-middle"> # </th>  
                    <th className="text-center align-middle"> Client </th>
                    <th className="text-center align-middle"> Account Name </th>
                    <th className="text-center align-middle">Account Info</th>
                    <th className="text-center align-middle">Myrs Product</th>
                    <th className="text-center align-middle">Order Amt $</th>
                    <th className="text-center align-middle">Submission Date</th>
                    <th className="text-center align-middle">Completed Date</th>
                    <th className="text-center align-middle">Myrs Rating</th>
                    <th className="text-center align-middle">Download Report to View</th>
                    <th className="text-center align-middle">Use Report</th>
                  </tr>
                </thead>
                <tbody>
                {historicalSubmissions && historicalSubmissions.length > 0 ? (
                      historicalSubmissions.map((hist, index) => (
                        <tr key={hist.id ?? index}>
                          <td className="text-start align-middle">{index + 1}</td>
                          <td className="text-start align-middle">{hist.user?.company}</td>
                          <td className="text-start align-middle">{hist.name}</td>
                          <td className="text-start align-middle">{hist.name}, {hist.address1}</td>
                          <td className="text-start align-middle">
                            {{
                              "1": "Summary Credit Report",
                              "2": "Summary Credit Report w/details"
                            }[hist.myrs_product] || ""}
                          </td>
                          <td className="text-center align-middle">
                            {/* {hist.order_amount} */}
                            {parseFloat(hist.order_amount)}
                          </td>
                          <td className="text-center align-middle">{new Date(hist.submitted_date).getMonth()+1}/{new Date(hist.submitted_date).getDate()}/{new Date(hist.submitted_date).getFullYear()}</td>
                          <td className="text-center align-middle">{new Date(hist.completed_date).getMonth()+1}/{new Date(hist.completed_date).getDate()}/{new Date(hist.completed_date).getFullYear()}</td>

                          <td className="text-center align-middle">{hist.myrs_rating}</td>
                          <td className="text-center align-middle">
                            <button className="bg-transparent border-0" onClick={() => generatePdf(hist)}>
                              <FaRegArrowAltCircleDown className="fs-5 text-success" />
                            </button>
                          </td>
                          <td className="text-center align-middle">
                          <button className="bg-transparent border-0" onClick={() => handleUseReport(hist)}>
                          <FaFileAlt size={20} color="gray" title="View File" />
                            </button>

                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={11} className="text-center">No data found</td>
                      </tr>
                    )}

                  
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
       

        )}
        
        {pdfShow && (
  <div style={{ display: "none" }}>
    <div
      ref={pdfRef}
      style={{
        fontSize: "10px",
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        padding: "10mm",
        boxSizing: "border-box",
      }}
    >
      {/* Watermark */}
      {/* <div className="watermark">Myrs</div> */}


      <h1
        className="text-center text-primary"
        style={{ margin: 0, padding: "10px 0", textAlign: "center" }}
      >
        Myrs Credit Report
      </h1>

      {report && (
        <ReportForm
          edit={0}
          value={report}
          historicalpdf={report?.historical_pdf}
          ispdf={1}
          handleClose={handleCloseReport}
          className="page-break"
          useReport = {useReport}

        />
      )}
    </div>
  </div>
)}


        {/* <div ref={pdfRef} style={{ padding: "20px", background: "#f0f0f0"}}>
        {report && <ReportForm  edit={0}  value={report} historicalpdf={report?.historical_pdf}/>}

      </div> */}
      {openDelete && (
                          <DeleteComponent
                            open={openDelete}
                            setDelete={setDeleteItem}                
                            cancelOnClick={onClose}
                            deleteOnClick={deleteSubmission}
                            message = {message}
                            title = {"Delete Submission"}
                            btnName = 'Yes'
                            btnNameCancel = 'No'
      
                            
                            
                          >
                      <p className="text-sm text-gray-500">{deleteModal.message}</p>
                          </DeleteComponent>
                        )}
        {showChargePopup && (
          // <HistoricalGrid showPopup={showPopup} setShowPopup={setShowPopup} report={report} type={type} histValue={histValue} handleShowHistoricalpdf={handleHistoricalpdf} setHistValue={setHistValue}/>
        
        <Modal show={showChargePopup} onHide={() => setShowChargePopup(false)} size="xl" style={{ width: '100%' }}>
              <Modal.Header closeButton className="custom-modal-header">
                <Modal.Title className="w-100 text-center">
                  <h1 className="display-5 m-0">Myrs Credit Advisors, Inc.</h1>
                </Modal.Title>
            </Modal.Header>

        <Modal.Body >
          <div className="p-2 ">
            
          <h2 className=" mb-4">Update Report Charge</h2>
              <div className="row d-flex justify-content-center mt-4 ">
                <div className="col-md-12 d-flex justify-content-center w-100">
                  
                  <label className="fw-bold text-nowrap  col-md-3">Report Charge: </label>
                  {/* <input typse="text" className="form-control w-50" /> */}
                  <input className="form-control w-25" value={parseFloat(chargeAmt)} onChange={(e)=>setChargeAmt(e.target.value)} />
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center pt-5">
                          <button 
                                type="submit" 
                                className="btn btn-primary"
                                name="updateinfo"
                                onClick={()=>handleChargeAmountUpdate()}
                              >
                                Update
                              </button>
                              <button 
                                type="submit" 
                                className="btn btn-primary ms-4"
                                name="updateinfo"
                                onClick={()=>setShowChargePopup(false)}
                              >
                                Close
                              </button>

                        </div>

              
          </div>
        </Modal.Body>
      </Modal>
       

        )}
              <ToastContainer />

    </>
  );
};
