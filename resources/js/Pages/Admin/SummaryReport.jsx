import { FaSearch } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegFilePdf, FaRegArrowAltCircleDown } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import AdminLayout from "@/Layouts/AdminLayout";

export default function SummaryReport  ()  {
  const tableHeight = {
    maxHeight: "400px",
  };


  return (
    <>
    <AdminLayout>
      <div className="container ">
        <h2 className="primary-text-color text-center mb-5">
          Summary Report
        </h2>
        <div className="bg-light p-3">
          <div className="row">
            
            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-account" className="form-label">
                Client <sup className="text-danger">*</sup>
              </label>
              <select id="input-name-account" className="form-select">
                <option>All</option>
                <option>5 STAR MEDICAL PARTNERS</option>
                <option>AC HOTEL SUNNYVALE CUPERTINO</option>
              </select>
            </div>


            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-date-from" className="form-label">
                Date From <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                id="input-name-date-from"
              />
            </div>


            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-date-to" className="form-label">
                Date To <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                id="input-name-date-to"
              />
            </div>


            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-Filter" className="form-label">
                Report Type <sup className="text-danger">*</sup>
              </label>
              <select id="input-name-Filter" className="form-select">
                <option>Summary Report</option>
                <option>Detailed Report</option>
              </select>
            </div>


            <div className="col-lg-2 mb-2">
              <label htmlFor="input-name-Filter" className="form-label">
              </label>
              <p> </p>
              <button type="button" className="btn btn-primary">
                Show
              </button>
              &nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-primary">
                Print
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="button"
                className="btn btn-light p-0 bg-transparent border-0"
              >
                <SiMicrosoftexcel className="text-danger fs-4" />
              </button>
            </div>

          </div>

        </div>

        <div className="mt-4 table-responsive" style={tableHeight}>
          <table className="table table-bordered">
            <thead className="table-light position-sticky top-0">
              <tr>
                <th className="text-center align-middle">Month</th>
                <th className="text-center align-middle">Client</th>
                <th className="text-center align-middle">Total Charge Amt. ($)</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center align-middle">Feb-2025</td>
                    <td className="text-start px-3"> DECORATING DEN INTERIORS</td>
                    <td className="text-center align-middle">195.00</td>
                </tr>
                <tr>
                    <td className="text-center align-middle">Jan-2025</td>
                    <td className="text-start px-3"> Zaarah INTERIORS</td>
                    <td className="text-center align-middle">550.00</td>
                </tr>
                <tr className="bg-color">
                    <td colSpan="2" className="text-end">Sub Total</td>
                    <td className="text-center align-middle">$745.00</td>
                </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 table-responsive" style={tableHeight}>
          <table className="table table-bordered">
            <thead className="table-light position-sticky top-0">
              <tr>
                <th className="text-center align-middle">Month</th>
                <th className="text-center align-middle">Client</th>
                <th className="text-center align-middle">Account Name</th>
                <th className="text-center align-middle">Myrs Product</th>
                <th className="text-center align-middle">Service Level</th>
                <th className="text-center align-middle">Completed Date</th>
                <th className="text-center align-middle">Total Charge Amt. ($)</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center align-middle">Feb-2025</td>
                    <td className="text-start px-3"> DECORATING DEN INTERIORS</td>
                    <td className="text-center align-middle">LA Valley College</td>
                    <td className="text-center align-middle">Summary Credit Report</td>
                    <td className="text-center align-middle">Standard Response (24+/- Office Hours)</td>
                    <td className="text-center align-middle">02-07-25</td>
                    <td className="text-center align-middle">45.00</td>
                </tr>
                <tr>
                    <td className="text-center align-middle">Feb-2025</td>
                    <td className="text-start px-3"> DECORATING DEN INTERIORS</td>
                    <td className="text-center align-middle">Hungry Buffalo</td>
                    <td className="text-center align-middle">Summary Credit Report</td>
                    <td className="text-center align-middle">Standard Response (24+/- Office Hours)</td>
                    <td className="text-center align-middle">02-07-25</td>
                    <td className="text-center align-middle">45.00</td>
                </tr>
                <tr className="bg-color">
                    <td colSpan="6" className="text-end">Client Sub Total</td>
                    <td className="text-center align-middle">$90.00</td>
                </tr>
                <tr>
                <td className="text-center align-middle">Feb-2025</td>
                    <td className="text-start px-3">Harmony Ball Company</td>
                    <td className="text-center align-middle">Wilmington Cycles LLC DBA Sea Breeze HD</td>
                    <td className="text-center align-middle">Summary Credit Report w/details</td>
                    <td className="text-center align-middle">Fast Response (12 Office Hours)</td>
                    <td className="text-center align-middle">02-08-25</td>
                    <td className="text-center align-middle">125.00</td>
                </tr>
                <tr>
                <td className="text-center align-middle">Feb-2025</td>
                    <td className="text-start px-3">Harmony Ball Company</td>
                    <td className="text-center align-middle">Happy Jack Shops, Inc</td>
                    <td className="text-center align-middle">Summary Credit Report w/details</td>
                    <td className="text-center align-middle">Fast Response (12 Office Hours)</td>
                    <td className="text-center align-middle">02-08-25</td>
                    <td className="text-center align-middle">125.00</td>
                </tr>
                <tr className="bg-color">
                    <td colSpan="6" className="text-end">Client Sub Total</td>
                    <td className="text-center align-middle">$250.00</td>
                </tr>
                <tr className="bg-color">
                    <td colSpan="6" className="text-end">Sub Total</td>
                    <td className="text-center align-middle">$340.00</td>
                </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-4">
          <h6>Total Report Charges: $55555.00</h6>
        </div>
      </div>
      </AdminLayout>
    </>
  );
};
