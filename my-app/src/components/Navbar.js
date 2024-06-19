import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate=useNavigate();
  const handlelogout=()=>{
     localStorage.removeItem("authtoken");
     navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler bg-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Features
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    My Order
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d flex">
                <Link className="btn mx-1 text-primary bg-white" to="/login">
                  Login
                </Link>

                <Link className="btn mx-1   text-primary bg-white" to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="d flex">
                <Link className="btn mx-1 text-primary bg-white" to="/login">
                  cart
                </Link>

                <div className="btn mx-1   text-primary bg-white"  onClick={handlelogout}>
                  logout               </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
