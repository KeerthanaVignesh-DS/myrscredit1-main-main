import { useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import { router } from "@inertiajs/react";



export default function HistoricalGrid({historicalSubmissions,showPopup,setShowPopup,report,type,histValue,setHistValue}){
const handleShowHistoricalpdf = () => {
      router.get(route('showHistorical'), 
      { type,histValue}, 
      { preserveState: true }
    );

} 
    return(
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
            {(historicalSubmissions && historicalSubmissions.length>0) ? (
                <tr>
                <td>1</td>
                <td>usere</td>
                <td>fname</td>
                <td>Summary Credit Report</td>
                <td>Summary Credit Report w/details</td>
              </tr>
            ):(
              <tr>
                <td>No data found</td>
                </tr>
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  </Modal.Body>
</Modal>
    );
}
