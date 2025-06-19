import React, { useState } from "react";
import Axios from "axios";
import "./styles/Signin.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  const SwalAlert = withReactContent(Swal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.err) {
          SwalAlert.fire("Login failed!", response.data.err, "error");
        } else if (response.data.id) {
          SwalAlert.fire("Login Successful!", "", "success");
          setTimeout(() => history.push(`/CustomerPanel/${response.data.id}`), 500);
        } else {
          SwalAlert.fire("Invalid credentials!", "", "error");
        }
      })
      .catch((err) => {
        console.error(err);
        SwalAlert.fire("Server error", "Try again later", "error");
      });
  };

  return (
    <div className="Auth-form-container bg-image">
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              required
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "320px" }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              required
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "320px" }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;