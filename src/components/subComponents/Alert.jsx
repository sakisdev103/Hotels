import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Alert = ({ showAlert, setShowAlert, url }) => {
  const closeModal = () => setShowAlert(!showAlert);
  const redirect = () => window.location.replace(url);
  return (
    <>
      <Modal
        show={showAlert}
        onHide={closeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-black"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="container text-center">
            <h2>You will be redirected on Booking.com</h2>
            <p>Are you sure you want to leave this page?</p>
            <div className="d-flex justify-content-center gap-2">
              <Button variant="danger w-25" onClick={closeModal}>
                Stay
              </Button>
              <Button variant="primary w-25" onClick={redirect}>
                Leave
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Alert;
