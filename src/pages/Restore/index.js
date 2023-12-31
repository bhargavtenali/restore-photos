import React, { useState } from "react";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { UrlBuilder } from "@bytescale/sdk";
import { apiStatusConstants } from "src/constants";
import Switch from "react-switch";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { DNA } from "react-loader-spinner";
import axios from "axios";
import { saveAs } from "file-saver";

const Restore = () => {
  const [originalImage, setOriginalImage] = useState({
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
    await new Promise((resolve) => setTimeout(resolve, 500));
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/generate`;
    const response = await axios.post(
      apiUrl,
      { imgUrl: oldPicUrl },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      const newPhoto = response.data;
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
        <div className="columns is-variable is-7 mt-3">
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
      originalImage.apiStatus === apiStatusConstants.success &&
      restoredImage.apiStatus === apiStatusConstants.success
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
          <div className="columns is-variable is-1 mt-1">
            <div className="column is-12 is-6-desktop">
              <button
                onClick={() => {
                  setOriginalImage({
                    apiStatus: apiStatusConstants.initial,
                    url: null,
                    error: null,
                  });
                  setRestoredImage({
                    apiStatus: apiStatusConstants.initial,
                    url: null,
                    error: null,
                  });
                }}
                className="button is-rounded is-black has-text-weight-bold is-size-6 px-4 py-3"
              >
                Upload New Photo
              </button>
            </div>
            <div className="column is-12 is-6-desktop">
              <button
                onClick={() => {
                  const fileExtension = restoredImage.url.split(".").pop();
                  saveAs(restoredImage.url, `restoredImage.${fileExtension}`);
                }}
                className="button is-rounded has-text-weight-bold is-size-6 px-4 py-3"
              >
                Download Restored Photo
              </button>
            </div>
          </div>
        </div>
      );
    } else if (
      originalImage.apiStatus === apiStatusConstants.success &&
      restoredImage.apiStatus !== apiStatusConstants.success
    ) {
      return (
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <div className="columns is-variable is-4">
            <div className="column is-12 is-6-desktop">
              <h1>Original Photo</h1>
              <img
                alt="original_photo"
                src={originalImage.url}
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
            if (uploadedFiles.length !== 0) {
              const image = uploadedFiles[0];
              const imageUrl = UrlBuilder.url({
                accountId: image.accountId,
                filePath: image.filePath,
                options: {
                  transformation: "preset",
                  transformationPreset: "thumbnail",
                },
              });
              setOriginalImage({
                apiStatus: apiStatusConstants.success,
                url: imageUrl,
                error: null,
              });
              generatePhoto(imageUrl);
            }
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
        className="mt-4 mb-6 pt-4 pb-6 is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-flex-grow-1 has-text-centered px-4"
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
