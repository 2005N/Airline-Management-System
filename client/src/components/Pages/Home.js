import React from 'react';

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to SkyHigh Airlines</h1>
      <p>Your trusted partner for seamless and secure air travel management.</p>
      <p>Book flights, manage schedules, and handle passenger data — all in one place.</p>
      <img
        src="https://bsmedia.business-standard.com/_media/bs/img/article/2023-11/10/full/1699593179-0765.jpg?im=FeatureCrop,size=(826,465)"
        alt="Airplane"
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', marginTop: '20px' }}
      />
    </div>
  );
}

export default Home;
