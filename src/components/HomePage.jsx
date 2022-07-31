import React from "react";
import ropa4 from "../public/banner/ropa4.jpg";
import { Link } from "react-router-dom";
import ProductsHome from "./Products/ProductsHome";

const HomePage = () => {
  return (
    <>
      <div className="hero ">
        <div className="card bg-dark text-dark  border-0 ">
          <img
            src={ropa4}
            className=" home-img card-img img-fluid"
            alt="banner"
            height="200"
          />
        </div>
      </div>
      <ProductsHome />
      <div className=" btn-home buttons d-flex justify-content-center  my-3 ">
        <Link to={"/products"}>
          <button className=" btn btn-outline-dark me-3 fs-5 fw-normal">
            Mostrar mas productos
          </button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
