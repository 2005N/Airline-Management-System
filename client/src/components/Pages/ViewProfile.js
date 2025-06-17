import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import './styles/ViewProfile.css'; 

const ViewProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
    
  useEffect(() => {
    Axios.get(`http://localhost:5000/CustomerPanel/${id}`)
      .then((response) => {
        if (response.data.length > 0) {
          setUser(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch user data:', error);
      });
  }, [id]);

  if (!user) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }
  

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow profile-card">
        <div className="row no-gutters">
          <div className="col-md-4 text-center">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"  
              className="img-fluid rounded-circle profile-img"
              alt="User Profile"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title mb-4">User Profile</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>First Name:</strong> {user.fname}</li>
                <li className="list-group-item"><strong>Middle Name:</strong> {user.mname}</li>
                <li className="list-group-item"><strong>Last Name:</strong> {user.lname}</li>
                <li className="list-group-item"><strong>Phone:</strong> {user.phone}</li>
                <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                <li className="list-group-item"><strong>Passport:</strong> {user.passport}</li>
              </ul>
              <div className="mt-4">
                <Link to={`/CustomerPanel/${id}`}>
                    <button className="btn btn-secondary">
                    ← Back to Main
                    </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ViewProfile;
