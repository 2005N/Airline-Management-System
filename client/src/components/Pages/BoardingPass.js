import React, { useState, useEffect } from "react";
import { useParams, useHistory,Link } from "react-router-dom";
import Axios from "axios";
import "./styles/BoardingPass.css";

const BoardingPass = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const history = useHistory();
    useEffect(() => {
        Axios.get(`http://localhost:5000/showPass/${id}`).then((resp) =>
        setData({ ...resp.data[0] })
        );
    }, []);
    
    return (
        <div className="boarding-container">
            <div className="boarding-pass">
            <h1><strong>Boarding Pass</strong></h1>
            <br></br>
            <p><strong>Passenger:</strong> {data.fname} {data.lname}</p>
            <p><strong>Flight No:</strong> {data.flight_no}</p>
            <p><strong>Gate:</strong> {data.gate_no}</p>
            <p><strong>Seat:</strong> {data.seat_no}</p>
            <p><strong>Departure Time:</strong> {data.departure_time}</p>
            <p><strong>Airport Code:</strong> {data.airport_code}</p>
            <br></br>
            <Link to={`/CustomerPanel/${id}`}>
                <button className="btn">Back to Main</button>
            </Link>
            </div>
        </div>
    );

};
export default BoardingPass;
