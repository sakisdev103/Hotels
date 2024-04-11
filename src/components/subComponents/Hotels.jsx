import React, { useState } from "react";
import { useGlobalContext } from "../Main";
import moment from "moment";
import Alert from "./Alert";

const Hotels = () => {
  const { hotels, filterOptions, data, setData, fetchHotels } =
    useGlobalContext();

  const [showAlert, setShowAlert] = useState(false);
  const [url, setUrl] = useState();

  const filters = (e) => {
    setData({
      ...data,
      order_by: e.target.value,
    });
    fetchHotels(
      data.startingDate,
      data.endingDate,
      data.room_number,
      data.adults_number,
      e.target.value,
      data.dest_id
    );
  };

  const modalFunc = (url) => {
    setShowAlert(!showAlert);
    setUrl(url);
  };

  // console.log(moment(data.endingDate).diff(moment(data.startingDate), "days"));

  return (
    <>
      <div className="container my-4">
        {hotels.length > 0 && (
          <div className="container my-4 filter-select">
            <select className="form-select" defaultValue={data.order_by}>
              {filterOptions
                .filter((option) => {
                  return option.id !== "bayesian_review_score";
                })
                .map(({ id, name }) => {
                  return (
                    <option value={id} onClick={filters} key={id}>
                      {name}
                    </option>
                  );
                })}
            </select>
          </div>
        )}
        {hotels.length > 0 ? (
          hotels.map(
            ({
              hotel_id,
              hotel_name,
              max_photo_url,
              review_score,
              review_nr,
              default_wishlist_name,
              district,
              distance_to_cc,
              distance_to_cc_formatted,
              unit_configuration_label,
              urgency_message,
              composite_price_breakdown,
              url,
            }) => {
              return (
                <button
                  className="card mb-3 p-3 text-start"
                  style={{ width: "100%" }}
                  onClick={() => modalFunc(url)}
                  key={hotel_id}
                >
                  <div className="row g-0">
                    <div className="col-md-4 col-lg-3">
                      <img
                        src={max_photo_url}
                        alt="Hotel"
                        className="card-img-top rounded"
                        style={{ height: "21vh" }}
                      />
                    </div>
                    <div className="col-md-8 col-lg-9">
                      <div className="card-body">
                        <div className="d-flex justify-content-between column-gap-3">
                          <h5 className="card-title">{hotel_name}</h5>
                          <div className="card-text text-end">
                            <b>
                              {review_score !== null && `${review_score}/10`}
                            </b>
                            <p className="smaller-p">
                              {review_score !== null && `${review_nr} reviews`}
                            </p>
                          </div>
                        </div>
                        <div
                          className="d-flex justify-content-between"
                          style={{ fontWeight: "600" }}
                        >
                          <p className="w-50">
                            {district.length > 0
                              ? `${district}, ${default_wishlist_name}`
                              : default_wishlist_name}
                          </p>
                          <p className="smaller-p">
                            {distance_to_cc_formatted === "0"
                              ? `${distance_to_cc.slice(0, 3)} km from centre`
                              : distance_to_cc_formatted !== undefined &&
                                `${distance_to_cc_formatted} from centre`}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <p
                              className={`smaller-p ${
                                unit_configuration_label.length > 30 && `w-75`
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: unit_configuration_label,
                              }}
                            />
                            <p className="text-danger">{urgency_message}</p>
                          </div>
                          <div>
                            <p style={{ fontWeight: "700" }}>
                              {
                                composite_price_breakdown.all_inclusive_amount
                                  .amount_rounded
                              }
                            </p>
                            {/* <p className="smaller-p">
                              {moment(data.endingDate).diff(
                                moment(data.startingDate),
                                "days"
                              ) > 1
                                ? `${moment(data.endingDate).diff(
                                    moment(data.startingDate),
                                    "days"
                                  )} nights`
                                : `${moment(data.endingDate).diff(
                                    moment(data.startingDate),
                                    "days"
                                  )} night`}
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            }
          )
        ) : (
          <div className="container-fluid text-center my-5">
            <h1>Didn't find any hotels</h1>
          </div>
        )}
      </div>
      <Alert showAlert={showAlert} setShowAlert={setShowAlert} url={url} />
    </>
  );
};

export default Hotels;
