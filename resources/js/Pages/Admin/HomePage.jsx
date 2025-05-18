import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";


export default function AdminHome (props){
  
  const [activeOpen, setActiveOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  
  const data = [
    { icon: "📂", title: "Submissions", count: 0, description: "Today Submissions" },
    { icon: "🟢", title: "Active Registrations", count: 0, description: "Today Clients" },
    { icon: "🟡", title: "Pending Registrations", count: 0, description: "Pending Clients" },
  ];


  const openPending=()=>{
    setPendingOpen(true);
  }

  return (
    <>
    <AdminLayout>
      <div className="container ">
        <h2 className="primary-text-color text-center align-middle mb-2">
          Home Page
        </h2>
        <div className=" p-5 mb-5">
          <div className="row mb-5">
            
              <div className="max-w-xl mx-auto mt-10 mb-10 border rounded-lg shadow-lg overflow-hidden mb-5">

                <table className="w-full border-collapse submissions-wrapper">
                  <tbody>
                    <tr className="d-flex float-left mt-3 mb-3">
                      <span role="img" aria-label="icon"> 📂 </span>
                        <td className="submissions-container">
                          <a href="/admin-submissions">Submissions</a>
                         <span className="submissions-count">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          Today Submissions: ({props.submissions?.length}) </span>
                          <span className="submissions-count">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          
                        </td>
                      </tr>
                      <hr/>

                      <tr className="d-flex float-left mt-3 mb-3">
                      <span role="img" aria-label="icon"> 🟢 </span>
                        <td className="submissions-container">
                          <a href="/admin-client">Active Registrations</a>
                         <span className="submissions-count">&nbsp;&nbsp;
                          Today Clients: ({props.clients?.length}) </span>
                        </td>
                      </tr>
                      <hr/>


                      <tr className="d-flex float-left mt-3 mb-3">
                      <span role="img" aria-label="icon"> 🟡 </span>
                        <td className="submissions-container">
                          <a href="admin-client?date_from=14-05-2025&date_to=14-05-2025&is_act=0" 
                          // onClick={openPending}
                          >Pending Registrations</a>
                         <span 
                          className="submissions-count">
                          Pending Clients: ({props.pending?.length}) </span>
                        </td>
                      </tr>
                      <hr/>

                  </tbody>
                </table>
                {activeOpen && (
                  <div className="px-4 py-3 bg-gray-100 border-t">
                    Active Registrations Details (Expandable Section)
                  </div>
                )}
                {pendingOpen && (
                  <div className="px-4 py-3 bg-gray-100 border-t ">
                    <strong>Pending Registration List:</strong> 
                    <button onClick={() => {setPendingOpen(false)}}> X </button>
                    <div className="border p-2 mt-2">No Clients Found</div>
                  </div>
                )}
              </div>
            
  

            </div>
          </div>
        </div>
      </AdminLayout> 
    </>
  );
};
