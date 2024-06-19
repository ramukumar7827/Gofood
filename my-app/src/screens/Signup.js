import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const [credenditals, setcredenditals] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credenditals.name,email:credenditals.email,password:credenditals.password,location:credenditals.geolocation}),
    });
    const json=await response.json();
    console.log(json);
    if(!json.success){
      alert("User created Successfuly")
    }
    if(json.success){
      navigate('/');
    }
  };
  const onChange=(e)=>{
    setcredenditals({...credenditals,[e.target.name]:e.target.value})
  }
  return (
    <div className="container  container1">
      <div className="card" id="card1">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credenditals.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={credenditals.email}
                className="form-control"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credenditals.password}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="geolocation"
                value={credenditals.geolocation}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/login" className="btn btn-primary m-3">
              Go somewhere
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
