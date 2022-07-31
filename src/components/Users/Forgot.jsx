import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const Forgot = () => {
  const [token, setToken] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Debe contener un email válido.")
        .max(50)
        .required("Email requerido."),
    }),
    onSubmit: async (values) => {
      const loginUser = { ...values };
      let result = await fetch(
        "https://heroku-back-sol.herokuapp.com/users/forgot-password/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginUser),
        }
      );
      result = await result.json().then(setToken(result.JWT));
      console.log(result);
      let token = result.JWT;
      let message = [result.message];
      console.log(token);
      console.log(message);
      sessionStorage.setItem("Token", token);
      sessionStorage.setItem("Message", message);
    },
  });
  return (
    <>
      <NavBar />
      <section className="">
        <div className=" container ">
          <div className="row d-flex justify-content-center ">
            <div className="col-lg-6 col-xl-10">
              <div className="  mb-5 mt-5 text-black">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 ">
                    <p className="text-center h2 fw-semibold mb-5 mx-1 mx-md-4 mt-5">
                      Cambiar Contraseña
                    </p>

                    <div className="text-center mb-3 p-1">
                      {sessionStorage.getItem("Message")}
                    </div>
                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="d-flex align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            className=" form-control"
                            id="email"
                            type="email"
                            name="email"
                            {...formik.getFieldProps("email")}
                          />
                          {formik.touched.email && formik.errors.email && (
                            <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-75">
                              {formik.errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <button
                          className="w-100 btn btn-lg btn-secondary"
                          type="submit"
                        >
                          Enviar email
                        </button>
                      </div>
                      <div className="text-center mt-4">
                        ¿No tenés cuenta aún?
                        <Link
                          to={"/register"}
                          className="text-decoration-none text-black fw-semibold mx-2"
                        >
                          Crear Cuenta
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Forgot;
