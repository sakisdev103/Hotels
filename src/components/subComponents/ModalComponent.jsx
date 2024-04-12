import React from "react";
import { useGlobalContext } from "../Main";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalComponent = ({ modalId, show, setShow }) => {
  const { data, setData, fetchHotels } = useGlobalContext();

  const closeModal = (modal_id) => {
    setShow(false);
    if (modal_id === 1) {
      setData({
        ...data,
        location:
          data.location === ""
            ? "Thessaloniki, Macedonia, Greece"
            : data.location,
        dest_id: data.location === "" ? "-829252" : data.dest_id,
        order_by: "popularity",
      });
    } else if (modal_id === 2) {
      setData({
        ...data,
        startingDate: moment().format("YYYY-MM-DD"),
        endingDate: moment().add(4, "d").format("YYYY-MM-DD"),
        order_by: "popularity",
      });
    } else {
      setData({
        ...data,
        room_number: 1,
        adults_number: 2,
        order_by: "popularity",
      });
    }
  };

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const decrease = () => {
    if (data.adults_number > 1) {
      setData({
        ...data,
        adults_number: (data.adults_number = data.adults_number - 1),
      });
    }
  };
  const increase = () => {
    if (data.adults_number < 14) {
      setData({
        ...data,
        adults_number: (data.adults_number = data.adults_number + 1),
      });
    }
  };

  const saveChanges = (modal_id) => {
    if (modal_id === 1) {
      fetchHotels(
        data.startingDate,
        data.endingDate,
        data.room_number,
        data.adults_number,
        data.order_by,
        data.dest_id
      );
    }
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={() => closeModal(modalId)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-black"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {modalId === 1 ? (
          <input
            type="text"
            name="location"
            className="form-control"
            onChange={handleInput}
            value={data.location}
          />
        ) : modalId === 2 ? (
          <div className="container d-flex justify-content-between column-gap-3">
            <div>
              <h6 className="text-center">Check-in date</h6>
              <DatePicker
                name="startingDate"
                className="form-control"
                selectsStart
                selected={data.startingDate}
                value={data.startingDate}
                onChange={(e) =>
                  setData({
                    ...data,
                    startingDate: moment(e).format("YYYY-MM-DD"),
                    endingDate: moment(e).add(1, "d").format("YYYY-MM-DD"),
                  })
                }
                minDate={moment().format("YYYY-MM-DD")}
                startDate={moment(data.startingDate).toDate()}
                disabledKeyboardNavigation
                withPortal
                onFocus={(e) => (e.target.readOnly = true)}
              />
            </div>
            <div>
              <h6 className="text-center">Check-out date</h6>
              <DatePicker
                name="endingDate"
                className="form-control"
                selectsEnd
                selected={data.endingDate}
                value={data.endingDate}
                onChange={(e) =>
                  setData({
                    ...data,
                    endingDate: moment(e).format("YYYY-MM-DD"),
                  })
                }
                minDate={moment(data.startingDate)
                  .add(1, "d")
                  .format("YYYY-MM-DD")}
                startDate={moment(data.startingDate).toDate()}
                disabledKeyboardNavigation
                withPortal
                onFocus={(e) => (e.target.readOnly = true)}
              />
            </div>
          </div>
        ) : (
          <div className="container">
            <p>{`Room ${data.room_number}`}</p>
            <div className="container d-flex align-items-center gap-2">
              <h5>Adults</h5>
              <button className="btn" onClick={decrease}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-dash-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                </svg>
              </button>
              <input
                type="text"
                name="adults_number"
                className="form-control"
                onKeyDown={(e) => e.preventDefault()}
                onChange={handleInput}
                value={data.adults_number}
              />
              <button className="btn" onClick={increase}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          style={{ width: "30%" }}
          onClick={() => saveChanges(modalId)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
