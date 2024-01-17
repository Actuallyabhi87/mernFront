import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../screens/Cart";
import Model from "../Model";
import { useCart } from "./ContextReducer";
const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 text-light" to="#">
            <i>GoFood</i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link
                  className="nav-link text-light active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link text-light active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    Myorders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <form className="d-flex mx-5">
              <input
                className="form-control me-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn bg-danger text-light" type="submit">
                Search
              </button>
            </form>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="nav-link text-success bg-white mx-1 rounded"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="nav-link text-success bg-white mx-1 rounded"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <button
                  className="btn bg-white text-success mx-2"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  <div className="h-10 w-10 rounded bg-danger text-white">
                    {data.length}
                  </div>
                  MyCart
                </button>
                {cartView ? (
                  <Model onClose={() => setCartView(false)}>
                    <Cart />
                  </Model>
                ) : null}
                <button
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
