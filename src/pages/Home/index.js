import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import micheal from "src/assets/michael.jpg";
import michealNew from "src/assets/michael-new.jpg";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="bg-container is-flex is-flex-direction-column is-align-items-center">
      <Header />
      <div className="main-container is-flex is-flex-direction-column is-align-items-center is-flex-grow-1 has-text-centered px-5 my-6 py-6">
        <h1 className="is-size-2-touch is-size-1 has-text-weight-bold has-text-black">
          Restoring old photos using AI <br />
          <span className="has-text-info">built for everyone </span>
          <br />
          <a
            href="https://bhargavtenali.netlify.app/"
            target="_blank"
            className="has-text-primary"
            rel="noreferrer"
          >
            by Bhargav
          </a>
        </h1>
        <p className="mt-6 is-size-5-touch is-size-4">
          Have old and blurry face photos? Let our AI restore them so those
          memories can live on. 100% free – restore your photos today.
        </p>
        <div className="mt-6 is-flex is-justify-content-center">
          <a
            className="button rounded has-text-weight-bold is-size-6 px-4 py-3 mr-3"
            href="https://www.linkedin.com/in/bhargavtenali/"
            target="_blank"
            rel="noreferrer"
          >
            Learn how it's built
          </a>
          <Link
            className="button rounded is-black has-text-weight-bold is-size-6 px-4 py-3"
            to="/restore"
          >
            Restore your photos
          </Link>
        </div>
        <div className="columns mt-6">
          <div className="column is-full is-half-desktop">
            <h2 className="mb-1 is-size-5 has-text-weight-bold">
              Original Photo
            </h2>
            <img
              className="rounded"
              alt="original"
              src={micheal}
              width="400px"
              height="400px"
            />
          </div>
          <div className="column is-full is-half-desktop">
            <h2 className="mb-1 is-size-5 has-text-weight-bold">
              Restored Photo
            </h2>
            <img
              className="rounded"
              alt="restored"
              src={michealNew}
              width="400px"
              height="400px"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
