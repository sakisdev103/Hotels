import React from "react";
import { useGlobalContext } from "../Main";

const Hotels = () => {
  const { hotels } = useGlobalContext();

  return (
    <>
      <div className="container-fluid my-4">
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
