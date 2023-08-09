import { faAdd, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { secure_instance } from "../../axios/axios-config";

function VideoUploader({ videoToPreview, setVideoToUpload }) {
  const [video, setVideo] = useState(null);

  const uploadFileToCloud = async (uploadedVideo) => {
    // const videoToUpload = {
    //   file_name: uploadedVideo.name,
    //   content_type: uploadedVideo.type,
    //   upload_type: "video",
    // };
    const formData = new FormData(); // pass in the form
    formData.append("file", uploadedVideo);
    formData.append("content_type", uploadedVideo.type);

    try {
      const request = await secure_instance.request({
        url: "/api/ads/upload-url/",
        method: "Post",
        data: formData,
      });
      setVideoToUpload([request.data.data.file_url]);
    } catch (e) {
      // --------- WILL ROUTE ON SOME PAGE ON FAILURE ---------
      console.log("error", e);
    }
  };

  const handleVideoUpload = (event) => {
    const uploadedVideo = event.target.files[0];

    if (uploadedVideo && uploadedVideo.size <= 25000000) {
      const reader = new FileReader();

      reader.onload = () => {
        setVideo({
          file: uploadedVideo,
          previewURL: reader.result,
        });
      };
      // setparentVideoUploaded(uploadedVideo);
      uploadFileToCloud(uploadedVideo);

      console.log("uploadedVideo", uploadedVideo);
      reader.readAsDataURL(uploadedVideo);
    } else {
      // Handle video size error
      console.log("Video size should be less than or equal to 25MB");
    }
  };

  const removeVideo = () => {
    setVideo(null);
  };

  useEffect(() => {
    if (videoToPreview.length > 0) {
      setVideo(videoToPreview);
    }
  }, [videoToPreview]);

  console.log("video---->>", video);
  console.log("videoToPreview---->>", videoToPreview);

  return (
    <Container fluid style={{ marginTop: "40px" }}>
      <span className="roboto-medium-20px-body1">Upload Video</span>
      <div
        style={{
          maxWidth: "900px",
          border: "2px dashed #E3E3E4",
          padding: "16px",
        }}
      >
        <ul style={{ paddingLeft: "20px" }}>
          <li
            className="roboto-regular-16px-information"
            style={{ color: "#A9A8AA", lineHeight: "22px" }}
          >
            Upload a creative video showcasing your past work
          </li>
          <li
            className="roboto-regular-16px-information"
            style={{ color: "#A9A8AA", lineHeight: "22px" }}
          >
            Images can be upload in MP4 format
          </li>
          <li
            className="roboto-regular-16px-information"
            style={{ color: "#A9A8AA", lineHeight: "22px" }}
          >
            Size of images cannot exceed 25 Mb
          </li>
        </ul>

        <Button
          type="button"
          className="btn btn-success roboto-semi-bold-16px-information"
          style={{
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            height: "44px",
            marginBottom: "30px",
          }}
          // onClick={handleImagesUpload}
        >
          Upload Video
        </Button>

        {video !== null ? (
          <div
            style={{
              position: "relative",
              width: "145px",
              height: "126px",
            }}
          >
            <video
              style={{ width: "145px", height: "122px", objectFit: "cover" }}
              src={video.previewURL ?? video}
              controls
            />
            <button
              type="button"
              style={{ position: "absolute", top: "0", right: "0" }}
              className="upload-img-close-btn"
              onClick={removeVideo}
            >
              <FontAwesomeIcon
                icon={faClose}
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "5px",
                  color: "#FFF",
                }}
              />
            </button>
          </div>
        ) : (
          <div
            style={{
              border: "2px dashed #A0C49D",
              width: "141px",
              height: "122px",
            }}
          >
            <label
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "141px",
                height: "122px",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ display: "none" }}
              />
              <FontAwesomeIcon
                icon={faAdd}
                style={{
                  color: "#A0C49D",
                  width: "40px",
                  height: "40px",
                  marginRight: "10px",
                  marginBottom: "8px",
                }}
              />
            </label>
          </div>
        )}
      </div>
    </Container>
  );
}

export default VideoUploader;
