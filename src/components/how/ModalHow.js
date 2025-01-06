import React from "react";

import ModalHowContent from "./ModalHowContent";
import Close from "../../assets/icons/close.svg";
import "./modalHow.scss";

const FocusTrap = require("focus-trap-react");

class ModalHow extends React.Component {
  constructor(props) {
    super(props);

    this.stopPropagation = this.stopPropagation.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  stopPropagation(e) {
    if (e) {
      e.stopPropagation();
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) {
      this.props.toggleModal();
      return;
    }
  }

  render() {
    return (
      <FocusTrap>
        <div
          className="modal-backing"
          onClick={() => this.props.toggleModal()}
          onKeyDown={this.handleKeyDown}
        >
          <div className="modal" onClick={this.stopPropagation}>
            <div className="modal__title-bar">
              <h2>How to Play</h2>
              <button
                className="btn btn--icon"
                onClick={() => this.props.toggleModal()}
              >
                <img
                  className="icons"
                  src={Close}
                  alt="Close"
                  aria-label="close"
                />
              </button>
            </div>
            <div className="modal__body">
              {/* <ModalHowTop toggleModal={props.toggleModal} /> */}
              <ModalHowContent toggleModal={this.props.toggleModal} />
            </div>
          </div>
        </div>
      </FocusTrap>
    );
  }
}

export default ModalHow;
