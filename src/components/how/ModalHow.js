import React from "react";
import ModalHowTop from "./ModalHowTop";
import ModalHowContent from "./ModalHowContent";
import ModalHowBottom from "./ModalHowBottom";
import "./modalHow.scss";

const ModalHow = (props) => {
  return (
    <>
      <ModalHowTop toggleModal={props.toggleModal} />
      <ModalHowContent />
      <ModalHowBottom toggleModal={props.toggleModal} />
    </>
  );
};

export default ModalHow;
