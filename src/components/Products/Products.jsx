import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";

import ScrollToTop from "react-scroll-to-top";

// -------------------
import { useSearchParams, NavLink } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);

  // ------------
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch("https://heroku-back-sol.herokuapp.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const ShowProducts = () => {
    return (
      <>
        <ScrollToTop
          smooth
          component={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-arrow-up-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
            </svg>
          }
        />
        <div className="d-flex justify-content-end">
          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              value={searchParams.get("name") || ""}
              onChange={(event) => {
                let name = event.target.value;

                if (name) {
                  setSearchParams({ name });
                } else {
                  setSearchParams({});
                }
              }}
              type="text"
              className="form-control me-2 mb-4 "
              placeholder="Buscar productos..."
              aria-label="Search"
            />
          </form>
        </div>

        {data
          .filter((product) => {
            const name = searchParams.get("name");
            if (!name) return true;
            // else {
            //   const stringId = String(name);
            //   console.log(stringId);

            //   const postId = String(product.name);
            //   console.log(postId);

            //   return postId.startsWith(stringId);
            // }
            const nameid = product.name.toLowerCase();
            return nameid.startsWith(name.toLowerCase());
          })
          .map((product) => {
            return (
              <>
                <div className="products-home col-md-4 col-lg-3 col-sm-6 col-xs-2 mb-4 ">
                  <div
                    className="card  text-center p-4  h-100"
                    key={product.id}
                  >
                    <img
                      src={product.image}
                      className="card-img-top h-75 "
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-3 fs-4">{product.name}</h5>
                      <p className="card-text fs-5 fw-semibold">
                        $ {product.price}
                      </p>
                    </div>

                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                      Detalles
                    </NavLink>
                  </div>
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
      <div className="container mt-5 ">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className="product-title display-6 fw-bolder text-center">
              PRODUCTOS
            </h1>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          <ShowProducts />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
