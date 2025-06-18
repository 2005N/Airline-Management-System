import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import "./styles/Invoice.css";
import Swale from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Invoice = () => {
  const Swal = withReactContent(Swale);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const history = useHistory();

  const sc_id = id.slice(0, 2);
  const cl_id = id.slice(2, 4);

    useEffect(() => {
        const loadInvoiceData = async () => {
            try {
            const fareResp = await Axios.get("http://localhost:5000/invoicefares");
            const fareData = fareResp.data[0];
            console.log(fareResp.data[0]);
            setUser(fareData);

            // Update booking with id + price
            await Axios.post("http://localhost:5000/UpdateFlightBooking", {
                id: sc_id,
                price: fareData.price
            });

            const clientResp = await Axios.get(`http://localhost:5000/invoice/${cl_id}`);
            setData(clientResp.data[0]);
            } catch (err) {
            console.error("Error loading data:", err);
            }
        };

        loadInvoiceData();
    }, [sc_id, cl_id]);



  const foo = async () => {
    const cityToCode = {
      Delhi: "DEL",
      Mumbai: "BOM",
      Bangalore: "BLR",
      Kolkata: "KOL", //add others later
    };

    const airport_code = cityToCode[user?.departure] || user?.departure;

    await Axios.post("http://localhost:5000/invoiceconfirm", {
      client_id: cl_id,
      schedule_id: sc_id,
      airport_code: airport_code,
    });

    Swal.fire("Ticket Booked Successfully!", "", "success");
    setTimeout(() => history.push(`/BoardingPass/${cl_id}`), 500);
  };
  return (
    <div className="invoice-background">
        <div className="invoice-card">
        <h2>Flight Invoice</h2>
        <div className="invoice-details">
            <p><strong>Name:</strong> {data.fname} {data.lname}</p>
            <p><strong>From:</strong> {user.departure}</p>
            <p><strong>To:</strong> {user.arrival}</p>
            <p><strong>Flight No:</strong> {user.flight_no}</p>
            <p><strong>Fare:</strong> ${user.price}</p>
        </div>
        <button onClick={foo} className="pay-button">Pay Now</button>
        </div>
    </div>
    );

};

export default Invoice;
