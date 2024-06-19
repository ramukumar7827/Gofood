import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
const intialState = {
  email: "",
  password: "",
};
export default function Login() {
  const [credenditals, setcredenditals] = useState(intialState);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credenditals.email,
        password: credenditals.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
       setcredenditals(intialState);
      alert("Invalid email or password");
    }
    if(json.success){
        localStorage.setItem("authToken",json.authToken)
       navigate('/');
    }
   
  };
  const onChange = (e) => {
    setcredenditals({ ...credenditals, [e.target.name]: e.target.value });
  };
  return (
    <div className="container container1">
      <div className="card" id="card1">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/signup" className="btn btn-primary m-3">
               Don't have an account.
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
