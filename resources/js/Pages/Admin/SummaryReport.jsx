import { FaSearch } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegFilePdf, FaRegArrowAltCircleDown } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import AdminLayout from "@/Layouts/AdminLayout";
import { format, sub } from "date-fns";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { router } from "@inertiajs/react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";


export default function SummaryReport  ({submissions,grandTotal,clients})  {

  const tableHeight = {
      maxHeight: "400px",
    };
    const tableRef = useRef();
    const todayDate = new Date().toISOString().split("T")[0];
    const [client,setClient] =useState();
    const [dateFrom,setDateFrom] = useState(new Date());
    const [dateTo,setDateTo] = useState(new Date());

    const handleChangeDateFrom = (date, event) => {
        const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
        setDateFrom(date)
      };
    const handleChangeDateTo = (date, event) => {
    const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
    setDateTo(date)
    };

    const onSearch = () =>{
        let date_from = dateFrom ? format(dateFrom, "dd-MM-yyyy") : null;
        let date_to = dateTo ? format(dateTo, "dd-MM-yyyy") : null;
        router.get(route('adminSummary'), 
          { client,date_from,date_to}, 
          { preserveState: true }
        );
      }
    
    const onPrint =()=>{
      const printWindow = window.open('', '_blank');
      const printContent = tableRef.current.innerHTML;
    
      printWindow.document.write(`
        <html>
          <head>
            <title>Summary Report</title>
            <style>
              body { font-family: Arial, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: center; }
              div { width: 100%; border-collapse: collapse; justify-content: flex-end !important;display: flex !important; color:blue; font-weight:700; font-size: 1.5rem}
              h2 {
            color: blue !important;
            font-size: 2rem !important;
            font-weight: 700 !important;
            text-align: center;
            margin-bottom: 1rem;
          }
              </style>
          </head>
          <body onafterprint="window.close()">
          <h2>Summary Report</h2>
            ${printContent}
            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
        </html>
      `);
    
      printWindow.document.close();
      }
   
    const handleDownload = async() => {

          const serviceLevelMap = {
            "1": "Instant Response (4 Office Hours)",
            "2": "Rapid Response (8 Office Hours)",
            "3": "Fast Response (12 Office Hours)",
            "4": "Quick Response (16 Office Hours)",
            "5": "Standard Response (24+/- Office Hours)"
        };

        const transformedData = submissions.map(row => ([
          row.completed_month_year,
          row.company,
          row.submitted_date,
          row.client_sub_total
      ]));
  
      // Define headers separately
      const headers = [
          ["Month & Year", "Client", "Account Name", "Service Level", "Myrs Product", "Company Id", "Account Submit Date", "Report Charges"]
      ];
  
      // Combine headers and data
      const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    // Define Columns
    worksheet.columns = [
      { header: "Month & Year", key: "id", width: 10 },
      { header: "Client", key: "name", width: 20 },
      { header: "Account Submit Date", key: "id", width: 10 },
      { header: "Report Charges", key: "name", width: 20 },
    ];
    // Add Data Rows
    transformedData.forEach((item) => {
      worksheet.addRow(item);
    });
    const lastRowIndex = worksheet.rowCount + 1;

  // Add Subtotal Row
  const subtotalRow = worksheet.addRow(["", "Subtotal","", grandTotal]);

  // Apply Styling for Subtotal
  subtotalRow.getCell(2).font = { bold: true };
  subtotalRow.getCell(3).font = { bold: true };

    // Apply Header Styles
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "0070C0" } };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    });

    // Apply Borders to All Data Cells
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
          };
        });
      }
    });
    const now = new Date();
    const formattedDate = now.toLocaleString("default", { day: "2-digit", month: "long", year: "numeric" }); // Example: "21 March 2025"
    const fileDate = now.toISOString().split("T")[0]; // Format: "2025-03-21"    // Generate & Download the Excel File
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `Summary Report_${fileDate}.xlsx`);
      };


  return (
    <>
    <AdminLayout>
      <div className="container ">
        <h2 className="primary-text-color text-center mb-5">
          Summary Report
        </h2>
        <div className="bg-lightgray p-3">
          <div className="row">
            
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-account" className="form-label">
                Client <sup className="text-danger">*</sup>
              </label>
              <select 
                id="input-name-account" 
                className="form-select" 
                value={client}
                onChange={(e)=>setClient(e.target.value)}
              >
                  <option  value="--All--">
                      All Clients
                    </option>
                    {clients && clients.length>0 && clients.map((item,index)=>(
                        <option key={index} value={item.id}>{item.company}</option>
                    ))}
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
              <label htmlFor="input-name-date-to" className="form-label">
                Date To <sup className="text-danger">*</sup>
              </label>
              <DatePicker
                selected={dateTo}
                onChange={handleChangeDateTo}
                className="form-control "
                id="input-name-date-to"
              />
            </div>


            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-Filter" className="form-label">
                Report Type <sup className="text-danger">*</sup>
              </label>
              <select id="input-name-Filter" className="form-select">
                <option>Summary Report</option>
                {/* <option>Detailed Report</option> */}
              </select>
            </div>


            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-Filter" className="form-label">
              </label>
              <p> </p>
              <button type="button" className="btn btn-primary" onClick={()=>onSearch()}>
                Show
              </button>
              &nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-primary" onClick={()=>onPrint()}>
                Print
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="button"
                className="btn btn-light p-0 bg-transparent border-0"
              >
                <SiMicrosoftexcel className="text-danger fs-4" onClick={handleDownload}/>
              </button>
            </div>

          </div>

        </div>
        <div ref={tableRef}>

        <div className="mt-4 table-responsive" style={tableHeight} >
          <table className="table table-bordered" >
            <thead className="table-secondary position-sticky top-1">
              <tr>
                <th className="text-center align-middle">Month</th>
                <th className="text-center align-middle">Client</th>
                <th className="text-center align-middle">Total Charge Amt. ($)</th>
              </tr>
            </thead>
            <tbody>
              
                {submissions?.length > 0 ? (
                [...submissions]
                  .sort((a, b) => a.company.localeCompare(b.company)) // Sort alphabetically
                  .map((submission, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle">{submission.completed_month_year}</td>
                      <td className="text-start px-3">{submission.company}</td>
                      <td className="text-end align-middle" >{submission.client_sub_total}</td>
                    </tr>
                  ))
              ) :
              (
                <tr>
                    <td colSpan="3" className="text-center align-middle">No submission found</td>
                    
                </tr>
              )}
               
                
                {(submissions && submissions.length>0) &&
                <tr className="subtotal-row ">
                    <td style={{ backgroundColor: "#d5ed82" }}></td>
                    <td className="text-start text-primary" style={{ backgroundColor: "#d5ed82" }}><b>Sub Total</b></td>
                    <td className="text-end align-middle text-primary" style={{ backgroundColor: "#d5ed82" }}><b>${grandTotal?.toFixed(2)}</b></td>
                </tr> 
               }
            </tbody>
          </table>
        </div>

        
        {/* <div className="d-flex justify-content-end mb-5 mt-4 text-primary">
          <h5><b>Total Report Charges: ${grandTotal?.toFixed(2)}</b></h5>

        </div> */}
        </div>
      </div>
      </AdminLayout>
    </>
  );
};
