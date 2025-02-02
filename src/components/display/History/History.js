import React from "react";
import "./History.scss";
import "../../../styles/common/_nav.scss";
import Prev from "../../../assets/icons/prev.svg";
import Next from "../../../assets/icons/next.svg";

const History = ({ handlePrev, handleNext, disabledPrev, disabledNext }) => {
  return (
    <section className="history--container">
      <button
        onClick={handlePrev}
        disabled={disabledPrev}
        role="menuitem"
        aria-label="previous"
        tabIndex="0"
        className={`btn btn--icon history--prev ${
          disabledPrev ? "btn--disabled" : ""
        }`}
      >
        <img className="icons" src={Prev} alt="Previous" />
      </button>
      <button
        onClick={handleNext}
        disabled={disabledNext}
        role="menuitem"
        aria-label="next"
        tabIndex="0"
        className={`btn btn--icon history--next ${
          disabledNext ? "btn--disabled" : ""
        }`}
      >
        <img className="icons" src={Next} alt="Next" />
      </button>
    </section>
  );
};

export default History;
