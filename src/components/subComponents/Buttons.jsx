import React from "react";
import { useGlobalContext } from "../Main";
import location from "../../img/location.png";
import calendar from "../../img/calendar.png";
import person from "../../img/person.png";
import moment from "moment";

const Buttons = ({ setModal, show, setShow }) => {
  const { data, fetchHotels } = useGlobalContext();

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
  const fetchBasedOnCriteria = (e) => {
    e.preventDefault();
    fetchHotels(
      data.startingDate,
      data.endingDate,
      data.room_number,
      data.adults_number,
      data.order_by,
      data.dest_id
    );
  };
  return (
    <>
      <div className="row row-gap-2">
        <div className="container col col-12 col-lg-10">
          <div className="row row-gap-2">
            <div className="col col-12 col-sm-4">
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
            <div className="col col-12 col-sm-4">
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
            <div className="col col-12 col-sm-4">
              <button
                className="d-flex align-items-center column-gap-1 btn border-secondary"
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
          </div>
        </div>
        <div className="container col col-6 col-sm-4 col-md-3 col-lg-2">
          <button
            className="btn btn-primary btn-lg rounded-pill mt-2"
            onClick={fetchBasedOnCriteria}
          >
            Search
          </button>
        </div>

        {/* <div className="col col-12 col-md-4 col-lg-3">
        </div>
        <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
        </div>
        <div className="col col-12 col-sm-6 col-md-4 col-lg-3">
        </div>

        <div className="container col col-6 col-sm-4 col-md-3 col-lg-2 ">
          
        </div> */}
      </div>
    </>
  );
};

export default Buttons;
