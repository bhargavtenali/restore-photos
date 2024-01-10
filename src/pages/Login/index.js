// src/Login.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import "bulma/css/bulma.min.css";
import { useHistory } from "react-router-dom";
import modernWallpaper from "src/assets/bgLogin.jpg";
import axios from "axios";
import { apiStatusConstants } from "src/constants";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [apiState, setApiState] = useState({
    errorMsg: "",
    apiStatus: apiStatusConstants.initial,
  });
  let history = useHistory();
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const textboxVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const buttonVariant = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  };

  const headingVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/login`;
    setApiState({
      errorMsg: "",
      apiStatus: apiStatusConstants.inProgress,
    });
    try {
      const response = await axios.post(apiUrl, userDetails, {
        withCredentials: true,
      });
      const data = response.data;
      const jsonData = JSON.stringify({ username: data.username });
      sessionStorage.setItem("username", jsonData);
      history.replace("/");
    } catch (error) {
      console.error(error);
      if (!error?.response) {
        setApiState({
          errorMsg: "No Response from the server",
          apiStatus: apiStatusConstants.failure,
        });
      } else {
        setApiState({
          errorMsg: `Error logging in due to ${error.response.data}`,
          apiStatus: apiStatusConstants.failure,
        });
      }
    }
  };
  return (
    <motion.div
      className="bg-container"
      style={{
        backgroundImage: `url(${modernWallpaper})`,
        backgroundSize: "cover",
      }}
    >
      <motion.div
        style={{ height: "100vh" }}
        className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Text box with predefined username and password */}
        <motion.div
          style={{ width: "350px" }}
          className="notification is-info box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p>
            <strong>Test Login Information:</strong>
            <br />
            Username: bhargav
            <br />
            Password: Bhargav@12345$
          </p>
        </motion.div>

        {/* Login Form */}
        <form
          className="box is-flex is-flex-direction-column"
          onSubmit={submitForm}
          style={{ width: "350px" }}
        >
          <motion.h1
            className="header-text is-size-4-touch is-size-2 has-text-weight-bold has-text-centered mb-4"
            initial="hidden"
            animate="visible"
            variants={headingVariant}
            transition={{ duration: 4, delay: 0.5 }}
            exit="hidden"
          >
            Restore
          </motion.h1>
          <motion.div
            className="field"
            variants={textboxVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="field"
            variants={textboxVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Your password"
              />
            </div>
          </motion.div>

          <motion.div
            className="field is-align-self-center mt-4"
            variants={textboxVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.button
              className={`button is-primary is-rounded ${
                apiState.apiStatus === apiStatusConstants.inProgress
                  ? "is-loading"
                  : ""
              }`}
              type="submit"
              variants={buttonVariant}
              whileHover="hover"
            >
              Login
            </motion.button>
          </motion.div>
          {apiState.apiStatus === apiStatusConstants.failure && (
            <p className="has-text-centered is-size-6 has-text-danger">
              *{apiState.errorMsg}
            </p>
          )}
        </form>
        {/* Text box with predefined username and password */}
        <motion.div
          style={{ width: "350px" }}
          className="notification is-info box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <p>
            App built by Bhargav Tenali
            <br />
            To see my LinkedIn Profile{" "}
            <a
              href="https://www.linkedin.com/in/bhargavtenali/"
              target="_blank"
              rel="noreferrer"
            >
              Click Here
            </a>
            <br />
            For Source Code{" "}
            <a
              href="https://github.com/bhargavtenali/restore-photos"
              target="_blank"
              rel="noreferrer"
            >
              Click Here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
