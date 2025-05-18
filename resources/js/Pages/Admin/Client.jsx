import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaSearch, FaRegEdit } from "react-icons/fa";
import { MdOutlineCheckCircle, MdOutlineDeleteForever } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import SlideOver from "@/Components/SlideOver";
import Register from "../Auth/Register";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import DeleteComponent from "@/Components/DeleteComponent";


export default function ActiveClient (props){
  
  const todayDate = new Date().toISOString().split("T")[0];
  const [dateFrom, setDateFrom] = useState(todayDate);
  const [dateTo, setDateTo] = useState(todayDate);
  const [showAllActive, setShowAllActive] = useState(false);
  const [showAllInactive, setShowAllInactive] = useState(false); 
  const [users,setUsers] = useState(props.users);
  const [is_active,setIsActive] = useState("");
  const [makeActive,setMakeActive] = useState("")
  const [id,setId] = useState("");
  const [message,setMessage] = useState("");
  const [makeToast,setMakeToast] = useState(false);

   useEffect(() => {
    if (!makeToast) return; // Prevent unnecessary execution

    toast.success("Client updated successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    // Reset makeToast if it's a state
    setMakeToast(false);
   }, [makeToast,setMakeToast]);

  const tableHeight = {
    maxHeight: "400px",
  };

  const handleToggleCheck = (val) => {
    setIsActive(val)
    if (val === '1') setShowAllInactive(false);
    if (val === '0') setShowAllActive(false);
  };


  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleshow1 = (val) =>{
    setShow(true);
    setEditUser(val);
  }

  const toSearch = () =>{
    let is_act = '';
    if(showAllActive || showAllInactive){
      is_act = is_active;
    }
    let date_from = dateFrom ? format(dateFrom, "dd-MM-yyyy") : null;
    let date_to = dateTo ? format(dateTo, "dd-MM-yyyy") : null;
    router.get('admin-client', { is_act,date_from,date_to }, {
      preserveState: true, // Preserve component state
      preserveScroll: true, // Prevent scroll reset
      onSuccess: (res) => {
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

  const handleChangeDateFrom = (date, event) => {
      const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
      setDateFrom(date)
    };

     const handleChangeDateTo = (date, event) => {
        const formattedDate = date ? format(date, "dd-MM-yyyy") : null;
        setDateTo(date)
      };

      const handleDownload = async () => {
        const todayDate = new Date().toISOString().split("T")[0];
    
        // Transform Data
        const transformedData = props.users.map((row) => [
            // row.last_submission,
            row.name,
            row.company,
            row.email,
            row.address1,
            row.city,
            row.state,
            row.phone,
            new Date(row.created_at).toLocaleString("en-US", { 
              month: "numeric", 
              day: "numeric", 
              year: "numeric", 
              hour: "numeric", 
              minute: "numeric", 
              second: "numeric", 
              hour12: true 
          }), // Proper Date Format
            row.username,
            row.show_password,
            row.account_number
        ]);
    
        // Create Workbook and Worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Client List");
    
        // Define Headers
        const headers = [
            // "Last Submission",
             "User", "Client Name", "Email Address", "Address",
            "User City", "User State", "Contact", "Registration Date",
            "User Name", "Password", "Account Number"
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
        saveAs(blob, `ClientList_${todayDate}.xlsx`);
    };
    
      
        const [deleteModal, setDeleteModal] = useState({
          show: false,
          title: "",
          message: "",
          confirmation: ""
        });
        const [openDelete, setDeleteItem] = useState(false);
      
        const showDeleteModal = () => {
          setDeleteItem(true)
        }
      
        function onClose (){
        setDeleteItem(false)
       }
       const makeActiveInactive = (user) => {
          let obj = {
            id:id,
            is_active:makeActive
          }
          router.post('/makeActive', { data: obj }, {
            onSuccess: (response) => {
              // You can store the response here
             toast.success(response.props.message, {
                         position: 'top-right', // Position of the toast
                         autoClose: 3000, // Duration in ms before it disappears
                         hideProgressBar: false, // Show progress bar
                         closeOnClick: true, // Close on click
                         pauseOnHover: true, // Pause on hover
                     }); 
              toSearch();
              
            },
            onError: (errors) => {
              alert('Submission failed!');
            },
          });

       }
       const activeFunction = (user) => {
        setDeleteItem(true);
        setId(user.id);
        if(user.is_active===1){
          setMakeActive(0);
          setMessage(
            <>
              Are you sure you want to make this client <b>{user.company}</b> Inactive?
            </>
          );
         }else{
          setMakeActive(1);
          setMessage(
            <>
              Are you sure you want to make this client <b>{user.company}</b> Active?
            </>
          );

        }
        
      }
      
  


  return (
    <>
    <AdminLayout>
      <div className="container ">
        <h2 className="primary-text-color text-center align-middle mb-2">
          Client List
        </h2>
        <div className="bg-lightgray p-3">
          <div className="row">

            <div className="col-lg-2 mb-2">
              <label htmlFor="input-registration-date" className="form-label">
                Registration Date From: <sup className="text-danger">*</sup>
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

            <div className="col-lg-3 mb-2">
              <div className="form-check pt-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="allActive"
                  name="allActive"
                  checked={showAllActive}
                  onChange={() => {
                    setShowAllActive(!showAllActive);
                    handleToggleCheck('1');
                  }}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Show all active clients for all dates
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="allActive"
                  name="allActive"
                  checked={showAllInactive}
                  onChange={() => {
                    setShowAllInactive(!showAllInactive);
                    handleToggleCheck('0');
                  }}
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  Show all inactive clients for all dates
                </label>
              </div>

            </div>
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name" className="form-label invisible">
                Show Button
              </label>
              <div className="d-flex gap-2">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={()=>toSearch()}
                >
                  Show
                </button>
                <button
                  type="button"
                  className="btn btn-light p-0 bg-transparent border-0"
                >
                  <SiMicrosoftexcel className="text-success fs-4" onClick={handleDownload}/>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 table-responsive mb-5" style={tableHeight}>
          <table className="table table-bordered mb-5">
            <thead className="table-secondary position-sticky top-1 ">
              <tr>
                <th className="text-center align-middle">#</th>
                <th className="text-center align-middle">Client</th>
                <th className="text-center align-middle">
                  Account <br />
                  Number
                </th>
                <th className="text-center align-middle">User</th>
                <th className="text-center align-middle">Email</th>
                <th className="text-center align-middle">City</th>
                <th className="text-center align-middle">State</th>
                <th className="text-center align-middle">
                  Last Submit <br />
                  Date
                </th>
                
                <th className="text-center align-middle">
                  Client <br />
                  Info
                </th>
                <th className="text-center align-middle">
                  {/* Make Active <br />
                  Inactive */}
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              
              {props.users && props.users.length >0 ? (props.users.map((user,index)=>(
                <tr key={index}>
                <td className="text-center align-middle">{index+1}</td>
                <td>{user.company}</td>
                <td className="text-center align-middle">{user.account_number}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td className="text-center align-middle">{user.state}</td>
                <td className="text-center align-middle">
                  {user.latest_submission
                    ? `${new Date(user.latest_submission.submitted_date).getMonth() + 1}/${new Date(user.latest_submission.submitted_date).getDate()}/${new Date(user.latest_submission.submitted_date).getFullYear()}`
                    : ""}
                </td>
                
                <td className="text-center">
                  <button className="bg-transparent border-0" onClick={()=>handleshow1(user)}>
                    <FaSearch className="fs-6 text-primary" />
                    
                  </button>
                </td>
                <td className="text-center">
                  {/* <button className="bg-transparent border-0"> */}
                    {user.is_active === 1 ?(
                      // <MdOutlineCheckCircle className="fs-5 text-success" />
                      <button disabled={!!(user?.is_admin === 1)}  className={user?.is_admin !== 1 ? `btntab btn-primary` : ``} onClick={()=>activeFunction(user)}>Active</button>
                    ):(
                      // <MdOutlineDeleteForever className="fs-5 text-danger" />
                      <button className="btntab btn-secondary" onClick={()=>activeFunction(user)}>Inactive</button>
                    )}
                    
                  {/* </button> */}
                </td>
              </tr>
              ))):
              (
                <tr >
                
                <td colSpan="10" className="text-center">No Data Found</td>
                  </tr>
              )
            }
              


            </tbody>
          </table>
        </div>
      </div>
      </AdminLayout>
      {/* {show && <SlideOver title="Client Information" show={show} handleClose={handleClose} editUser={editUser}/>} */}
      {show && (
        <SlideOver title="Client Information" show={show} handleClose={handleClose}>
          {editUser ? (
            <Register editUser={editUser} onClose={handleClose} edit={0} toSearch={toSearch} setMakeToast = {setMakeToast}/>
          ) : (
            <p>Loading...</p>
          )}
        </SlideOver>
      )}
      {openDelete && (
                    <DeleteComponent
                      open={openDelete}
                      setDelete={setDeleteItem}                
                      cancelOnClick={onClose}
                      deleteOnClick={makeActiveInactive}
                      message = {message}
                      title = {"Active / Inactive Client"}
                      btnName = 'Yes'
                      btnNameCancel = 'No'

                      
                      
                    >
                <p className="text-sm text-gray-500">{deleteModal.message}</p>
                    </DeleteComponent>
                  )}
                  <ToastContainer />
    </>
  );
};
