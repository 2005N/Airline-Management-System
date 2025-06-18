import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import "./styles/AvailableFlights.css";
const initialState={
  fb_id:"",
  departure:"",
  arrival:"",
  departureDate:"",
  returnDate:"",
  class:"",
  price:"",
}
const AvailableFlights = () => {
  const [data, setData] = useState([]);

const loadData = async () => {
  try {
    const response = await Axios.get("http://localhost:5000/SearchFlights");
    
    const searchData = {
      fb_id: response.data[0].fb_id,
      departure: response.data[0].departure,
      arrival: response.data[0].arrival,
      departureDate: response.data[0].departureDate,
      returnDate: response.data[0].returnDate,
      class: response.data[0].class,
      // Clean the price: remove $ and spaces, convert to number
      price: parseInt(response.data[0].price.replace(/[$\s]/g, '')),
    };
    
    console.log('Original price from DB:', response.data[0].price);
    console.log('Cleaned price:', searchData.price);
    console.log('Search data:', searchData);

    const flightResponse = await Axios.post("http://localhost:5000/AvailableFlights", {
      departureDate: searchData.departureDate,
      returnDate: searchData.returnDate,
      fares: searchData.price, // Now this will be a clean number like 5000
    });
    
    console.log('Flight search response:', flightResponse.data);
    setData(flightResponse.data);
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
};



  useEffect(() => {
    loadData();
  }, []);
  const { id } = useParams();


  return (
    <div >
      <button
        style={{ width: "120px", marginLeft: "810px", visibility: "hidden" }}
        className="btn btn-client"
      ></button>
      <table className="styled-table">
        <thead>
          <tr >
            <th style={{ textAlign: "center" }}>Airplane ID</th>
            <th style={{ textAlign: "center" }}>Max Seats</th>
            <th style={{ textAlign: "center" }}>Departure Time</th>
            <th style={{ textAlign: "center" }}>Arrival Time</th>
            <th style={{ textAlign: "center" }}>Flight Status</th>
            <th style={{ textAlign: "center" }}>Fare</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr style={{backgroundColor:'white'}} key={index}>
                <td>{item.airplane_id}</td>
                <td>{item.max_seats}</td>
                <td>{item.departure_time}</td>
                <td>{item.arrival_time}</td>
                <td>{item.status}</td>
                <td>$ {item.fares}</td>
                <td>
                  <Link to={id>0 ? `/Invoice/${item.schedule_id+id}` :  '/CustomerSignin'}>
                    <button className={id>0 ? "btn btn-book" : "btn btn-login"}  style={{fontSize:'18px'}}>
                      {id>0 ? "Book" : "Login"}
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableFlights;