import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="header-contianer mt-5">
      <hr
        style={{
          color: "#E5E7EB",
          backgroundColor: "#E5E7EB",
          height: "2px",
          margin: "0px",
        }}
      />
      <div className="columns is-gapless px-3 py-3">
        <div className="column is-full is-half-desktop is-flex is-align-items-center is-size-6 has-text-black has-text-weight-medium footer-element-1">
          <p className="mr-1">Powered by </p>
          <a
            href="https://replicate.com/"
            target="_blank"
            rel="noreferrer"
            className="has-text-black has-text-weight-bold mr-1"
          >
            Replicate{" "}
          </a>
          <p className="mr-1">and</p>
          <a
            href="https://www.linkedin.com/in/bhargavtenali/"
            target="_blank"
            rel="noreferrer"
            className="has-text-black has-text-weight-bold"
          >
            Bhargav
          </a>
        </div>
        <div className="column column is-full is-half-desktop is-flex is-align-items-center footer-element-2">
          <a
            href="https://www.linkedin.com/in/bhargavtenali/"
            target="_blank"
            rel="noreferrer"
            className="mr-2"
          >
            <span className="icon is-medium icon-color">
              <i className="ri-linkedin-fill ri-xl"></i>
            </span>
          </a>
          <a
            rel="noreferrer"
            href="https://github.com/bhargavtenali"
            target="_blank"
            className="mr-2"
          >
            <span className="icon is-medium icon-color">
              <i className="ri-github-fill ri-xl"></i>
            </span>
          </a>
          <a rel="noreferrer" href="tel:+91-93985-66627" className="mr-2">
            <span className="icon is-medium icon-color">
              <i className="ri-phone-fill ri-xl"></i>
            </span>
          </a>
          <a
            rel="noreferrer"
            href="mailto:bhargavtenali@gmail.com"
            className="mr-2"
          >
            <span className="icon is-medium icon-color">
              <i className="ri-mail-fill ri-xl"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
