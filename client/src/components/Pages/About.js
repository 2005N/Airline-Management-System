import React from 'react';

function About() {
  return (
    <div className="container mt-5">
      <h2>About SkyHigh Airlines</h2>
      <p>
        SkyHigh Airlines is a demo project developed for a Database Management System (DBMS) course.
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
