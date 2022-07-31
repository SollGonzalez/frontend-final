import React from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
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
      const newProduct = { ...values };
      let user = sessionStorage.getItem("Token");
      let result = await fetch(
        "https://heroku-back-sol.herokuapp.com/products/",
        {
          method: "POST",
          headers: {
            Authorization: user,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );
      result = await result.json();
      const prId = [result.id];
      console.log(prId);
      const message = [result.message];
      sessionStorage.setItem("productId", prId);
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
            <h2 className="fw-bolder text-center product-title">
              AGREGAR PRODUCTO
            </h2>
            <hr />
          </div>
        </div>
        <div className="col-md-10 mx-auto col-lg-7 col-xl-8 products-home">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Nombre del producto:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-50">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput2" className="form-label">
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
              <label for="exampleFormControlTextarea1" className="form-label">
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
              <label for="exampleFormControlInput3" className="form-label">
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
                Agregar
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

export default NewProduct;
