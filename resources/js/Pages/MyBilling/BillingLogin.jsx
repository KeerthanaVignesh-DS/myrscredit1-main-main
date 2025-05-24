import InnerMenu from "@/Components/InnerMenu";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from '@inertiajs/react';
import { FaRegFilePdf } from "react-icons/fa";



export default function BillingLogin({Billing}){

  const tableHeight = {
    maxHeight: "400px",
  };
  const handleDownload = (filename) => {
    window.open(`/download-pdf?fname=${filename}`, "_blank");
  };
  // console.log(Billing)
    return(
      <GuestLayout>
          
          <div className="container pb-5">
                  <h2 className="primary-text-color text-center mb-5">My Invoices, Credit Memos and Statements:</h2>
                 
          
                  <div className="mt-4 table-responsive" style={tableHeight}>
                    <table className="table table-bordered">
                      <thead className="table-secondary position-sticky top-1">
                        <tr>
                          <th className="text-center align-middle">#</th>
                          <th className="text-center align-middle">Type</th>
                          <th className="text-center align-middle">Account #</th>
                          <th className="text-center align-middle">Month</th>
                          <th className="text-center align-middle">Year</th>
                          <th className="text-center align-middle">Billing</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      {Billing && Billing.length >0 ? (
                      Billing.map((bill, index) => (
                        <tr key={bill.index}>
                          <td className="text-center">{index+1}</td>
                          <td className="text-center">{bill.pdf_type}</td>
                          <td className="text-center">{bill.invoice_number}</td>
                          <td className="text-center">{bill.month}</td>
                          
                          <td className="text-center">{bill.year}</td>
                         
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
        </GuestLayout>
    )
}