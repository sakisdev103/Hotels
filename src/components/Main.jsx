import React, { useEffect, createContext, useState, useContext } from "react";
import Search from "./subComponents/Search";
import Hotels from "./subComponents/Hotels";
import axios from "axios";
import moment from "moment";
import Loading from "./subComponents/Loading";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);
const API_KEY = process.env.REACT_APP_HOTEL_API_KEY;
const API_HOST = "booking-com.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": API_HOST,
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState();
  const [filterOptions, setFilterOptions] = useState();

  const [data, setData] = useState({
    location: "Thessaloniki, Macedonia, Greece",
    startingDate: moment().format("YYYY-MM-DD"),
    endingDate: moment().add(4, "d").format("YYYY-MM-DD"),
    room_number: 1,
    adults_number: 2,
    order_by: "popularity",
    dest_id: "-829252",
  });

  const fetchLocation = async (location) => {
    const searchLocationOptions = {
      method: "GET",
      url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
      params: {
        locale: "en-us",
        name: location,
      },
      headers: headers,
    };
    try {
      const searchResponseLocation = await axios.request(searchLocationOptions);
      // console.log(searchResponseLocation.data);
      setData({
        ...data,
        location: searchResponseLocation.data[0].label,
        dest_id: searchResponseLocation.data[0].dest_id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHotels = async (
    checkin_date,
    checkout_date,
    room_number,
    adults_number,
    order_by,
    dest_id
  ) => {
    setIsLoading(true);
    const searchHotelsOptions = {
      method: "GET",
      url: "https://booking-com.p.rapidapi.com/v1/hotels/search",
      params: {
        units: "metric",
        room_number,
        adults_number,
        order_by,
        checkin_date,
        checkout_date,
        dest_id,
        dest_type: "city",
        filter_by_currency: "EUR",
        locale: "en-us",
        include_adjacency: "true",
      },
      headers: headers,
    };

    try {
      const response = await axios.request(searchHotelsOptions);
      // console.log(response.data);
      setHotels(response.data.result);
      setFilterOptions(response.data.sort);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLocation(data.location);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [data.location]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          API_KEY,
          API_HOST,
          headers,
          hotels,
          setHotels,
          filterOptions,
          setFilterOptions,
          data,
          setData,
          fetchLocation,
          fetchHotels,
        }}
      >
        <Search />
        {isLoading ? <Loading /> : hotels !== undefined && <Hotels />}
      </GlobalContext.Provider>
    </>
  );
};

export default Main;
