/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import "./Chip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
// import { FaPlus, FaTimes } from "react-icons/fa";

function Chip({ label, index, handleRemoveService }) {
  // const [showCloseIcon, setShowCloseIcon] = useState(false);

  const handleIconClick = () => {
    // setShowCloseIcon((prev) => !prev);
    handleRemoveService(index);
  };

  // const handleRemoveChip = () => {
  //   setShowCloseIcon(false);
  // };

  return (
    // <div className="chip-container">
    // <Container>
    //   <Row>
    // <Col lg={2}>
    // showCloseIcon ? "chip chip-active" : "chip"
    <div className={"chip chip-active"}>
      <FontAwesomeIcon
        icon={faAdd}
        style={{
          // color: "#A0C49D",
          marginRight: "10px",
          // showCloseIcon &&
          transform: "rotate(45deg)",
          transition: "all 100ms",
        }}
        size="lg"
        onClick={handleIconClick}
      />
      <span className="roboto-regular-14px-information">{label}</span>
    </div>
  );
}

export default Chip;
