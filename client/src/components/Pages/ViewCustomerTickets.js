import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import "./styles/ViewCustomerTickets.css";

const ViewCustomerTickets = () => {
  const [tickets, setTickets] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/showPass/${id}`);
        setTickets(response.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };

    loadTickets();
  }, [id]);

  return (
    <div className="ticket-page">
      <Link to={`/CustomerPanel/${id}`}>
        <button className="back-button">Back to Main</button>
      </Link>

      <div className="ticket-list">
        {tickets.map((ticket, index) => (
          <div key={index} className="ticket-card">
            <div className="ticket-header">
              <h2>SkyHigh Airways</h2>
              <span>Flight No: {ticket.flight_no}</span>
            </div>
            <div className="ticket-body">
              <div>
                <strong>Passenger:</strong> {ticket.fname} {ticket.lname}
              </div>
              <div>
                <strong>Airport:</strong> {ticket.airport_code}
              </div>
              <div>
                <strong>Seat:</strong> {ticket.seat_no}
              </div>
              <div>
                <strong>Gate:</strong> {ticket.gate_no}
              </div>
              <div>
                <strong>Departure:</strong> {ticket.departure_time}
              </div>
            </div>
            <div className="barcode"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCustomerTickets;
