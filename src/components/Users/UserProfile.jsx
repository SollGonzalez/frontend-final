import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";

const UserProfile = () => {
  let userId = sessionStorage.getItem("UserId");
  let userName = sessionStorage.getItem("UserName");
  let userEmail = sessionStorage.getItem("UserEmail");
  let message = sessionStorage.getItem("Message");
  return (
    <>
      <NavBar />

      <div className=" px-4 py-5 mt-5 text-center">
        <h1 className="title-profile display-6 fw-semibold">Mi cuenta </h1>
        <div className="col-lg-6 text-center mx-auto">
          <div className="d-flex mt-5  justify-content-center text-center">
            <div className="user-Profile card shadow mb-5 bg-body rounded  py-3 px-5">
              <div className="d-flex justify-content-center">
                <h5 className="fw-bold mt-3">Mis datos</h5>
              </div>
              <hr />
              <ul className="navbar-nav mb-2 d-flex align-items-start">
                <li className="fw-bold mb-3">
                  <i className="fa-solid fa-user pe-2"></i>
                  {userName}
                </li>

                <li className="fw-bold ">
                  <i className="fa-solid fa-envelope pe-2"></i>
                  {userEmail}
                </li>
              </ul>
              <hr />
              {/* <div className=" mt-2">
                <Link
                  to={"/"}
                  type="button"
                  className="btn btn-outline-secondary text-decoration-none mx-2"
                >
                  editar
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
