import { FaSearch } from "react-icons/fa";
import { FaFileDownload  } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { FiDownload } from 'react-icons/fi';
import GuestLayout from "@/Layouts/GuestLayout";
import InnerMenu from "@/Components/InnerMenu";
import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import SlideOver from "@/Components/SlideOver";
import RecommendationSubmission from "../Recommendation Submission/RecommendationSubmission";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import ReportForm from "../Admin/ReportForm";
import html2pdf from "html2pdf.js";


export default function MySubmissions({submissions,auth,account_name,total}){

  const [account,setAccount] = useState('--All--');
  const [status,setStatus] = useState('--All--');
  const [dateFilter,setDateFilter] = useState();
  const [dateFrom,setDateFrom] = useState(new Date());
  const [dateTo,setDateTo] = useState(new Date());
  const [month_to_date,setMonthToDate] = useState(0);
  const [pdfShow,setPdfShow] = useState(false);
  const [report, setReport] = useState('');
    const pdfRef = useRef();
  


  const onSearch = () =>{
    let date_from = dateFrom ? format(dateFrom, "dd-MM-yyyy") : null;
    let date_to = dateTo ? format(dateTo, "dd-MM-yyyy") : null;
    let name = account;
    router.get(route('submission'), { status,dateFilter,name,date_from,date_to}, { preserveState: true });
  }
  const onSearchPending = () =>{
    router.get(route('submission'), { status1:0  }, { preserveState: true });
  }
  const onSearchCompleted = () =>{
    router.get(route('submission'), { status1:1  }, { preserveState: true });
  }
  const handleChangeDateFrom = (date, event) => {
    const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
    // console.log(formattedDate);
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
    // console.log(val)
    setShow(true);
    setChild(val);
  }
  
  // const handleDownload = () => {
  //   const transformedData = submissions.map((row) => {
  //     let serviceLevel = "";
  //     if (row.express_service === "1") {
  //       serviceLevel = "Instant Response (4 Office Hours)";
  //     } else if (row.express_service === "2") {
  //       serviceLevel = "Rapid Response (8 Office Hours)";
  //     } else if (row.express_service === "3") {
  //       serviceLevel = "Fast Response (12 Office Hours)";
  //     } else if (row.express_service === "4") {
  //       serviceLevel = "Quick Response (16 Office Hours)";
  //     } else if (row.express_service === "5") {
  //       serviceLevel = "Standard Response (24+/- Office Hours)";
  //     } else {
  //       serviceLevel = "";
  //     }
  //     return{
  //         "Contact": row.phone,
  //         "Submission Date": row.submitted_date,
  //         "Account Name": row.name,
  //         "Myrs Product": row.myrs_product === 1 ? "Summary Credit Report" : "Summary Credit Report w/details",
  //         "Service Level": serviceLevel,
  //         "Order Amount": row.order_amount,
  //         "Status": row.status === 0 ? "PENDING" : "COMPLETED",
  //         "Charge Amount": row.charge_amount,
  //         "Account Report Completed Date": row.completed_date,
  //         "Myrs Rating": row.myrs_rating,
  //         "Account Is Previous14": row.is_previous,
  //         "Account Document Name": row.document_name1,
  //         // "Account DocumentName2": row.document_name2,
  //     }
      
    
  //   });
  //   // Convert table data to worksheet
  //   const worksheet = XLSX.utils.json_to_sheet(transformedData);
  //   const range = XLSX.utils.decode_range(worksheet["!ref"]);
  //   for (let C = range.s.c; C <= range.e.c; ++C) {
  //     const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C }); // Header row (r: 0)
  //     if (!worksheet[cellAddress]) continue;
  //     worksheet[cellAddress].s = {
  //       fill: {
  //         fgColor: { rgb: "FFFF00" }, // Yellow background
  //       },
  //       font: {
  //         bold: true,
  //         color: { rgb: "000000" }, // Black text
  //       },
  //       alignment: {
  //         horizontal: "center",
  //         vertical: "center",
  //       },
  //     };
  //   }
  //   // Create a new workbook
  //   const workbook = XLSX.utils.book_new();

  //   // Append the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "FormattedData");

  //   // Generate a binary Excel file and download
  //   XLSX.writeFile(workbook, "Mysubmissionlist.xlsx");
  // };

  const handleDownload = async() => {

    const transformedData = submissions.map((row) => {
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
        row.phone,
        row.submitted_date,
        row.name,
        row.myrs_product === 1
          ? "Summary Credit Report"
          : "Summary Credit Report w/details",
        serviceLevel,
        row.order_amount,
        row.status === 0 ? "PENDING" : "COMPLETED",
        row.charge_amt,
        row.completed_date,
        row.myrs_rating,
        row.chk_previous14 ===0 ? "No" : "Yes",
        row.doc_name1,
      ];
    });
    

     // Create Workbook and Worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("My_Submissions");

        // Define Headers
        const headers = [
        // "Last Submission",
          "Contact", "Submission Date", "Account Name", "Myrs Product",
          "Service Level", "Order Amount", "Status", "Charge Amount",
          "Account Report", "Myrs Rating", "Account Is Previous 14", "Account Document Name"
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
           saveAs(blob, `MySubmissions.xlsx`);
           }


  const handleDownloadPrevious = (filename) => {
    window.open(`/download-previous?fname=${filename}`, "_blank");
  };
  // const handleCloseReport = () => setShowReport(false);


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
                                  const filename = `${auth.user.company}_${report.name}.pdf`;
  
                                  html2pdf()
                .set({
                  margin: 0,
                  filename: filename,
                  image: { type: "jpeg", quality: 0.98 },
                  html2canvas: { scale: 2 },
                  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                  pagebreak: { mode: ['css', 'legacy'] }
                })
                .from(pdfRef.current)
                .save();
                    }
                    setPdfShow(false);
                }, 500); // Small delay
          });
        }
    }, [pdfShow, report]); 

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
                  {account_name && account_name.length>0 && account_name.map((option) => (
                    <>
                    
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    
                      
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
              <div className="col-lg-2 mb-2 ">
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
                <label htmlFor="input-name-date-to " className="form-label"> &nbsp;&nbsp;&nbsp;
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
              {/* <div className="col-lg-2 mb-2">
                <select id="inputState" className="form-select" onChange={(e)=>setMonthToDate(e.target.value)}>
                  
                  <option value={'1'}>Month to date</option>
                  <option  value={'2'}>Last Month</option>
                  <option value={'3'}>Year to date</option>
                </select>
              </div> */}

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
      <th className="text-nowrap text-center">#</th>
      <th className="text-nowrap text-center">Account Name</th>
      <th className="text-nowrap text-center">Myrs Product</th>
      <th className="text-nowrap text-center">Service Level</th>
      <th className="text-nowrap text-center">Order Amt. ($)</th>
      <th className="text-nowrap text-center">Submit Date</th>
      <th className="text-nowrap text-center">Previous #14</th>
      <th className="text-nowrap text-center">Submission Status</th>
      <th className="text-nowrap text-center">Completed Date</th>
      <th className="text-nowrap text-center">Charge Amt. ($)</th>
      <th className="text-nowrap text-center">Myrs Rating</th>
      <th className="text-nowrap text-center">View Data</th>
      <th className="text-nowrap text-center">Get Report</th>
    </tr>
  </thead>
  <tbody>
    {submissions.length > 0 && submissions.map((data,index)=>(
       <tr key={index}>
       <td className="text-nowrap">{index+1}</td>
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
       <td className="text-nowrap text-center">{data.order_amount}</td>
       <td className="text-nowrap text-center">{new Date(data.submitted_date).getMonth()+1}/{new Date(data.submitted_date).getDate()}/{new Date(data.submitted_date).getFullYear()}</td>
       {data.chk_previous14 === 0 &&
              <td className="text-nowrap text-center">NO</td>

       }
       {data.chk_previous14 === 1 &&
              <td className="text-wrap d-flex justify-content-center w-full"><span>Yes</span>
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
       {data.status === 0 &&
              <td className="text-nowrap text-center">PENDING</td>

       }
       {data.status === 1 &&
              <td className="text-nowrap text-center">COMPLETED</td>

       }
       {data.completed_date ? (
              <td className="text-nowrap text-center">{new Date(data.completed_date).getMonth()+1}/{new Date(data.completed_date).getDate()}/{new Date(data.completed_date).getFullYear()}</td>
       ):(
        <td className="text-nowrap text-center"></td>

       )
       }
       <td className="text-nowrap text-center">{data.charge_amt}</td>
       <td className="text-nowrap text-center">{data.myrs_rating}</td>
       <td className="text-nowrap text-center">
         <button className="bg-transparent border-0"><FaSearch className="fs-5 text-warning" onClick={()=>handleshow(data)}/></button>
       </td>
       {data.completed_date ? (
            <td className="text-nowrap text-center">
            <button className="bg-transparent border-0" onClick={() => generatePdf(data)}><FaFileDownload  className="fs-5 text-info"/></button>
          </td>       
        ):(
        <td className="text-nowrap text-center"></td>

       )
       }
       {/* <td className="text-nowrap text-center">
         <button className="bg-transparent border-0"><FaFileDownload  className="fs-5 text-info"/></button>
       </td> */}
     </tr>

    ))
    
    }
    {submissions.length === 0 && 
     <tr>
     <td colSpan={13} className="text-nowrap text-center">No Records Found</td>
   </tr>
    }
   
   
  </tbody>

  </table>
          </div>
          <div className="d-flex justify-content-end mt-4">
          {total > 0 ? (
            <h6>Total Report Charges: ${total?.toFixed(2)}</h6>
          ):(
            <h6>Total Report Charges: $0</h6>
          )}
          
          </div>
        </div>
        </GuestLayout>
         <ToastContainer />
        {show && (
                <SlideOver title="Recommendation Submission Form" show={show} handleClose={handleClose}>
                  {child ? (
                    <RecommendationSubmission edit={0} value={child} handleClose={handleClose} toast={toast}/>
                  ) : (
                    <p>Loading...</p>
                  )}
                </SlideOver>
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
                    <div className="watermark">Myrs</div>
              
              
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
                        // handleClose={handleCloseReport}
                        className="page-break"
              
                      />
                    )}
                  </div>
                </div>
              )}
              
    </>
  );
};
