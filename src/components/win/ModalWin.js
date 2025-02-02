import React from "react";

import StatsDisplay from "./StatsDisplay";
import WinCountries from "./GuessedCountries";
import GuessDistribution from "./GuessDistribution";
import ShareSection from "./ShareSection";

import "./modalWin.scss";
import Close from "../../assets/icons/close.svg";
const FocusTrap = require("focus-trap-react");

class ModalWin extends React.Component {
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
    let stats = JSON.parse(localStorage.getItem("stats"));
    let content;
    if (this.props.hasEnded) {
      content = (
        <>
          <StatsDisplay stats={stats} />
          <ShareSection
            {...this.props}
            totalGuessedCountries={stats.totalGuessedCountries}
          />
          <GuessDistribution
            tally={stats.tally}
            played={stats.played}
            currentScore={this.props.hasWon ? this.props.history.length : 11}
          />
          <WinCountries
            history={this.props.history}
            hasWon={this.props.hasWon}
          />
        </>
      );
    } else {
      content = (
        <>
          <StatsDisplay stats={stats} />
          <p className="info__text">
            finish playing today's game for sharing options
          </p>
          <GuessDistribution tally={stats.tally} played={stats.played} />
          <WinCountries history={this.props.history} hasWon={false} />
        </>
      );
    }

    return (
      <FocusTrap>
        <div
          className={
            "modal-backing" +
            (this.props.special ? " modal-backing--special" : "")
          }
          onClick={() => this.props.toggleModal()}
          onKeyDown={this.handleKeyDown}
        >
          <div
            className={"modal" + (this.props.special ? " modal--special" : "")}
            onClick={this.stopPropagation}
          >
            <div className="modal__title-bar">
              <h2>Results</h2>
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
            <div className="modal__body">{content}</div>
          </div>
        </div>
      </FocusTrap>
    );
  }
}

export default ModalWin;
