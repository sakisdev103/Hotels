import React from "react";
import { useGlobalContext } from "../Main";

const Hotels = () => {
  const { hotels, data, setData, fetchLocation } = useGlobalContext();

  const filters = (e) => {
    setData({
      ...data,
      order_by: e.target.value,
    });
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
        {hotels.length > 0 && (
          <div className="container my-4" style={{ width: "30%" }}>
            <select className="form-select" defaultValue={data.order_by}>
              <option value="popularity" onClick={filters}>
                Popularity
              </option>
              <option value="distance" onClick={filters}>
                Distance from town
              </option>
              <option value="review_score" onClick={filters}>
                Customers Reviews
              </option>
              <option value="price" onClick={filters}>
                Price
              </option>
            </select>
          </div>
        )}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-gap-3">
          {hotels.length > 0 ? (
            hotels.map(
              ({
                id,
                name,
                photoMainUrl,
                reviewScore,
                reviewScoreWord,
                reviewCount,
                wishlistName,
                priceBreakdown,
              }) => {
                return (
                  <div className="col" key={id}>
                    <div className="card">
                      <img
                        src={photoMainUrl}
                        alt="Hotel"
                        className="card-img-top rounded"
                        style={{ height: "30vh" }}
                      />
                      <div className="card-body">
                        <p className="card-text">
                          <b>{`${reviewScore}/10`}</b> {reviewScoreWord}{" "}
                          {`(${reviewCount} comments)`}
                        </p>
                        <h5 className="card-title">{name}</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <p>{wishlistName}</p>
                          <div>
                            <p
                              style={{ fontWeight: "700" }}
                            >{`Total: ${priceBreakdown.grossPrice.value.toFixed()} €`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="container-fluid text-center my-5">
              <h1>Didn't find any hotels</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hotels;
