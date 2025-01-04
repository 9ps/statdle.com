import React from "react";
import StatsDisplay from "./StatsDisplay";
import WinCountries from "./GuessedCountries";
import "./modalWin.scss";
import Close from "../../assets/icons/close.svg";
import GuessDistribution from "./GuessDistribution";
import ShareSection from "./ShareSection";

const FocusTrap = require("focus-trap-react");

class ModalWin extends React.Component {
  constructor(props) {
    super(props);

    this.stopPropagation = this.stopPropagation.bind(this);
  }

  stopPropagation(e) {
    if (e) {
      e.stopPropagation();
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
          <WinCountries history={this.props.history} hasWon={false} />
          <p className="info__text">
            (finish playing the round for sharing options)
          </p>
          <GuessDistribution tally={stats.tally} played={stats.played} />
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
