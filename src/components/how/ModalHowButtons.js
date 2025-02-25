import React from "react";
import Faq from "../../assets/icons/faq.svg";
import Feedback from "../../assets/icons/feedback.svg";
import Table from "../../assets/icons/table.svg";

const ModalHowButtons = ({ toggleModal }) => {
  return (
    <>
      <div className="btn--chip__group">
        <button className="btn btn--chip" onClick={() => toggleModal(4)}>
          <img className="icons" src={Table} alt="Data Table" />
          <span>
            Explore <br />
            the data
          </span>
        </button>
        <button className="btn btn--chip" onClick={() => toggleModal(5)}>
          <img className="icons" src={Faq} alt="Frequently Asked Questions" />
          <span>
            Read <br />
            the FAQ
          </span>
        </button>

        <a
          className="btn btn--chip"
          target="_blank"
          rel="noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSf9NfB5E7mMjUAhYh-GrwS8uS1s3jZRQQ9dAP8_DB4OKmU16w/viewform?usp=sf_link"
        >
          <img className="icons" src={Feedback} alt="Feedback" />
          <span>
            Submit <br /> Feedback
          </span>
        </a>
      </div>
      <button
        onClick={() => toggleModal(0)}
        className="btn btn--wide btn--active btn--bottom"
      >
        Play Game
      </button>
    </>
  );
};

export default ModalHowButtons;
