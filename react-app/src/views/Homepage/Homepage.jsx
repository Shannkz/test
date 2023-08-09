// import React from 'react'

import {
  Button, Col, Container, Form, FormControl, InputGroup, Row,
} from "react-bootstrap";
import React from "react";
import Header from "../../components/Navbar/Navbar";
// import CarouselSlider from "../../components/Carousel/Carousel"
import EmblaCarousel from "../../components/Carousel/Carousel";
// import useWindowDimensions from "../../utilities/hooks/useWindowDimension";
import PlanYourEvents from "./PlanYourEvents";
// import { default as HeroImg } from '../logo.svg';
import "./Homepage.css";
import HeroSection from "./HeroSection";
import PremiumVenues from "./PremiumVenues";
import PremiumVendors from "./PremiumVendors";
import VendorsByCountry from "./VendorsByCOuntry";
import StartPlanning from "./StartPlanning";
import Footer from "../../components/Footer/Footer";
import Login from "../Login/Login";
import TopBanner from "../../components/TopBanner";
import ImagesModal from "../../components/ImageUploader/ImagesModal";

// import Register from "../Register/Register";

function Homepage() {
  return (
    <>
      <Login />
      {/* <Register /> */}
      <TopBanner />
      <Header />
      <HeroSection />
      <PremiumVenues />
      <PlanYourEvents />
      <PremiumVendors />
      <VendorsByCountry />
      <StartPlanning />
      <Footer />
    </>

  );
}

export default Homepage;
