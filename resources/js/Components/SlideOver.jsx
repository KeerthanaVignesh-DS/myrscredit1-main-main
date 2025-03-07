import { useState} from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


export default function SlideOver({title,show,handleClose,children }){

  
    return(
    <Offcanvas show={show} onHide={handleClose} placement="end" backdrop="static" 
    style={{ width: '75%' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="w-100 text-center">
            <h2 className="primary-text-color text-center">
            {title}
            </h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
        <div className="slideover-content">{children}</div>
        </Offcanvas.Body>
      </Offcanvas>
    );
}
