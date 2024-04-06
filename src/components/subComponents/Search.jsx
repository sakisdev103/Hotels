import React from "react";
import { useGlobalContext } from "../Main";

const Search = () => {
  const { data, setData, fetchLocation } = useGlobalContext();

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };
  const fetchBasedOnCriteria = (e) => {
    e.preventDefault();

    fetchLocation(data.location, data.startingDate, data.endingDate);
  };

  return (
    <>
      <div className="container my-4">
        <h1>Where to?</h1>
        <form className="container" onSubmit={fetchBasedOnCriteria}>
          <div className="row row-gap-2">
            <div className="col col-12 col-sm-5 col-md-6 col-lg-5 d-flex flex-nowrap">
              <span className="input-group-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
              </span>
              <input
                type="text"
                name="location"
                className="form-control"
                onChange={handleInput}
                value={data.location}
              />
            </div>
            <div className="col col-12 col-sm-5 col-md-6 col-lg-5 d-flex column-gap-2">
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
            <div className="col col-12 col-lg-2 text-center">
              <input
                type="submit"
                className="btn btn-primary btn-lg rounded"
                value="Search"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
