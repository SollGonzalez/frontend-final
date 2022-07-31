import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";
import Table from "react-bootstrap/Table";

const ModifyProducts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = sessionStorage.getItem("Token");

  useEffect(() => {
    fetch(`https://heroku-back-sol.herokuapp.com/products/`, {
      method: "GET",
      headers: {
        Authorization: user,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const deleteProduct = async (p) => {
    await fetch(`https://heroku-back-sol.herokuapp.com/products/${p}`, {
      method: "DELETE",
      headers: {
        Authorization: user,
        "Content-Type": "application/json",
      },
    });
    navigate("/products");
  };

  return (
    <>
      <NavBar />

      <div className="container">
        <div className="row">
          <div className="col-12 my-3">
            <h2 className="fw-bolder text-center product-title">PRODUCTOS</h2>
            <hr />
          </div>
        </div>
        <div className="d-flex justify-content-center mb-4 products-home ">
          <Link to={"/newProduct"} className="btn btn-secondary fw-normal ">
            Agregar
          </Link>
        </div>
        <Table responsive className="table products-home">
          <thead>
            <tr>
              {/* <th scope="col">Imagen</th> */}
              <th scope="col">Nombre</th>
              <th scope="col">Caregoria</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => {
              return (
                <tr>
                  {/* <td>
                      <img
                        src={product.image}
                        alt={product.image}
                        width="90"
                        height="90"
                        className="img-fluid"
                      />
                    </td> */}
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <div className="d-flex">
                    <div>
                      <Link
                        to={`/editProduct/${product.id}`}
                        className="btn btn-warning me-1"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </div>
                    <button
                      // to={"/modifications"}
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </tr>
              );
            })}{" "}
          </tbody>
        </Table>
      </div>

      <Footer />
    </>
  );
};

export default ModifyProducts;
