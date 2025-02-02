import React from "react";
import ModalHowExamples from "./ModalHowExamples";
import ModalHowButtons from "./ModalHowButtons";

const ModalHowContent = ({ toggleModal }) => {
  return (
    <>
      <p className="modal__subtitle">
        Guess the Secret Country using Statistics!
      </p>
      <ModalHowExamples />
      <ModalHowButtons toggleModal={toggleModal} />
    </>
  );
};

export default ModalHowContent;
