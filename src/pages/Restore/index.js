import React, { useState } from "react";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { apiStatusConstants } from "src/constants";
import Switch from "react-switch";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { DNA } from "react-loader-spinner";

const Restore = () => {
  const [originalImage, setoriginalImage] = useState({
    apiStatus: apiStatusConstants.initial,
    url: null,
    error: null,
  });
  const [restoredImage, setRestoredImage] = useState({
    apiStatus: apiStatusConstants.initial,
    url: null,
    error: null,
  });
  const [checked, setChecked] = useState(false);

  const generatePhoto = async (oldPicUrl) => {
    setRestoredImage({ apiStatus: apiStatusConstants.inProgress, url: null });
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/restore`;
    const options = {
      method: "GET",
      body: JSON.stringify({ imgUrl: oldPicUrl }),
      credentials: "include",
    };
    const res = await fetch(apiUrl, options);
    if (res.ok) {
      const newPhoto = res.json();
      setRestoredImage({
        apiStatus: apiStatusConstants.success,
        url: newPhoto,
      });
    } else {
      setRestoredImage({ apiStatus: apiStatusConstants.failure, url: null });
    }
  };

  const renderImageComparision = () => {
    if (checked) {
      return (
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={originalImage.url}
              alt="original photo"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={restoredImage.url}
              alt="restored photo"
            />
          }
          portrait
          className="mt-5"
        />
      );
    } else {
      return (
        <div className="columns is-variable is-3 mt-3">
          <div className="column is-12 is-6-desktop">
            <h1 className="is-size-6 has-text-black has-text-weight-semibold">
              Original Photo
            </h1>
            <img
              alt="original_photo"
              src={originalImage.url}
              className="rounded mt-3"
              width={475}
              height={475}
            />
          </div>
          <div className="column is-12 is-6-desktop">
            <h1 className="is-size-6 has-text-black has-text-weight-semibold">
              Restored Photo
            </h1>
            <img
              alt="resored_photo"
              src={restoredImage.url}
              className="rounded mt-3"
              width={475}
              height={475}
            />
          </div>
        </div>
      );
    }
  };

  const renderMainBody = () => {
    if (
      originalImage.apiStatusConstants === apiStatusConstants.success &&
      restoredImage.apiStatusConstants === apiStatusConstants.success
    ) {
      return (
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <div className="is-flex is-flex-direction-row is-justify-content-flex-start is-align-items-center ">
            <p
              className={`mr-4 is-size-5 has-text-black ${
                !checked ? "has-text-weight-bold" : ""
              }`}
            >
              Side by Side
            </p>
            <Switch
              onColor="#0F182A"
              onChange={(nextChecked) => {
                setChecked(nextChecked);
              }}
              checked={checked}
              className="react-switch"
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <p
              className={`ml-4 is-size-5 has-text-black ${
                checked ? "has-text-weight-bold" : ""
              }`}
            >
              Compare
            </p>
          </div>
          {renderImageComparision()}
        </div>
      );
    } else if (
      originalImage.apiStatusConstants === apiStatusConstants.success
    ) {
      return (
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <div className="columns is-variable is-4">
            <div className="column is-12 is-6-desktop">
              <h1>Original Photo</h1>
              <img
                alt="original_photo"
                src={
                  "https://upcdn.io/12a1xvS/thumbnail/uploads/2023/12/30/4kvZtyeY8o-WhatsApp%20Image%202023-11-29%20at%2011-new.50.05.jpeg"
                }
                className="rounded"
                width={475}
                height={475}
              />
            </div>
            <div className="column is-12 is-6-desktop is-flex is-justify-content-center is-align-items-center">
              <DNA
                visible={true}
                height="100"
                width="100"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <UploadDropzone
          options={{
            apiKey: "free",
            maxFileCount: 1,
            mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
            editor: { images: { crop: false } },
            styles: { colors: { primary: "#AF52AE" } },
          }}
          onUpdate={({ uploadedFiles }) => {
            setoriginalImage(
              uploadedFiles[0].fileUrl.replace("raw", "thumbnail")
            );
            generatePhoto(uploadedFiles[0].fileUrl.replace("raw", "thumbnail"));
          }}
          width="670px"
          height="250px"
        />
      );
    }
  };
  return (
    <div className="bg-container is-flex is-flex-direction-column is-align-items-center">
      <Header />
      <div
        style={{ width: "100%" }}
        className="px-4 mt-4 mb-8 is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-flex-grow-1 has-text-centered"
      >
        <h1 className="mb-5 is-size-1 has-text-weight-bold has-text-black">
          Restore any photo
        </h1>
        {renderMainBody()}
      </div>
      <Footer />
    </div>
  );
};

export default Restore;
