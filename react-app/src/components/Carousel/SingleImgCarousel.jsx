import React from "react";
import Carousel from "react-bootstrap/Carousel";
import loginImg1 from "../../assets/images/login-img-1.svg";
import loginImg2 from "../../assets/images/login-img-2.svg";
import loginImg3 from "../../assets/images/login-img-3.svg";
import "./Carousel.css";

function CarouselFadeExample() {
  return (
    <Carousel fade controls={false}>
      <Carousel.Item>
        <img
          // className="d-block w-100"
          src={loginImg1}
          style={{ maxWidth: "100%", objectFit: "cover" }}
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          // className="d-block w-100"
          src={loginImg2}
          alt="Second slide"
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          // className="d-block w-100"
          src={loginImg3}
          alt="Third slide"
        />

        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur. */}
        {/* </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
