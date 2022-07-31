import React from "react";

const Footer = () => {
  return (
    <>
      <div className="container-fluid mt-4 products-home">
        <footer className="pt-2 mt-3">
          <ul className="nav justify-content-center border-bottom ">
            <li className="nav-item pe-2">
              <p className="nav-link px-2 text-black">
                <i className="fa-solid fa-phone-flip pe-2"></i> 541133345532
              </p>
            </li>
            <li className="nav-item pe-2">
              <p className="nav-link px-2 text-black">
                <i className="fa-solid fa-envelope pe-2"></i>{" "}
                lupesupport@gmail.com
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link px-2 text-black ">
                <i className="fa-solid fa-location-dot pe-2"></i>Capital
                Federal, Buenos Aires.
              </p>
            </li>
          </ul>
          <p className="text-center text-muted mt-2">
            &copy; Lupes - 2022. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
