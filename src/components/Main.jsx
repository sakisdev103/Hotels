import React, { useEffect, createContext, useState, useContext } from "react";
import Search from "./subComponents/Search";
import Hotels from "./subComponents/Hotels";
import axios from "axios";
import moment from "moment";
import Loading from "./subComponents/Loading";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const API_KEY = "fdaacdf9damshfa3231c7d4ecee9p1d8dd9jsn8b65d79bc3be";
const API_HOST = "booking-com.p.rapidapi.com";

const headers = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": API_HOST,
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState();

  const [data, setData] = useState({
    location: "Athens",
    startingDate: moment().add(1, "d").format("YYYY-MM-DD"),
    endingDate: moment().add(4, "d").format("YYYY-MM-DD"),
    room_number: 1,
    adults_number: 2,
    order_by: "popularity",
  });

  const fetchLocation = async (
    location,
    checkin_date,
    checkout_date,
    room_number,
    adults_number,
    order_by
  ) => {
    const searchOptions = {
      method: "GET",
      url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
      params: {
        locale: "en-us",
        name: location,
      },
      headers: headers,
    };

    try {
      const searchResponseLocation = await axios.request(searchOptions);
      console.log(searchResponseLocation.data);
      setIsLoading(true);
      const options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v2/hotels/search",
        params: {
          units: "metric",
          room_number,
          adults_number,
          order_by,
          checkin_date: checkin_date,
          checkout_date: checkout_date,
          dest_id: searchResponseLocation.data[0].dest_id,
          dest_type: "city",
          filter_by_currency: "EUR",
          locale: "en-us",
          include_adjacency: "true",
        },
        headers: headers,
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.results);
        setHotels(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocation(
      data.location,
      data.startingDate,
      data.endingDate,
      data.room_number,
      data.adults_number,
      data.order_by
    );
  }, []);
  // if (isLoading) return <Loading />;
  return (
    <>
      <GlobalContext.Provider
        value={{
          hotels,
          setHotels,
          data,
          setData,
          fetchLocation,
        }}
      >
        <Search />
        {isLoading ? <Loading /> : <Hotels />}
      </GlobalContext.Provider>
    </>
  );
};

export default Main;
