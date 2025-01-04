import React from "react";
import ModalHowExamples from "./ModalHowExamples";

const ModalHowContent = () => {
  return (
    <div className="how-container">
      <p className="modal__subtitle">
        Guess the Secret Country using Statistics!<br></br>A new game everyday,
        with 4 random categories.
      </p>
      <ModalHowExamples />

      <p className="modal__text">
        <a
          className="link"
          target="_blank"
          rel="noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSf9NfB5E7mMjUAhYh-GrwS8uS1s3jZRQQ9dAP8_DB4OKmU16w/viewform?usp=sf_link"
        >
          Feedback Form ＞
        </a>
      </p>
    </div>
  );
};

export default ModalHowContent;
