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
import { Alert } from "@mui/material";
import Header from "../../components/Navbar/Navbar";
import userIcon from "../../assets/images/profile-settings/user.svg";
import personIcon from "../../assets/images/profile-settings/person.svg";
import mapIcon from "../../assets/images/post-ad/map.svg";
import postalIcon from "../../assets/images/profile-settings/postal.svg";
import fiscalIcon from "../../assets/images/profile-settings/fiscal.svg";
import firmIcon from "../../assets/images/profile-settings/firm.svg";
import bankIcon from "../../assets/images/profile-settings/bank.svg";

// import profile_bg from "../../assets/images/profile-settings/profile-bg.svg";
import "./ProfileSettings.css";
import Footer from "../../components/Footer/Footer";
import TabNavigation from "../../components/TabNavigation/TabNavigation";
import { secure_instance } from "../../axios/axios-config";
import { useSelector } from "react-redux";

function CompanyInformationSettings() {
  const { Formik } = formik;

  const [countriesList, setCountries] = useState([]);

  const countryOptions = countriesList.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  const [companyInformation, setCompanyInformation] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isFailedAlert, setIsFailedAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const initialValues = {
    company_name: companyInformation.name,
    country: companyInformation.country,
    postal_code: companyInformation.postal_code,
    fiscal_code: companyInformation.fiscal_code,
    firm_number: companyInformation.firm_number,
    bank_name: companyInformation.bank_name,
    bank_iban: companyInformation.bank_iban,
    // municipality: companyInformation.municipality,
    // commune: companyInformation.commune,
  };

  // console.log(first);

  const Schema = Yup.object().shape({
    // person_name: Yup.string().matches(/^[A-Za-z\s]{1,25}$/, "Invalid input"),
    company_name: Yup.string()
      .max(25, "String must be at most 25 characters")
      .matches(/^[A-Za-z\s]*$/, "Only letters and spaces are allowed"),
    country: "",
    // municipality: Yup.string()
    //   .max(25, "String must be at most 25 characters")
    //   .matches(/^[A-Za-z\s]*$/, "Only letters and spaces are allowed"),
    // commune: Yup.string()
    //   .max(25, "String must be at most 25 characters")
    //   .matches(/^[A-Za-z\s]*$/, "Only letters and spaces are allowed"),
    postal_code: Yup.string().matches(
      /^\d{1,7}$/,
      "Only up to 7 digits are allowed"
    ),
    fiscal_code: Yup.string().matches(
      /^[a-zA-Z0-9]{1,11}$/,
      "Only up to 11 letters and digits are allowed"
    ),
    firm_number: Yup.string().matches(
      /^[\w/.]{1,11}$/,
      'Only up to 11 letters, digits, and "/." signs are allowed'
    ),
    bank_name: Yup.string().max(30, "Only up to 30 letters are allowed"),
    bank_iban: Yup.string().matches(
      /^[a-zA-Z0-9]{1,30}$/,
      "Only up to 30 letters and digits are allowed"
    ),
  });

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

  const handleUpdateCompanyInfo = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await secure_instance.request({
        url: `/api/companies/${user.userCompanyId}/`,
        method: "Patch",
        data: values,
      });
      handleAlert();
      setLoading(false);
    } catch (error) {
      handleFailedAlert();
      setLoading(false);
    }
  };

  const getCompanyInfo = async () => {
    // console.log(values);
    try {
      const request = await secure_instance.request({
        url: `/api/companies/${user.userCompanyId}/`,
        method: "Get",
      });
      setCompanyInformation(request.data.data);
    } catch (error) {
      handleFailedAlert();
    }
  };

  const listCountries = async () => {
    const request = await secure_instance.request({
      url: "/api/ads/country/",
      method: "Get",
    });
    // console.log(request.data);
    setCountries(request.data.data);
  };

  useEffect(() => {
    listCountries();
  }, []);

  useEffect(() => {
    console.log("whaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    getCompanyInfo();
  }, []);

  return (
    <>
      <Header />
      <TabNavigation />

      <div className="profile-settings-banner d-flex align-items-center justify-content-between">
        <div style={{ marginLeft: "100px" }}>
          <div className="roboto-bold-36px-h1">Company Information</div>
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
              onSubmit={handleUpdateCompanyInfo}
              initialValues={initialValues}
              enableReinitialize
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-5">
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
                          Name
                        </Form.Label>
                        <Form.Control
                          style={{ height: "56px" }}
                          className="lg-input-small-text"
                          name="company_name"
                          type="text"
                          size="lg"
                          placeholder="Enter Name"
                          value={values.company_name}
                          onChange={handleChange}
                          // isValid={touched.company_name && !errors.company_name}
                          isInvalid={!!errors.company_name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.company_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col lg={4}>
                      <Form.Group
                        className="form-group mb-3"
                        controlId="form3Example6"
                      >
                        <Form.Label
                          className="roboto-medium-20px-body1"
                          style={{ marginBottom: "20px" }}
                        >
                          <img
                            src={mapIcon}
                            alt="commercialName"
                            style={{ marginRight: "16px" }}
                          />
                          Country
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{
                            height: "56px",
                            border: "1px solid #797979",
                          }}
                          name="country"
                          value={values.country || ""}
                          onChange={handleChange}
                          // onBlur={handleBlur}
                          isValid={touched.country && !errors.country}
                          isInvalid={touched.country && !!errors.country}
                          className={errors.country ? "border-danger" : ""}
                        >
                          <option selected value hidden="true">
                            Select County
                          </option>
                          {countryOptions.map((county, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <option
                              key={index}
                              value={parseInt(county.value, 10)}
                            >
                              {county.label}
                            </option>
                          ))}
                        </Form.Select>
                        {errors?.country && (
                          <div className="text-danger">{errors.country}</div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-5">
                    <Col lg={4}>
                      <Form.Group
                        className="form-group mb-3"
                        controlId="form3Example4"
                      >
                        <Form.Label
                          className="roboto-medium-20px-body1 d-flex align-items-center"
                          style={{ marginBottom: "20px" }}
                        >
                          <img
                            src={postalIcon}
                            alt="commercialName"
                            style={{ marginRight: "16px" }}
                          />
                          Postal Code
                        </Form.Label>
                        <Form.Control
                          style={{ height: "56px" }}
                          className="lg-input-small-text"
                          name="postal_code"
                          type="text"
                          size="lg"
                          placeholder="Enter"
                          value={values.postal_code}
                          onChange={handleChange}
                          // isValid={touched.postal_code && !errors.postal_code}
                          isInvalid={!!errors.postal_code}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.postal_code}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group
                        className="form-group mb-3"
                        controlId="form3Example4"
                      >
                        <Form.Label
                          className="roboto-medium-20px-body1 d-flex align-items-center"
                          style={{ marginBottom: "20px" }}
                        >
                          <img
                            src={fiscalIcon}
                            alt="commercialName"
                            style={{ marginRight: "16px" }}
                          />
                          Fiscal Code
                        </Form.Label>
                        <Form.Control
                          style={{ height: "56px" }}
                          className="lg-input-small-text"
                          name="fiscal_code"
                          type="text"
                          size="lg"
                          placeholder="Enter"
                          value={values.fiscal_code}
                          onChange={handleChange}
                          // isValid={touched.fiscal_code && !errors.fiscal_code}
                          isInvalid={!!errors.fiscal_code}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fiscal_code}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col lg={4}>
                      <Form.Group
                        className="form-group mb-3"
                        controlId="form3Example4"
                      >
                        <Form.Label
                          className="roboto-medium-20px-body1 d-flex align-items-center"
                          style={{ marginBottom: "20px" }}
                        >
                          <img
                            src={firmIcon}
                            alt="commercialName"
                            style={{ marginRight: "16px" }}
                          />
                          Firm Number
                        </Form.Label>
                        <Form.Control
                          style={{ height: "56px" }}
                          className="lg-input-small-text"
                          name="firm_number"
                          type="text"
                          size="lg"
                          placeholder="Enter"
                          value={values.firm_number}
                          onChange={handleChange}
                          // isValid={touched.firm_number && !errors.firm_number}
                          isInvalid={!!errors.firm_number}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firm_number}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group
                        className="form-group mb-3"
                        controlId="form3Example4"
                      >
                        <Form.Label
                          className="roboto-medium-20px-body1 d-flex align-items-center"
                          style={{ marginBottom: "20px" }}
                        >
                          <img
                            src={bankIcon}
                            alt="commercialName"
                            style={{ marginRight: "16px" }}
                          />
                          Bank Name
                        </Form.Label>
                        <Form.Control
                          style={{ height: "56px" }}
                          className="lg-input-small-text"
                          name="bank_name"
                          type="text"
                          size="lg"
                          placeholder="Enter"
                          value={values.bank_name}
                          onChange={handleChange}
                          // isValid={touched.bank_name && !errors.bank_name}
                          isInvalid={!!errors.bank_name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.bank_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col lg={4}>
                      <Form.Group
                        className="form-group mb-3"
                        controlId="form3Example4"
                      >
                        <Form.Label
                          className="roboto-medium-20px-body1 d-flex align-items-center"
                          style={{ marginBottom: "20px" }}
                        >
                          <img
                            src={firmIcon}
                            alt="commercialName"
                            style={{ marginRight: "16px" }}
                          />
                          Bank IBAN
                        </Form.Label>
                        <Form.Control
                          style={{ height: "56px" }}
                          className="lg-input-small-text"
                          name="bank_iban"
                          type="text"
                          size="lg"
                          placeholder="Enter"
                          value={values.bank_iban}
                          onChange={handleChange}
                          // isValid={touched.bank_iban && !errors.bank_iban}
                          isInvalid={!!errors.bank_iban}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.bank_iban}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

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

export default CompanyInformationSettings;
