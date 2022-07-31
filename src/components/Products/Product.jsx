import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://heroku-back-sol.herokuapp.com/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  const ShowProduct = () => {
    return (
      <>
        {product.map((product) => {
          return (
            <>
              <div className="d-flex justify-content-start mb-2">
                <div className="brcrb" aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/products" className=" text-black">
                        Productos
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {product.name}
                    </li>
                  </ol>
                </div>
              </div>
              <div className="col-md-6">
                <img
                  src={product.image}
                  alt={product.name}
                  height="450px"
                  width="450px"
                  className=" img-thumbnail"
                />
              </div>
              <div className="col-md-6">
                <h4 className="text-uppercase text-black-50 fs-4">
                  {product.category}
                </h4>
                <h1 className="product-title display-5"> {product.name}</h1>
                <h3 className="products-home display-6 fw-bold my-4">
                  $ {product.price}
                </h3>
                <p className="products-home fs-6">{product.description}</p>
                {/* <button className="btn btn-outline-dark ">
                  Agregar al carrito
                </button> */}
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="container my-5 ">
        <div className="row">
          <ShowProduct />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
