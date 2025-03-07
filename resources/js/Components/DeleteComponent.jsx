import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteComponent({ open, setDelete, deleteOnClick,message,title,btnName,btnNameCancel }){
    
console.log({deleteOnClick},"dedeeded")

  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleClose = () => {
    setShow(false);
    setDelete(false);
  };

  const handleDelete = () => {
    deleteOnClick();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title ? title : "Update Login Information"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message ? message : "Are you sure you want to update this user?"}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
        {btnNameCancel ? btnNameCancel : "Cancel"}
        </Button>
        <Button variant="secondary" onClick={handleDelete}>
        {btnName ? btnName : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};