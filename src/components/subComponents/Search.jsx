import React, { useState } from "react";
import { useGlobalContext } from "../Main";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import location from "../../img/location.png";
import calendar from "../../img/calendar.png";
import person from "../../img/person.png";
import moment from "moment";

const Search = () => {
  const { data, setData, fetchLocation } = useGlobalContext();

  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({
    id: null,
    title: "",
  });

  const modalFunc = (id, desc) => {
    setShow(!show);
    if (desc === "location") {
      setModal({
        id,
        title: desc,
      });
    } else if (desc === "dates") {
      setModal({
        id,
        title: desc,
      });
    } else {
      setModal({
        id,
        title: desc,
      });
    }
  };

  const closeModal = () => setShow(false);

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

  const fetchBasedOnCriteria = (e) => {
    e.preventDefault();
    fetchLocation(
      data.location,
      data.startingDate,
      data.endingDate,
      data.room_number,
      data.adults_number,
      data.order_by
    );
  };

  return (
    <>
      <div className="container-fluid my-4">
        <h1>Where to?</h1>
        <div className="container">
          <div className="row row-gap-2">
            <div className="col col-12 col-md-4 col-lg-3">
              <button
                className="d-flex align-items-center column-gap-1 btn border-secondary"
                onClick={() => modalFunc(1, "location")}
              >
                <img src={location} className="img-fluid" alt="location" />
                <div className="container text-start">
                  <h5 className="m-0 p-0">Travel to</h5>
                  <p className="m-0 p-0">{data.location}</p>
                </div>
              </button>
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
              <button
                className="d-flex align-items-center column-gap-1 btn border-secondary"
                onClick={() => modalFunc(2, "dates")}
              >
                <img src={calendar} className="img-fluid" alt="" />
                <div className="container text-start">
                  <h5 className="m-0 p-0">Dates</h5>
                  <p className="d-flex m-0 p-0">
                    {moment(data.startingDate).format("DD MMM")} -{" "}
                    {moment(data.endingDate).format("DD MMM")}
                  </p>
                </div>
              </button>
            </div>
            <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
              <button
                className="d-flex align-items-start column-gap-1 btn border-secondary"
                onClick={() => modalFunc(3, "travellers")}
              >
                <img src={person} className="img-fluid" alt="" />
                <div className="container text-start">
                  <h5 className="m-0 p-0">Rooms</h5>
                  <p className="m-0 p-0">
                    {`${data.adults_number} ${
                      data.adults_number > 1 ? "travelers" : "traveler"
                    }, ${data.room_number} room`}
                  </p>
                </div>
              </button>
            </div>

            <Modal
              show={show}
              onHide={closeModal}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="text-black"
            >
              <Modal.Header closeButton></Modal.Header>
              {modal.id === 1 ? (
                <Modal.Body>
                  <div className="d-flex flex-nowrap">
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      onChange={handleInput}
                      value={data.location}
                    />
                  </div>
                </Modal.Body>
              ) : modal.id === 2 ? (
                <Modal.Body>
                  <div className="d-flex column-gap-2">
                    <input
                      type="date"
                      name="startingDate"
                      className="form-control"
                      onChange={handleInput}
                      value={data.startingDate}
                    />
                    <input
                      type="date"
                      name="endingDate"
                      className="form-control"
                      onChange={handleInput}
                      value={data.endingDate}
                    />
                  </div>
                </Modal.Body>
              ) : (
                <Modal.Body>
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
                </Modal.Body>
              )}
              <Modal.Footer>
                <Button
                  variant="primary"
                  style={{ width: "30%" }}
                  onClick={closeModal}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="container col col-6 col-sm-4 col-md-3 col-lg-2 ">
              <button
                className="btn btn-primary btn-lg rounded "
                onClick={fetchBasedOnCriteria}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
