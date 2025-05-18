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
          {/* <div className="mainWrapper">
            <div className="container py-5">
              <h2 className="primary-text-color text-center mb-2">
                 Enter Billing Password 
              </h2>
            
              <form className="row px-5 justify-content-center mt-5">
                <div className="col-12 col-lg-6 col-xl-5">
                  <div className="bg-light p-4">
                   
                    <div className="col-md-12 mb-2">
                      <label htmlFor="input-Password" className="form-label">
                        Enter Password:<sup className="text-danger">*</sup>
                      </label>
                      <input type="password" className="form-control" id="input-Password" />
                    </div>
                  
                  
                  </div>
                </div>
                
                <div className="d-flex justify-content-center align-items-center gap-2 pt-5">
                     <button type="submit" className="btn btn-primary text-uppercase">Submit</button>
                     <Link to="/login" className="btn btn-primary text-uppercase">Cancel</Link>
                </div>
              </form>
            </div>
          </div> */}
          <div className="container pb-5">
                  <h2 className="primary-text-color text-center mb-5">My Invoices, Credit Memos and Statements:</h2>
                 
          
                  <div className="mt-4 table-responsive" style={tableHeight}>
                    <table className="table table-bordered">
                      <thead className="table-light position-sticky top-0">
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