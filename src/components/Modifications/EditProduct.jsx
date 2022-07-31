import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  let user = sessionStorage.getItem("token");
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      price: "",
      // image: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(30)
        .required("Nombre requerido.")
        .matches(/^[aA-zZ\s]+$/, "Solo se admiten letras del alfabeto."),

      category: yup.string().required("Categoria requerida."),
      description: yup.string().required("Descripcion requerida").max(150),
      price: yup.number().required("Precio requerido."),
    }),
    onSubmit: async (values) => {
      const editProduct = { ...values };
      let result = await fetch(
        `https://heroku-back-sol.herokuapp.com/products/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: user,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ editProduct }),
        }
      );
      result = await result.json();
      const productId = [result.id];
      const message = [result.message];
      sessionStorage.setItem("productId", productId);
      sessionStorage.setItem("Message", message);
      navigate("/modifications");
    },
  });
  return (
    <>
      <NavBar />

      <div className="container">
        <div className="row">
          <div className="col-12 my-3">
            <h2 className="fw-bolder text-center mb-3 product-title ">
              EDITAR PRODUCTO
            </h2>
            <h4 className="text-center product-title">ID Producto: {id}</h4>
            <hr />
          </div>
        </div>
        <div className="products-home col-md-10 mx-auto col-lg-7 col-xl-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nombre del producto:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                // value={formik.editProduct.name}
                {...formik.getFieldProps("name")}
              />

              {formik.touched.name && formik.errors.name && (
                <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-50">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Categoría:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput2"
                {...formik.getFieldProps("category")}
              />
              {formik.touched.category && formik.errors.category && (
                <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-50">
                  {formik.errors.category}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Descripción:
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                {...formik.getFieldProps("description")}
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-50">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                Precio:
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput3"
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-50">
                  {formik.errors.price}
                </div>
              )}
            </div>
            {/* hacer que solo aparezca con el submit */}
            {/* <div className="text-center mb-4  p-2 alert alert-success">
              {sessionStorage.getItem("Message")}
            </div> */}

            <div className="d-flex justify-content-center">
              <button type="submit" className=" mt-4 me-4 btn mb-3 btn-success">
                Editar
              </button>
              <Link to={"/modifications"} className=" mt-4 btn mb-3 btn-danger">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProduct;
