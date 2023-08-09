import React, { useState } from "react";
import "./Stepper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/fontawesome-free-solid";
import { useDispatch, useSelector } from "react-redux";
import { handleNextStep, handlePrevStep, setActiveStep } from "../../views/redux/Stepper/StepperSlice";

function StepperForm({ componentToRender }) {
  // const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const activeStep = useSelector((state) => state.stepper.activeStep);

  const handleClickNextStep = () => {
    dispatch(handleNextStep());
    // setActiveStep((prevStep) => prevStep + 1);
  };

  const handleClickPrevStep = () => {
    dispatch(handlePrevStep());
    // setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (step) => {
    dispatch(setActiveStep(step));
  };

  return (
    // <section className="signup-step-container">
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="wizard">
            <div className="wizard-inner" style={{ paddingRight: "30px" }}>
              <div className="connecting-line" />
              <ul className="nav nav-tabs justify-content-between" role="tablist">
                <li
                  role="presentation"
                  className={activeStep === 0 ? "active" : "disabled"}
                >
                  <a
                    href="#step1"
                    data-toggle="tab"
                    aria-controls="step1"
                    role="tab"
                    aria-expanded={activeStep === 0 ? "true" : "false"}
                    // onClick={() => handleStepClick(0)}
                    style={{ textDecoration: "none" }}
                  >
                    <span className="round-tab">
                      {activeStep === 0 ? <FontAwesomeIcon icon={faCheck} /> : ""}

                    </span>
                    <span
                      className="roboto-light-12px-information"
                      style={{
                        lineHeight: "100px",
                        listStyle: "none",
                        position: "absolute",
                        left: "-20px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Your details

                    </span>
                  </a>
                </li>
                <li
                  role="presentation"
                  className={activeStep === 1 ? "active" : "disabled"}
                >
                  <a
                    href="#step2"
                    data-toggle="tab"
                    aria-controls="step2"
                    role="tab"
                    aria-expanded={activeStep === 1 ? "true" : "false"}
                    // onClick={() => handleStepClick(1)}
                    style={{ textDecoration: "none" }}
                  >
                    <span className="round-tab">
                      {activeStep === 1 ? <FontAwesomeIcon icon={faCheck} /> : ""}
                    </span>
                    <span
                      className="roboto-light-12px-information"
                      style={{
                        lineHeight: "100px",
                        listStyle: "none",
                        position: "absolute",
                        right: "-70px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Company Details
                    </span>

                  </a>
                </li>
              </ul>
            </div>

            {componentToRender !== undefined && componentToRender(handleClickNextStep)}
            {/* <form
                action="index.html"
                className="login-box"
              >
                <div className="tab-content" id="main_form">
                  <div
                    className={`tab-pane ${activeStep === 0 ? "active" : ""}`}
                    role="tabpanel"
                    id="step1"
                  >
                    <h4 className="text-center">Step 1</h4>
                    <div className="row">
                      <h4>Step 1</h4>
                    </div>
                    <ul className="list-inline pull-right">
                      <li>
                        <button
                          type="button"
                          className="default-btn next-step"
                          onClick={handleNextStep}
                        >
                          Continue to next step
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`tab-pane ${activeStep === 1 ? "active" : ""}`}
                    role="tabpanel"
                    id="step2"
                  >
                    <h4 className="text-center">Step 2</h4>
                    <div className="row">
                      <div className="row">
                        <h4>Step 2</h4>
                      </div>
                    </div>

                    <ul className="list-inline pull-right">
                      <li>
                        <button
                          type="button"
                          className="default-btn prev-step"
                          onClick={handlePrevStep}
                        >
                          Back
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="default-btn next-step skip-btn"
                          onClick={handleNextStep}
                        >
                          Skip
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="default-btn next-step"
                          onClick={handleNextStep}
                        >
                          Continue
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="clearfix" />
                </div>
              </form> */}
          </div>
        </div>
      </div>
    </div>
    // </section>
  );
}

export default StepperForm;
