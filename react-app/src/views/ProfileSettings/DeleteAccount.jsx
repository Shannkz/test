import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Header from "../../components/Navbar/Navbar";
import userIcon from "../../assets/images/profile-settings/user.svg";
import oldPasswordIcon from "../../assets/images/profile-settings/old-password.svg";
import confirmPasswordIcon from "../../assets/images/profile-settings/confirm-password.svg";
import questionIcon from "../../assets/images/profile-settings/question.svg";

// import profile_bg from "../../assets/images/profile-settings/profile-bg.svg";
import "./ProfileSettings.css";
import Footer from "../../components/Footer/Footer";
import TabNavigation from "../../components/TabNavigation/TabNavigation";
import { secure_instance } from "../../axios/axios-config";
import { deleteCookie } from "../../utilities/utils";

const reasons = ["I want to", "I am not satisfied"];

function DeleteAccount() {
  const { Formik } = formik;
  const navigate = useNavigate();

  const [isFailedAlert, setIsFailedAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFailedAlertMessage, setIsFailedAlertMessage] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const initialValues = {
    password: "",
    confirm_password: "",
    delete_reason: "",
    // old_password: "",
  };

  const Schema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(5, "Your password is too short."),
    confirm_password: Yup.string()
      .required("Passwords must match")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    delete_reason: Yup.string().required("Reason to leave is required"),
  });

  const handleFailedAlert = () => {
    setIsFailedAlert(true);
    setTimeout(() => {
      setIsFailedAlert(false);
    }, 4000);
  };

  const handleDeleteAccount = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await secure_instance.request({
        url: `/api/users/delete/`,
        method: "Post",
        data: {
          password: values.password,
          delete_reason: values.delete_reason,
        },
      });
      setLoading(false);
      deleteCookie("refresh_token");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error.response.data.status_code === 400) {
        setIsFailedAlertMessage("Password incorrect");
      }
      handleFailedAlert();
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <TabNavigation />

      <div className="profile-settings-banner d-flex align-items-center justify-content-between">
        <div style={{ marginLeft: "100px" }}>
          <div className="roboto-bold-36px-h1">Delete Account</div>
          <div className="roboto-regular-18px-body3">
            We are sorry to see you leave
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
        {isFailedAlertMessage !== null
          ? isFailedAlertMessage
          : "Something went wrong"}
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
              onSubmit={handleDeleteAccount}
              initialValues={initialValues}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Col lg={4}>
                    <Form.Group
                      className="form-group mb-4"
                      controlId="form3Example4"
                      style={{ position: "relative" }}
                    >
                      <Form.Label
                        className="roboto-medium-20px-body1 d-flex align-items-center"
                        style={{ marginBottom: "20px" }}
                      >
                        <img
                          src={oldPasswordIcon}
                          alt="commercialName"
                          style={{ marginRight: "16px" }}
                        />
                        Enter Password
                      </Form.Label>
                      <Form.Control
                        style={{ height: "56px" }}
                        className="hide-validation-icon lg-input-small-text"
                        name="password"
                        type="password"
                        size="lg"
                        placeholder="Enter Old Password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                      />
                      {/* {getVisibilityIcon()} */}
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group
                      className="form-group mb-4"
                      controlId="form3Example4"
                      style={{ position: "relative" }}
                    >
                      <Form.Label
                        className="roboto-medium-20px-body1 d-flex align-items-center"
                        style={{ marginBottom: "20px" }}
                      >
                        <img
                          src={oldPasswordIcon}
                          alt="commercialName"
                          style={{ marginRight: "16px" }}
                        />
                        Confirm Password
                      </Form.Label>

                      <Form.Control
                        style={{ height: "56px" }}
                        className="hide-validation-icon lg-input-small-text"
                        name="confirm_password"
                        type="password"
                        size="lg"
                        placeholder="Enter New Password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        isValid={
                          touched.confirm_password && !errors.confirm_password
                        }
                        isInvalid={!!errors.confirm_password}
                      />
                      {/* {getVisibilityIcon()} */}
                      <Form.Control.Feedback type="invalid">
                        {errors.confirm_password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg={4}>
                    <Form.Group
                      className="form-group mb-4"
                      controlId="form3Example4"
                      style={{ position: "relative" }}
                    >
                      <Form.Label
                        className="roboto-medium-20px-body1 d-flex align-items-center"
                        style={{ marginBottom: "20px" }}
                      >
                        <img
                          src={oldPasswordIcon}
                          alt="commercialName"
                          style={{ marginRight: "16px" }}
                        />
                        Why are you leaving?
                      </Form.Label>
                      <Form.Control
                        style={{ height: "56px" }}
                        className="hide-validation-icon lg-input-small-text"
                        name="delete_reason"
                        type="text"
                        size="lg"
                        placeholder="Let us know what made you leave"
                        value={values.delete_reason}
                        onChange={handleChange}
                        // isValid={
                        //   touched.delete_reason && !errors.delete_reason
                        // }
                        isInvalid={!!errors.delete_reason}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.delete_reason}
                      </Form.Control.Feedback>
                      {/* <Form.Select
                        aria-label="Default select example"
                        style={{ height: "56px" }}
                        name="reasonToLeave"
                        value={values.reasonToLeave || ""}
                        onChange={handleChange}
                        isInvalid={
                          touched.reasonToLeave && !!errors.reasonToLeave
                        }
                        className={errors.reasonToLeave ? "border-danger" : ""}
                      >
                        <option selected value hidden="true">
                          Select
                        </option>
                        {reasons.map((reason, index) => (
                          <option key={index} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </Form.Select> */}

                      {/* <Form.Control.Feedback type="invalid">
                        {errors.confirm_password}
                      </Form.Control.Feedback> */}
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
                        "Delete"
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

export default DeleteAccount;
