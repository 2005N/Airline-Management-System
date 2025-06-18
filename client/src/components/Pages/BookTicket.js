import React, { useState, useEffect } from "react";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import "./styles/BookTicket.css";

const BookTicket = () => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    Axios.get("http://localhost:5000/SearchFlights")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch flights", err));
  }, []);

  const onSubmit = (data) => {
    console.log(data.departure);
    Axios.post("http://localhost:5000/BookTicket", {
      departure: data.departure,
      arrival: data.arrival,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      class: data.class,
      price: data.price,
    }).then((response) => {
      if (response.data.err) console.log(response.data.err);
    });
    setTimeout(() => history.push(`/AvailableFlights/${id}`), 100);
  };

  const uniqueDepartures = [...new Set(data.map(f => f.departure))];
  const uniqueArrivals = [...new Set(data.map(f => f.arrival))];

  return (
    <div className="bg-img">
    <div className="booking-container">
      <h2>Book Your Flight</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
        {/* Departure */}
        <div className="form-group">
          <label><FaPlaneDeparture /> From</label>
          <select {...register("departure", { required: true })}>
            <option value="">Select Departure</option>
            {uniqueDepartures.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
          {errors.departure && <p className="error">Departure is required</p>}
        </div>

        {/* Arrival */}
        <div className="form-group">
          <label><FaPlaneArrival /> To</label>
          <select {...register("arrival", { required: true })}>
            <option value="">Select Arrival</option>
            {uniqueArrivals.map((a, i) => (
              <option key={i} value={a}>{a}</option>
            ))}
          </select>
          {errors.arrival && <p className="error">Arrival is required</p>}
        </div>

        {/* Departure Date */}
        <div className="form-group">
          <label>Departure Date</label>
          <input type="date" {...register("departureDate", { required: true })} />
          {errors.departureDate && <p className="error">Departure date is required</p>}
        </div>

        {/* Return Date */}
        <div className="form-group">
          <label>Return Date</label>
          <input type="date" {...register("returnDate", { required: true })} />
          {errors.returnDate && <p className="error">Return date is required</p>}
        </div>

        {/* Class */}
        <div className="form-group">
          <label>Class</label>
          <select {...register("class", { required: true })}>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Max Price</label>
          <select {...register("price", { required: true })}>
            <option>$2000</option>
            <option>$3000</option>
            <option>$4000</option>
            <option>$5000</option>
            <option>$6000</option>
            <option>$7000</option>
            <option>$8000</option>
            <option>$10000</option>
          </select>
        </div>

        {/* Submit */}
        <button type="submit" value="Find flight" className="submit-btn">Search Flights</button>
      </form>
    </div>
    </div>
  );
};

export default BookTicket;
