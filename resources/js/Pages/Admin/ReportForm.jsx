import GuestLayout from "@/Layouts/GuestLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { router } from "@inertiajs/react";
import { Textarea } from "@headlessui/react";
import { FaSortAmountDown } from "react-icons/fa";


export default function ReportForm (props){
  
   const full_address = props.edit === 0 ? `${props.value.name}
${props.value.address1}
${props.value.city}, ${props.value.state}, ${props.value.zip}, ${props.value.country}
${props.value.phone}` : "";


  const initialValues = {
    id                      : props.edit === 0 ? props.value.id : "",
    order_amount            : props.edit === 0 ? props.value.order_amount : "",
    completed_date          : props.edit === 0 ? new Date(props.value.submitted_date)?.toISOString().split('T')[0] : "",
    charge_amt              : props.edit === 0 ? props.value.charge_amt : "",
    company                 : props.edit === 0 ? props.value.user?.company : "",
    name                    : props.edit === 0 ? props.value.name : "",
    myrs_product            : props.edit === 0 ? props.value.myrs_product : "",
    express_service         : props.edit === 0 ? props.value.express_service : "",
    full_address            : full_address,
    secondary_phone         : props.edit === 0 ? props.value.secondary_phone : "",
    additional_address      : props.edit === 0 ? props.value.additional_address : "",
    web                     : props.edit === 0 ? props.value.web : "",
    myrs_rating             : props.edit === 0 ? props.value.myrs_rating : "",
    account_status          : props.edit === 0 ? props.value.account_status?.toString() : "",
    no_of_records           : props.edit === 0 ? props.value.no_of_records : "",
    no_of_payment_records   : props.edit === 0 ? props.value.no_of_payment_records : "",
    recent_inquiries1       : props.edit === 0 ? props.value.recent_inquiries1 : "",
    recent_inquiries2       : props.edit === 0 ? props.value.recent_inquiries2 : "", 
    submit_type             : props.edit === 0 ? props.value.submit_type : "",
    amount                  : props.edit === 0 ? props.value.amount : "", 
    myrs_rating1             : props.edit === 0 ? props.value.myrs_rating : "",
    historical_pdf          : props.historicalpdf
    }

    
    const schema = Yup.object().shape({
            order_amount        : Yup.number().required("Enter Order Amount"),
            completed_date      : Yup.string().required("Enter completed date"),
            charge_amt          : Yup.number().required("Enter Charge Amount"),
            name                : Yup.string().required("Enter name"),
            // client              : Yup.string().required("Enter client name"),
            myrs_rating         : Yup.string().required("Enter rating"),
            amount              : Yup.string().required("Enter Amount"),
          })

  const { register,post, handleSubmit, reset, formState: {errors,isValid},getValues,setError,setValue } = useForm({
    defaultValues: { ...initialValues },
    resolver: yupResolver(schema),
    mode: "all",
  });


  const resetForm = () => {
    resetAll();
  }

  const resetAll = () => {
    reset((form) => ({
      ...form,
      ...initialValues, nm
    })); 
      
  }

  const onSubmit = (data) =>{
    console.log(data);
    // return;
    router.post('/admin-submissions-updatepdf', data, {
        onSuccess: (response) => {
          // You can store the response here
         props.handleClose();
         props.toast.success('Report has been saved successfully and email has been sent to client', {
            position: 'top-right', // Position of the toast
            autoClose: 3000, // Duration in ms before it disappears
            hideProgressBar: false, // Show progress bar
            closeOnClick: true, // Close on click
            pauseOnHover: true, // Pause on hover
        });
        },
        onError: (errors) => {
          console.log('Form submission errors:', errors);
          
        },
      });

  }
     




  return (
    <>
      <div className="mainWrapper">
        {console.log(errors)}
     
        <div className="container py-2">          
          <div className="row px-1 justify-content-center mt-2">

            <div className="col-xl-12 mb-4"> 


             <div className="bg-light border rounded p-4 mb-2 row text-primary">

                <div className="col-4 mb-1">
                    <div className="d-flex align-items-center gap-2">
                        <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                            Submitted Amount $<sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="orderAmount"
                            name="orderAmount"
                            placeholder=""
                            autoComplete="off"
                            {...register('order_amount')}
                        />    
                    </div>
                </div>

                <div className=" col-4 mb-2">
                    <div className="d-flex align-items-center gap-2">
                            <label htmlFor="ap-Email" className="form-label mb-0 text-nowrap">
                                Date<sup className="text-danger">*</sup>
                            </label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="date" 
                                name="date"
                                placeholder=""
                                autoComplete="off"
                                {...register('completed_date')}
                            />
                    </div>
                </div>

                <div className=" col-4 mb-2">
                    <div className="d-flex align-items-center gap-2">
                            <label htmlFor="ap-Email" className="form-label mb-0 text-nowrap">
                                Report Charge $<sup className="text-danger">*</sup>
                            </label>
                            <input 
                                type="number" 
                                className="form-control" 
                                id="reportCharge" 
                                name="reportCharge"
                                placeholder=""
                                autoComplete="off"
                                {...register('charge_amt')}
                            />
                    </div>
                </div>

                <div className="col-12 mb-2">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <label className="form-label mb-0 text-nowrap">
                        Level of Service:
                        </label>
                        <div className="radio-toolbar">
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Standard" value="5" name="levelOfService" {...register('express_service')}/>
                            <label className="form-check-label fw-bold" style={{ fontSize: '14px' }} htmlFor="Standard">Standard</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Quick" value="4" name="levelOfService" {...register('express_service')}/>
                            <label className="form-check-label fw-bold" style={{ fontSize: '14px' }} htmlFor="Quick">Quick</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Fast" value="3" name="levelOfService" {...register('express_service')}/>
                            <label className="form-check-label fw-bold" style={{ fontSize: '14px' }} htmlFor="Fast">Fast</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Rapid" value="2" name="levelOfService" {...register('express_service')}/>
                            <label className="form-check-label fw-bold" style={{ fontSize: '14px' }} htmlFor="Rapid">Rapid</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Instant" value="1" name="levelOfService" {...register('express_service')}/>
                            <label className="form-check-label fw-bold" style={{ fontSize: '14px' }} htmlFor="Instant">Instant</label>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mb-2">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <label className="form-label mb-0 text-nowrap">
                        Type of Report:
                        </label>
                        <div className="radio-toolbar">
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Standard" value="1" name="typeOfReport" {...register('myrs_product')}/>
                            <label className="form-check-label fw-bold" style={{ fontSize: '14px' }} htmlFor="Standard">Summary Credit Report</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Quick" value="2" name="typeOfReport" {...register('myrs_product')}/>
                            <label className="form-check-label fw-bold" style={{ fontSize: '14px' }} htmlFor="Quick">Summary Credit Report W/Details</label>
                        </div>
                        </div>
                    </div>
                </div>

                <div className=" col-12 mb-2 d-flex justify-content-center">
                    <div className="col-8 d-flex align-items-center gap-2">
                            <label htmlFor="ap-Email" className="form-label mb-0 text-nowrap">
                                Client<sup className="text-danger">*</sup>
                            </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="client" 
                                name="client"
                                placeholder=""
                                autoComplete="off"
                                {...register('company')}
                            />
                    </div>
                </div>

             </div>


             <div className=" p-4 mb-2 row">

                <div className="col-8 mb-1">
                    <div className="d-flex align-items-center gap-2">
                        <input
                            type="text"
                            className="form-control"
                            id="orderAmount"
                            name="orderAmount"
                            placeholder=""
                            autoComplete="off"
                            {...register('name')}
                        /> 
                        <sup className="text-danger">*</sup>   
                        <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                            has received a rating of 
                        </label>
                    </div>
                </div>

                <div className=" col-4 mb-2">
                    <div className="d-flex align-items-center gap-2">
                            {/* <label htmlFor="ap-Email" className="form-label mb-0 text-nowrap">
                                Report Charge $<sup className="text-danger">*</sup>
                            </label> */}
                            <input 
                                type="text" 
                                className="form-control" 
                                id="reportCharge" 
                                name="reportCharge"
                                placeholder=""
                                autoComplete="off"
                                {...register('myrs_rating')}
                            /><sup className="text-danger">*</sup>
                    </div>
                </div>


                <div className="col-12 mb-2">
                    <div className="d-flex justify-content-center mt-2 gap-2">
                        <label className="form-label mb-0 text-nowrap">
                        for the
                        </label>
                        <div className="radio-toolbar">
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input " id="submitted" value="submitted" name="submitted" {...register('submit_type')}/>
                            <label className="form-check-label " style={{ fontSize: '14px' }} htmlFor="Standard">Submitted</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="indicated" value="indicated" name="indicated" {...register('submit_type')}/>
                            <label className="form-check-label " style={{ fontSize: '14px' }} htmlFor="Quick">Indicated</label>
                        </div>
                        </div>
                        <label htmlFor="amount" className="form-label mb-0 text-nowrap">
                                Amount $<sup className="text-danger">*</sup>
                        </label>
                            <input 
                                type="number" 
                                className="form-control w-50" 
                                id="amount" 
                                name="amount"
                                placeholder=""
                                autoComplete="off"
                                {...register('amount')}
                            />
                    </div>
                </div>

             </div>

             <div className="bg-light border rounded p-2 mb-4">
                <table className="table table-bordered text-start" >
                    <thead>
                        <tr>
                            <th colSpan="2" className="text-center text-primary fw-bold">
                                RATING LEGEND
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-primary fw-bold col-2">#10</td>
                            <td className="text-danger fw-bold">
                               Recommended for amount as  <span className="text-primary fw-bold">Submitted</span>. 
                                Expect payment within terms.
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary fw-bold">#10A</td>
                            <td className="text-danger fw-bold">
                                Recommended for amount as <span className="text-primary fw-bold">Submitted</span>, 
                                but expect payment to be <span className="text-danger fw-bold">30-60 days beyond terms</span>.
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary fw-bold">#11 $</td>
                            <td className="text-danger fw-bold">
                                Recommended for amount as <span className="text-success fw-bold">Indicated</span>. 
                                Expect payment within terms.
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary fw-bold">#11A $</td>
                            <td className="text-danger fw-bold">
                                Recommended for amount as <span className="text-success fw-bold">Indicated</span>, 
                                but expect payment to be <span className="text-danger fw-bold">30-60 days beyond terms</span>.
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary fw-bold">#13</td>
                            <td className="text-danger fw-bold">
                                Not recommended for any type of credit. Payment in advance only.
                            </td>
                        </tr>
                        <tr>
                            <td className="text-primary fw-bold">#14</td>
                            <td className="text-danger fw-bold">No recommendation at this time.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
           


            <div className="col-6 mb-5">

              <div className="bg-light border rounded p-4">
                <h3 className="primary-text-color d-flex justify-content-center mb-3">
                    Account Information
                </h3>

                    <div className="col-md-12 mb-2">
                    <textarea
                        type="description"
                        rows="6" 
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder=""
                        autoComplete="off"
                        {...register('full_address')}
                    />
                    </div>

                    <div className="col-12 mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Secondary Phone : 
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="secPhone"
                                name="secPhone"
                                placeholder=""
                                autoComplete="off"
                                {...register('secondary_phone')}
                            />    
                        </div>
                    </div>

                    <div className="col-12 mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Additional Address : 
                            </label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="addAddress"
                                name="addAddress"
                                placeholder=""
                                autoComplete="off"
                                {...register('additional_address')}
                            />    
                        </div>
                    </div>

                    <div className="col-12 mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Web : 
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="secPhone"
                                name="secPhone"
                                placeholder=""
                                autoComplete="off"
                                {...register('web')}
                            />    
                        </div>
                    </div>

              </div>
              
            </div>


            <div className="col-6 mb-4">

                <div className="bg-light border rounded p-4">
                <h3 className="primary-text-color d-flex justify-content-center mb-2">
                    Summary
                </h3>


                    <div className="col-12 mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="input-name" className=" text-nowrap form-label mb-0 ">
                               Myrs Rating : 
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="secPhone"
                                name="secPhone"
                                placeholder=""
                                autoComplete="off"
                                {...register('myrs_rating1')}
                            />    
                        </div>
                    </div>
                    
                    <div className="col-12 mb-2">
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <label className="form-label mb-0 text-nowrap">
                        Account Status:
                        </label>
                        <div className="radio-toolbar">
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Standard" value="1" name="levelOfService" {...register('account_status')}/>
                            <label className="form-check-label"  style={{ fontSize: '14px' }} htmlFor="Standard">Poor</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Quick" value="2" name="levelOfService" {...register('account_status')}/>
                            <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">Fair</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Fast" value="3" name="levelOfService" {...register('account_status')}/>
                            <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Fast">Satisfactory</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" id="Rapid" value="4" name="levelOfService" {...register('account_status')}/>
                            <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Rapid">Excellent</label>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="col-12 mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Number of Data Records : 
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="secPhone"
                                name="secPhone"
                                placeholder=""
                                autoComplete="off"
                                {...register('no_of_records')}
                            />    
                        </div>
                    </div>

                    <div className="col-12 mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Number of Payment Records : 
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="secPhone"
                                name="secPhone"
                                placeholder=""
                                autoComplete="off"
                                {...register('no_of_payment_records')}
                            />    
                        </div>
                    </div>

                    <div className="col-12 mb-1">
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Recent Inquiries : 
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="secPhone"
                                name="secPhone"
                                placeholder=""
                                autoComplete="off"
                                {...register('recent_inquiries1')}
                            />    
                        </div>
                    </div>

                    <div className="col-12 mb-0">
                        <div className="d-flex align-items-center gap-2">
                            <textarea
                                type="text"
                                rows={4}
                                className="form-control"
                                id="secPhone"
                                name="secPhone"
                                placeholder=""
                                autoComplete="off"
                                {...register('recent_inquiries2')}
                            />    
                        </div>
                    </div>

                </div>

            </div>
            {props.historicalpdf === 1 &&  
                <>
                    <div className="col-6 mb-4">

                    <div className="bg-light border rounded p-4">
                    <h3 className="primary-text-color d-flex justify-content-center mb-3">
                        Historical Payment Information
                    </h3>

                        <div className="col-12 mb-1">
                        <div classNahme="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Most Common Terms of Sale:
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">N30</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">Prepaid</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Fast" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Fast">COD</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Rapid" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Rapid">N60</label>
                            </div>
                            </div>
                        </div>
                        </div>


                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    Payments within terms : 
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    % 
                                </label>  
                            </div>
                        </div>


                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    Payments outside of terms : 
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    % 
                                </label>  
                            </div>
                        </div>

                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    90-120 Payment : 
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    % 
                                </label>  
                            </div>
                        </div>

                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    120 beyond Payment : 
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    % 
                                </label>  
                            </div>
                        </div>


                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    Average Days to Pay : 
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    % 
                                </label>  
                            </div>
                        </div>


                        <div className="col-12 mb-1">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Payment Trend:
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Improving</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">Stable</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Fast" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Fast">Declining</label>
                            </div>
                            </div>
                        </div>
                        </div>


                        <div className="col-12 mb-1">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Unpaid Debts:
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        </div>
                        

                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    High Credit Average <b> $</b> 
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />    
                            </div>
                        </div>


                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    Highest Credit of Record <b> $</b> 
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />    
                            </div>
                        </div>


                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    Date of Most Recent Payment transaction 
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />    
                            </div>
                        </div>


                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Date of Oldest Payment transaction
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />    
                            </div>
                        </div>


                        <div className="col-12 mb-1">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Unauthorized Deductions of record :
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        </div>


                        <div className="col-12 mb-1">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            COD or Prepaid Payments of Record:
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        </div>




                    </div>

                    </div>

                    <div className="col-6 mb-4">

                    <div className="bg-light border rounded p-4">
                    <h3 className="primary-text-color d-flex justify-content-center mb-3">
                        Registration Information
                    </h3>

                        <div className="col-12 mb-2">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Registered w/ Secretary of State :
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        </div>


                        <div className="col-10 mb-2">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Sec. of State Registration date : 
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                            </div>
                        </div>


                        <div className="col-12 mb-2">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Good Standing status with Sec. of State :
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="col-12 mb-2">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    If No, Why?
                                </label>
                                <textarea
                                    type="text"
                                    rows={3}
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                                
                            </div>
                        </div>

                        <div className="col-12 mb-2">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Type of Entity :
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Corporation</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">LLC</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">Sole Proprietorship</label>
                            </div>
                            </div>
                        </div>
                        </div>


                        <div className="col-10 mb-2">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Owner's Name : 
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                            </div>
                        </div>


                        <div className="col-10 mb-2">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                Officer's Name : 
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                            </div>
                        </div>


                        <div className="col-12 mb-2">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Single Location :
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        </div>
                        

                        <div className="col-10 mb-2">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    Type of Business :  
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />    
                            </div>
                        </div>


                        <div className="col-10 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-nowrap">
                                    Date Business started:  
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />    
                            </div>
                        </div>

                    </div>

                    </div>


                    <div className="col-12 mb-4">

                    <div className="bg-light border rounded p-4">
                    <h3 className="primary-text-color d-flex justify-content-center mb-3">
                        Information of Record
                    </h3>

                    <div className="col-6 mb-1">
                        
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Collection Records :
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        
                        </div>

                        
                        <div className="col-6 mb-1">
                            <div className="d-flex align-items-center gap-2">
                            <textarea
                                    type="text"
                                    rows={2}
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                            </div>
                        </div>
                        <div className="col-6 mb-1">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Demand Letter Records :
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-6 mb-1">
                            <div className="d-flex align-items-center gap-2">
                            <textarea
                                    type="text"
                                    rows={2}
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                            </div>
                        </div>
                        <div className="col-6 mb-1">
                        <div className="d-flex justify-contentalign-items-center gap-3">
                            <label className="form-label mb-0 text-nowrap">
                            Public Records :
                            </label>
                            <div className="radio-toolbar">
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Standard" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Standard">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" className="form-check-input" id="Quick" name="levelOfService" />
                                <label className="form-check-label" style={{ fontSize: '14px' }} htmlFor="Quick">No</label>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-6 mb-1">
                            <div className="d-flex align-items-center gap-2">
                            <textarea
                                    type="text"
                                    rows={2}
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                            </div>
                        </div>
                    </div>

                    </div>

                    <div className="col-6 mb-4">

                    <div className="bg-light border rounded p-4">
                    <h3 className="primary-text-color d-flex justify-content-center mb-3">
                        Myrs Rating History
                    </h3>

                        
                        <div className="col-12 mb-1">
                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 text-success fw-bold">
                                <p> Whenever there is a change of the Myrs Rating, it is listed below. </p>
                                </label>
                            </div>
                        </div>


                        <div className="d-flex col-10 mb-1">
                            <div className="col-6  align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 ">
                                    <b>Rating Date</b> 
                                </label>
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />   
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />   
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />   
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />   
                            </div>
                            <div className="col-6  align-items-center gap-2">
                                <label htmlFor="input-name" className="form-label mb-0 mx-3 ">
                                    <b>Rating</b> 
                                </label>
                                <input
                                    type="number"
                                    className="form-control mb-2 mx-4"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />   
                                <input
                                    type="number"
                                    className="form-control mb-2 mx-4"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />   
                                <input
                                    type="number"
                                    className="form-control mb-2 mx-4"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />   
                                <input
                                    type="number"
                                    className="form-control mb-2 mx-4"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />   
                            </div>
                        </div>

                        

                        


                        



                    </div>

                    </div>

                    <div className="col-6 mb-4">

                    <div className="bg-light border rounded p-4">
                    <h3 className="primary-text-color d-flex justify-content-center mb-3">
                        Myrs Agent Notes to Client
                    </h3>

                        
                        <div className="col-12 mb-5">
                            <div className="d-flex align-items-center gap-2">
                            <textarea
                                    type="text"
                                    rows={9}
                                    className="form-control"
                                    id="secPhone"
                                    name="secPhone"
                                    placeholder=""
                                    autoComplete="off"
                                />  
                            </div>
                        </div>
                    </div>

                    </div>
                </>
            }

            


            

            <div className="bg-light border rounded p-2 mb-4">
                <table className="table table-bordered text-start" >
                    <thead>
                        <tr>
                            <th colSpan="1" className="text-center text-danger fw-bold">
                                MYRS RATING
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-danger  fw-bold col-12">
                            The information stated on this report is not all inclusive of our research and analysis. 
                            Many other attributes have been considered in assigning the Myrs Rating. We strongly recommend 
                            you use this report only when you have submitted the actual order amount or high credit amount 
                            you propose to assign to the account. The Myrs rating will advise you to grant or not to grant based 
                            on the submitted amount. If you submit a lower amount, get the Myrs rating on that lower amount, and 
                            then grant a higher amount, you are taking an undue risk.
                            </td> 
                        </tr>
                    </tbody>
                </table>
            </div>   

              <div className="bg-light border rounded p-2 mb-2">
                <table className="table table-bordered text-start" >
                    <thead>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-success  fw-bold col-6">
                            Myrs Credit Advisors, Inc.<br />
                            1319 Hickory St., Kansas City, <br />
                            Missouri 64102 
                            USA
                            </td> 
                            <td className="text-success  fw-bold col-6">
                            816-421-1919 <br />
                            CentralEmail@MyrsCredit.com
                            </td> 
                        </tr>
                        <tr>
                            <td colSpan={2} className="text-success  fw-bold col-12">
                            Credit & Collection Services for the housewares, home furnishings, 
                            jewelry, gift, lighting, hardware, floral, craft, apparel, toy, stationery, 
                            specialty food, and related industries.
                            </td> 
                            
                        </tr>
                    </tbody>
                </table>
            </div>
            {console.log(props.value.account_status)            }
            {props.ispdf === 0 &&
                
                <div className="d-flex justify-content-center align-items-center pt-5">
                                
                <>
                {props.value.account_status !==2 &&
                    <>
                        {/* <button 
                            type="submit" 
                            className="btn btn-primary mx-1"
                            name="updateinfo"
                            >
                            Save As Draft
                            </button> */}
                            <button 
                            type="submit" 
                            className="btn btn-success mx-1"
                            name="updateinfo"
                            onClick={handleSubmit(onSubmit)}

                            >
                            Save
                            </button>
                    </>
                }
                

                <button 
                type="submit" 
                className="btn btn-primary mx-1"
                name="updateinfo"
                onClick={()=>props.handleClose()}
                >
                Close
                </button>
                </>
                
                </div>
            }                 
            
            


          </div>
        </div>
      </div>

    </>
  );
};
