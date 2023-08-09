import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import * as formik from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import Header from "../../components/Navbar/Navbar";
import userIcon from "../../assets/images/profile-settings/user.svg";
import personIcon from "../../assets/images/profile-settings/person.svg";
import contactIcon from "../../assets/images/post-ad/contact.svg";

// import profile_bg from "../../assets/images/profile-settings/profile-bg.svg";
import "./ProfileSettings.css";
import Footer from "../../components/Footer/Footer";
import TabNavigation from "../../components/TabNavigation/TabNavigation";
import { secure_instance } from "../../axios/axios-config";

function PersonalInformation() {
  const { Formik } = formik;

  const [personalInfo, setPersonalInfo] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isFailedAlert, setIsFailedAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const initialValues = {
    person_firstName: personalInfo.first_name,
    person_lastName: personalInfo.last_name,
    person_number: personalInfo.phone,
  };

  const Schema = Yup.object().shape({
    person_firstName: Yup.string()
      .matches(/^[A-Za-z\s]{1,25}$/, "Invalid input")
      .required("Required"),
    person_lastName: Yup.string()
      .matches(/^[A-Za-z\s]{1,25}$/, "Invalid input")
      .required("Required"),
    person_number: Yup.string()
      .matches(/^\+?[0-9]{1,15}$/, "Invalid phone number")
      .required("Required"),
  });

  const getPersonalInfo = async () => {
    // console.log(values);

    const request = await secure_instance.request({
      url: "/api/users/me/",
      method: "Get",
    });
    setPersonalInfo(request.data.data);
  };

  const handleAlert = () => {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };
  const handleFailedAlert = () => {
    setIsFailedAlert(true);
    setTimeout(() => {
      setIsFailedAlert(false);
    }, 3000);
  };

  const handleUpdateUserInfo = async (values) => {
    try {
      setLoading(true);
      const request = await secure_instance.request({
        url: `/api/users/${user.userId}/`,
        method: "Patch",
        data: {
          first_name: values.person_firstName,
          last_name: values.person_lastName,
          phone: values.person_number,
        },
      });

      handleAlert();
      setPersonalInfo(request.data.data);
      setLoading(false);
    } catch (error) {
      handleFailedAlert();
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("whaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    getPersonalInfo();
  }, []);

  return (
    <>
      <Header />
      <TabNavigation />

      <div className="profile-settings-banner d-flex align-items-center justify-content-between">
        <div style={{ marginLeft: "100px" }}>
          <div className="roboto-bold-36px-h1">Personal Information</div>
          <div className="roboto-regular-18px-body3">
            Update your information with ease
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "100px",
            top: "-28px",
            display: "flex",
          }}
        >
          <div style={{ marginTop: "30px" }}>
            <img src={userIcon} alt="user" />
          </div>
        </div>
      </div>

      <Alert
        severity="success"
        variant="filled"
        style={{
          position: "fixed",
          top: isAlert ? "80px" : "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          transition: "ease 200ms",
          opacity: isAlert ? 1 : 0,
          // width: "150px",
        }}
      >
        Updated successfully
      </Alert>

      <Alert
        severity="error"
        variant="filled"
        style={{
          position: "fixed",
          top: isFailedAlert ? "80px" : "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          transition: "ease 200ms",
          opacity: isFailedAlert ? 1 : 0,
          // width: "150px",
        }}
      >
        Something went wrong
      </Alert>

      <Container
        fluid
        style={{ marginTop: "100px", marginBottom: "200px" }}
        className=""
      >
        <Row className="justify-content-center">
          <Col lg={10}>
            <Formik
              validationSchema={Schema}
              // onSubmit={handleNextStep}
              onSubmit={handleUpdateUserInfo}
              initialValues={initialValues}
              enableReinitialize
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Col lg={4}>
                    <Form.Group className="mb-4" controlId="form3Example3">
                      <Form.Label
                        className="roboto-medium-20px-body1 d-flex align-items-center"
                        style={{ marginBottom: "20px" }}
                      >
                        <img
                          src={personIcon}
                          alt="commercialName"
                          style={{ marginRight: "16px" }}
                        />
                        Contact Person Name
                      </Form.Label>
                      <Form.Control
                        style={{ height: "56px" }}
                        className="lg-input-small-text"
                        name="person_firstName"
                        type="text"
                        size="lg"
                        placeholder="Enter First Name"
                        value={values.person_firstName}
                        onChange={handleChange}
                        // isValid={touched.person_firstName && !errors.person_firstName}
                        isInvalid={!!errors.person_firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.person_firstName}
                      </Form.Control.Feedback>
                      <Form.Control
                        style={{ height: "56px" }}
                        className="lg-input-small-text mt-3"
                        name="person_lastName"
                        type="text"
                        size="lg"
                        placeholder="Enter Last Name"
                        value={values.person_lastName}
                        onChange={handleChange}
                        // isValid={touched.person_lastName && !errors.person_lastName}
                        isInvalid={!!errors.person_lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.person_lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group className="mb-3" controlId="form3Example4">
                      <Form.Label
                        className="roboto-medium-20px-body1 d-flex align-items-center"
                        style={{ marginBottom: "20px" }}
                      >
                        <img
                          src={contactIcon}
                          alt="commercialName"
                          style={{ marginRight: "16px" }}
                        />
                        Contact Person Number
                      </Form.Label>
                      <Form.Control
                        style={{ height: "56px" }}
                        className="lg-input-small-text"
                        name="person_number"
                        type="text"
                        size="lg"
                        placeholder="Enter Number"
                        value={values.person_number}
                        onChange={handleChange}
                        // isValid={touched.person_number && !errors.person_number}
                        isInvalid={!!errors.person_number}
                      />
                      {/* {getVisibilityIcon()} */}
                      <Form.Control.Feedback type="invalid">
                        {errors.person_number}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      disabled={loading}
                      // onClick={handleClickSubmit}
                      style={{ marginTop: "8rem", width: "30%" }}
                      className="btn btn-success roboto-semi-bold-16px-information btn-lg"
                    >
                      {loading ? (
                        // "Loading…"
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </Col>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default PersonalInformation;
