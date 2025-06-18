import React from 'react';

function About() {
  return (
    <div className="container mt-5" style={{ fontSize:"20px"}}>
      <p>
        SkyHigh Airlines is a Database Management System (DBMS) project.
      </p>
      <ul>
        <li>Flight scheduling & tracking</li>
        <li>Passenger booking </li>
        <li>Customer reviews and ticketing</li>
      </ul>
      <p>This application uses React for frontend, a backend API, and a MySQL relational database .</p>
    </div>
  );
}

export default About;
