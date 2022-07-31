import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  // const [shown, setShown] = React.useState(false);
  // const switchShown = () => setShown(!shown);

  // const [password, setPassword] = React.useState("");
  // const onChange = ({ currentTarget }) => setPassword(currentTarget.value);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
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
    }),

    onSubmit: async (values) => {
      const loginUser = { ...values };
      let result = await fetch(
        "https://heroku-back-sol.herokuapp.com/users/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginUser),
        }
      );

      result = await result.json().then(setToken(result.JWT));
      console.log(result);
      let userId = [result.id];
      let userName = [result.name];
      let userEmail = [result.email];
      let token = result.JWT;
      let message = [result.message];
      sessionStorage.setItem("UserId", userId);
      sessionStorage.setItem("UserName", userName);
      sessionStorage.setItem("UserEmail", userEmail);
      sessionStorage.setItem("Token", token);
      sessionStorage.setItem("Message", message);
      navigate("/userProfile");
    },
  });

  return (
    <>
      <NavBar />
      <div className="login-container container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-md-10 mx-auto col-lg-6 col-xl-6">
            <form
              className="p-4 p-md-5 p-2 text-dark border rounded-3 bg-light"
              onSubmit={formik.handleSubmit}
            >
              <h1 className="h3 mb-4 fw-semibold text-center">
                Iniciar sesión
              </h1>

              <div className="form-floating mb-3 text-center">
                <input
                  // autoFocus
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
              <div className=" form-floating mb-3 text-center">
                <input
                  // onChange={onChange}
                  // type={shown ? "text" : "password"}
                  // value={password}
                  type="password"
                  className="form-control d-flex"
                  id="floatingPassword"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                ></input>
                {/* <button className="" onClick={switchShown}>
                  {shown ? (
                    <i class="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i class="fa-solid fa-eye"></i>
                  )}
                </button> */}
                <label htmlFor="floatingPassword">Contraseña</label>
                {formik.touched.password && formik.errors.password && (
                  <div className="alert alert-danger mt-2 mb-1 pb-2 pt-2 w-75">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* ------------------------------------------- */}
              {/* <div className="form-check mb-3 ">
                <div class=" d-flex justify-content-end">
                  <Link
                    to={"/forgot-password"}
                    className="text-decoration-none text-black"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div> */}

              {/* ------------------------------------------- */}

              <div className="d-flex justify-content-center">
                <button
                  className="btn-form color-9 w-75 fw-normal rounded "
                  type="submit"
                >
                  Iniciar sesión
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
      <Footer />
    </>
  );
};

export default Login;
