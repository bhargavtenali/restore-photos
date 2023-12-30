import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "src/assets/imageIcon.png";

const Header = () => {
  return (
    <div className="header-contianer">
      <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center px-4 py-5">
        <Link to="/" className="is-flex is-align-items-flex-end">
          <img className="header-logo" src={headerLogo} alt="header-logo" />
          <h1 className="ml-2 is-size-4-touch is-size-2 has-text-weight-bold has-text-black">
            Restore
          </h1>
        </Link>
        <a
          href="https://www.linkedin.com/in/bhargavtenali/"
          target="_blank"
          rel="noreferrer"
          className="header-text is-size-4-touch is-size-2 has-text-weight-bold"
        >
          Bhargav
        </a>
      </div>
      <hr
        style={{
          color: "#E5E7EB",
          backgroundColor: "#E5E7EB",
          height: "2px",
          margin: "0px",
        }}
      />
    </div>
  );
};

export default Header;
