import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";

const Login = () => {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://mernback-lpy5.onrender.com/api/loginuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      // console.log(response); // Log the entire response to inspect it

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert("Authentication successful");
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", data.authToken);
        // console.log(localStorage.getItem("authToken"));
        navigate("/");
      } else {
        alert("Authentication failed");
      }
    } catch (error) {
      alert("Error during login:", error);
    }
  };

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to={Signup} className="m-3 btn btn-danger">
            Create Account
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
