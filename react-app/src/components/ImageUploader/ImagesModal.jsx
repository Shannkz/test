import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import "../../views/Login/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faClose } from "@fortawesome/free-solid-svg-icons";
import { secure_instance } from "../../axios/axios-config";
function ImagesModal({
  setparentImagesUploadedImages,
  setImagesError,
  imagesToUpload,
  setImagesToUpload,
  showModal,
  handleClose,
  imagesError,
  setShowImagesModal,
  uploadedImages,
}) {
  const [images, setImages] = useState([]);

  // const toggleImagesModal = (event, image) => {
  //   setShowImagesModal(true);
  //   console.log({ images });
  // };

  const uploadFileToCloud = async (uploadedImage) => {
    const formData = new FormData(); // pass in the form
    formData.append("file", uploadedImage);
    formData.append("content_type", uploadedImage.type);

    try {
      const request = await secure_instance.request({
        url: "/api/ads/upload-url/",
        method: "Post",
        data: formData,
      });

      setImagesToUpload([...imagesToUpload, request.data.data.file_url]);
      // setImageUrlToUpload(response.data.data);
    } catch (e) {
      // --------- WILL ROUTE ON SOME PAGE ON FAILURE ---------
      console.log("error", e);
    }
  };

  const handleImageUpload = (event, index) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    const updatedImages = [...images];

    const reader = new FileReader();

    reader.onload = () => {
      updatedImages.push({
        file: uploadedImage,
        previewURL: reader.result,
      });
      setImages(updatedImages);
    };
    console.log("uploadedImage", uploadedImage);
    uploadFileToCloud(uploadedImage);
    setparentImagesUploadedImages(updatedImages);

    // console.log("updatedImages inside image component", updatedImages);
    setImagesError(false);
    reader.readAsDataURL(uploadedImage);
  };

  const removeImage = async (image, index) => {
    const urlToDelete = imagesToUpload[index];

    try {
      const request = await secure_instance.request({
        url: "/api/ads/delete-url/",
        method: "Post",
        data: {
          url: urlToDelete,
        },
      });

      if (request.status_code === 200) {
        const imageIndex = images.indexOf(image);

        const cloneImages = [...images];

        if (imageIndex !== -1) {
          cloneImages.splice(index, 1);
        }

        setImages(cloneImages);
      }
    } catch (err) {}

    const imageIndex = images.indexOf(image);

    const cloneImages = [...images];

    if (imageIndex !== -1) {
      cloneImages.splice(index, 1);
    }

    setImages(cloneImages);
  };

  return (
    // <Modal
    //   show={showModal}
    //   onHide={handleClose}
    //   dialogClassName="modal-90w"
    //   aria-labelledby="example-custom-modal-styling-title"
    //   centered="true"
    // >
    //   <div className="box" style={{ position: "absolute", right: "0" }} />
    //   <div
    //     style={{
    //       position: "absolute",
    //       right: "10px",
    //       top: "8px",
    //       zIndex: "20",
    //     }}
    //   >
    //     <div role="presentation" onClick={handleClose} className="close-icon">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="18"
    //         height="18"
    //         viewBox="0 0 18 18"
    //         fill="none"
    //         style={{ cursor: "pointer" }}
    //       >
    //         <path
    //           d="M17 1L1 17M1 1L17 17"
    //           strokeWidth="2"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //         />
    //       </svg>
    //     </div>
    //   </div>

    <Container
      fluid
      style={{
        height: "auto",
        padding: "100px 50px",
        overflowY: "scroll",
        maxHeight: "700px",
      }}
    >
      <Row className="h-100 col-12 g-0 flex-column-reverse flex-md-row">
        <div className="d-flex" style={{ flexWrap: "wrap" }}>
          {images.map((image, index) => (
            <Col md={3} lg={3} key={index}>
              {/* {console.log({ index })} */}
              <div className="mb-5">
                {image !== null && (
                  <div
                    style={{
                      position: "relative",
                      border: "2px dotted #386C34",
                      width: "145px",
                      height: "126px",
                    }}
                  >
                    <img
                      src={image.previewURL}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "141px",
                        height: "122px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                      style={{ position: "absolute", top: "0", right: "0" }}
                      className="upload-img-close-btn"
                      onClick={() => removeImage(image, index)}
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
                )}
              </div>
            </Col>
          ))}
          <div
            style={{
              border: "2px dashed #A0C49D",
              width: "141px",
              height: "122px",
            }}
          >
            <label
              htmlFor={`file-input`}
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "141px",
                height: "122px",
                cursor: "pointer",
              }}
            >
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
            <input
              id={`file-input`}
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event)}
              style={{ display: "none", border: "1px solid red" }}
            />
          </div>
        </div>
      </Row>
    </Container>
    // </Modal>
  );
}

export default ImagesModal;
