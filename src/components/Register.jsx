import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Register = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    // validaciones de los initialValues
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, "Debe contener al menos 3 caracteres")
        .max(100)
        .required("Nombre requerido.")
        .matches(/^[aA-zZ\s]+$/, "Solo se admiten letras del alfabeto."),
      email: yup
        .string()
        .email("Debe contener un email válido.")
        .max(50)
        .required("Email requerido."),
      password: yup
        .string()
        .min(8, "Debe tener al menos 8 caracteres.")
        .max(15, "Debe tener como máximo 15 caracteres.")
        .required("Por favor, introduzca su contraseña."),

      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir."),
    }),

    onSubmit: async (values) => {
      const registerUser = { ...values };
      let result = await fetch("https://heroku-back-sol.herokuapp.com/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUser),
      });

      result = await result.json().then(setToken(result.JWT));
      console.log(result);
      let userId = [result.id];
      let userName = [result.name];
      let userEmail = [result.email];
      let token = result.JWT;
      let message = [result.message];
      localStorage.setItem("UserId", userId);
      localStorage.setItem("UserName", userName);
      localStorage.setItem("UserEmail", userEmail);
      localStorage.setItem("Token", token);
      localStorage.setItem("Message", message);
      navigate("/login");
    },
  });

  return (
    <>
      <NavBar />
      <div className="register-containter container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-md-10 mx-auto col-lg-6 col-xl-6">
            <form
              className="p-4 p-md-5 border rounded-3 bg-light"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="h3 mb-4 fw-semibold text-center">Crear cuenta</h1>

              <div className="form-floating mb-3 text-center">
                <input
                  id="floatingName"
                  name="name"
                  type="text"
                  className="form-control"
                  {...formik.getFieldProps("name")}
                />
                <label htmlFor="floatingName">Nombre</label>
                {formik.touched.name && formik.errors.name && (
                  <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-75">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3 text-center">
                <input
                  id="floatingEmail"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="tunombre@ejemplo.com"
                  {...formik.getFieldProps("email")}
                />
                <label htmlFor="floatingEmail">Email</label>
                {formik.touched.email && formik.errors.email && (
                  <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-75">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3 text-center">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <label htmlFor="floatingPassword">Contraseña</label>
                {formik.touched.password && formik.errors.password && (
                  <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-75">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3 text-center">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPasswordConfirmation"
                  placeholder="passwordConfirmation"
                  {...formik.getFieldProps("passwordConfirmation")}
                />
                <label htmlFor="floatingPasswordConfirmation">
                  Confirmar contraseña
                </label>
                {formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation && (
                    <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-75">
                      {formik.errors.passwordConfirmation}
                    </div>
                  )}
              </div>

              {/* ------------------------------------------- */}

              <div className="d-flex justify-content-center">
                <button
                  className=" btn-form color-9 w-75 fw-normal rounded "
                  type="submit"
                >
                  Crear cuenta
                </button>
              </div>

              <div className="text-center mt-4">
                ¿Ya tenés una cuenta?
                <Link
                  to={"/login"}
                  className="text-decoration-none text-black fw-semibold mx-2"
                >
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
