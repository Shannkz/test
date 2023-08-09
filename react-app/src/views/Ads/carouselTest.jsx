/* eslint-disable react/button-has-type */
/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
// import * as formik from "formik";
// import * as Yup from "yup";
import Header from "../../components/Navbar/Navbar";
import InstaIcon from "../../assets/images/post-ad/insta-outlined.svg";
import FbIcon from "../../assets/images/post-ad/fb-outlined.svg";
import MapIcon from "../../assets/images/post-ad/map-filled.svg";
import one from "../../assets/images/post-ad/1.svg";
import two from "../../assets/images/post-ad/2.svg";
import three from "../../assets/images/post-ad/3.svg";
import TickIcon from "../../assets/images/post-ad/tick.svg";
// import deleteIcon from "../../assets/images/post-ad/delete.svg";
// import editIcon from "../../assets/images/post-ad/edit.svg";
// import gotoIcon from "../../assets/images/post-ad/goto.svg";
// import noAds from "../../assets/images/post-ad/no-ads.svg";

// import bannerBackgroundImg from "../../assets/images/profile-settings/ads-bg.svg";
// import confirmPasswordIcon from "../../assets/images/profile-settings/confirm-password.svg";
// import questionIcon from "../../assets/images/profile-settings/question.svg";

// import profile_bg from "../../assets/images/profile-settings/profile-bg.svg";
// import "./ProfileSettings.css";
import useEmblaCarousel from "embla-carousel-react";
import Footer from "../../components/Footer/Footer";
import TabNavigation from "../../components/TabNavigation/TabNavigation";
import { secure_instance } from "../../axios/axios-config";
import "./Ads.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/fontawesome-free-solid";
import useWindowDimensions from "../../utilities/hooks/useWindowDimension";
import imageByIndex from "../../components/Carousel/ImagesByIndex";
import image1 from "../../assets/images/carousel-img-1.svg";
import image2 from "../../assets/images/carousel-img-2.svg";
import image3 from "../../assets/images/carousel-img-3.svg";
import image4 from "../../assets/images/carousel-img-4.svg";

const CurrentAd = {
  id: 1,
  created_at: "2023-07-28T22:00:15.259177Z",
  updated_at: "2023-07-28T22:00:15.259487Z",
  website: "http://www.example.com",
  city: "string",
  street: "string",
  number: "string",
  full_address: "string",
  facebook: "http://www.example.com",
  instagram: "http://www.example.com",
  youtube: "http://www.example.com",
  tiktok: "http://www.example.com",
  twitter: "http://www.example.com",
  others: "http://www.example.com",
  offered_services: ["string"],
  company: 1,
  sub_category: 1,
  related_sub_categories: 1,
  country: 1,
  activation_countries: [1],
};

const offeredServices = [
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
  "In nulla ut volutpat",
];

const FAQs = [
  "Learning New Songs",
  "MC",
  "Learning New Songs",
  "MC",
  "Learning New Songs",
  "MC",
];

// const images = [image1, image2, image3, image4, image1, image2, image3, image4];
// const images = [image1, image2, image3, image4, image1, image2, image3, image4];
const images = [
  {
    image1: one,
    image2: two,
    image3: three,
  },
  {
    image1: three,
    image2: two,
    image3: one,
  },
  // Add more slides as needed...
];

// const slides = [
//   {
//     image1: one,
//     image2: two,
//     image3: three,
//   },
//   // Add more slides as needed...
// ];

export function DotButton(props) {
  const { selected, onClick } = props;

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      className={"embla__dot__view__ad".concat(
        selected ? " embla__dot__view__ad--selected" : ""
      )}
      type="button"
      onClick={onClick}
    />
  );
}

export function PrevButton(props) {
  const { enabled, onClick } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className="embla__button__view__ad embla__button__view__ad--prev"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
        <path
          fill="currentColor"
          d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z"
        />
      </svg>
    </button>
  );
}

export function NextButton(props) {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla__button__view__ad embla__button__view__ad--next"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
        <path
          fill="currentColor"
          d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z"
        />
      </svg>
    </button>
  );
}

function CarouselTest() {
  const navigate = useNavigate();
  const [carouselRef, embla] = useEmblaCarousel();
  // Group images into chunks of three
  const imageChunks = [];
  for (let i = 0; i < images.length; i += 3) {
    imageChunks.push(images.slice(i, i + 3));
  }

  // const { slides, options, componentToRender } = props;
  const options = { slidesToScroll: "auto", containScroll: "trimSnaps" };

  const SLIDE_COUNT = 25;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  const { width } = useWindowDimensions();

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  // const [emblaApi] = useEmblaCarousel(options)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const visibleDots = width < 1000 ? scrollSnaps.slice(0, 4) : scrollSnaps;

  return (
    <Container
      // fluid
      style={{ marginTop: "40px", marginBottom: "200px" }}
      className=""
    >
      <Row style={{ paddingBottom: "500px" }}>
        <Col lg={7}>
          <Row>
            <div className="carousel__container__view__ad">
              <div className="embla__view__ad">
                <div className="embla__viewport__view__ad" ref={emblaRef}>
                  <div className="embla__container__view__ad">
                    {images.map((slide, index) => (
                      <div key={index} className="carousel-slide">
                        <Row>
                          <Col
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                            className="main-image-container"
                          >
                            <img
                              src={slide.image1}
                              alt="image1"
                              className="main-image"
                            />
                          </Col>

                          <Col
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                            className="image-stack"
                          >
                            <img
                              src={slide.image2}
                              alt="Image2"
                              className="stacked-image"
                            />
                            <img
                              src={slide.image3}
                              alt="Image3"
                              className="stacked-image"
                            />
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </div>
                </div>
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
              </div>
            </div>
            {/* <div ref={carouselRef} className="carousel">
              {slides.map((slide, index) => (
                <div key={index} className="carousel-slide">
                  <Row>
                    <Col
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      className="main-image-container"
                    >
                      <img
                        src={slide.image1}
                        alt="image1"
                        className="main-image"
                      />
                    </Col>

                    <Col sm={6} md={6} lg={6} xl={6} className="image-stack">
                      <img
                        src={slide.image2}
                        alt="Image2"
                        className="stacked-image"
                      />
                      <img
                        src={slide.image3}
                        alt="Image3"
                        className="stacked-image"
                      />
                    </Col>
                  </Row>
                </div>
              ))}
            </div> */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CarouselTest;
