import React, { useEffect, useState } from "react";
import Logo from "../public/logo/logo.png";
import { NavLink, Link, useSearchParams } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      {sessionStorage.getItem("Token") ? (
        <nav className="navbarCss navbar sticky-top navbar-expand-lg bg-light ">
          <div className="container">
            <Link className="navbar-brand text-decoration-none" to={"/"}>
              <img src={Logo} width="100px" height="100px" alt="logo" />
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
                <li className="nav-item">
                  <Link to={"/"} className=" nav-link px-2 text-black ">
                    Inicio
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/products"} className=" nav-link px-2 text-black ">
                    Productos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to={"/modifications"}
                    className=" nav-link px-2 text-black "
                  >
                    Modificaciones
                  </Link>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/userProfile"}
                    className=" nav-link px-2 text-black "
                  >
                    Mi cuenta
                  </NavLink>
                </li>
              </ul>

              <div className="nav-item ">
                <NavLink
                  onClick={() => {
                    sessionStorage.removeItem("UserId");
                    sessionStorage.removeItem("UserName");
                    sessionStorage.removeItem("UserEmail");
                    sessionStorage.removeItem("Token");
                    sessionStorage.removeItem("Message");
                  }}
                  to={"/"}
                  className="nav-NavLink NavLink"
                  aria-current="page"
                >
                  <button type="button" className=" btn btn-outline-dark me-2">
                    Logout
                  </button>
                </NavLink>
              </div>

              {/* va a estar en conjunto con el login  */}
              {/* <NavLink
               to={"/register"}
               className="nav-NavLink NavLink "
               aria-current="page"
             >
               <button type="button" className="btn btn-dark">
                 Sign-up
               </button>
             </NavLink> */}
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-light p-3">
          <div className="container">
            <NavLink className="navbar-brand text-decoration-none" to={"/"}>
              <img src={Logo} width="90px" height="90px" alt="logo" />
            </NavLink>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
                <li className="nav-item">
                  <NavLink to={"/"} className=" nav-link px-2 text-black ">
                    Inicio
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to={"/products"}
                    className=" nav-link px-2 text-black "
                  >
                    Productos
                  </NavLink>
                </li>
              </ul>

              <div className="text-end">
                <NavLink
                  to={"/login"}
                  className="nav-NavLink NavLink"
                  aria-current="page"
                >
                  <button type="button" className=" btn btn-outline-dark me-2">
                    Login
                  </button>
                </NavLink>
              </div>

              {/* va a estar en conjunto con el login  */}
              {/* <NavLink
                to={"/register"}
                className="nav-NavLink NavLink "
                aria-current="page"
              >
                <button type="button" className="btn btn-dark">
                  Sign-up
                </button>
              </NavLink> */}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
