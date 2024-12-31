import React from "react";
import { DATA, COUNTRYEMOJI } from "../../assets/data";
import Twemoji from "react-twemoji";

const num = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣"];
const col = ["🟪", "🟦", "🟩", "🟨", "🟧", "🟥"];

class ShareSection extends React.Component {
  constructor(props) {
    super(props);

    this.share = this.share.bind(this);
  }

  share(e) {
    // Get day of challenge
    const history = this.props.history;
    const guessAmount = this.props.win ? history.length : "X";
    var text =
      "#Statdle " + this.props.today + "\n" + guessAmount + "/10 Guesses\n";

    // need to loop through both categories, and

    for (let i = 0; i < history.length; i++) {
      text += num[history[i].correct];
      for (let j = 0; j < history[i].range.length; j++) {
        let difference = history[i].range[j];
        if (difference === 0) {
          text += col[0];
        } else if (difference <= 10) {
          text += col[1];
        } else if (difference <= 25) {
          text += col[2];
        } else if (difference <= 50) {
          text += col[3];
        } else if (difference <= 100) {
          text += col[4];
        } else if (difference > 100) {
          text += col[5];
        }
      }
      text += "\n";
    }

    text += "\nhttps://statdle.com/";

    navigator.clipboard.writeText(text);
    this.props.togglePopup(3);
  }

  render() {
    const countryCode = this.props.targetCountry;
    const countryName = DATA[countryCode][0][1];
    const emoji = COUNTRYEMOJI[countryCode] || "";
    const guessedBefore = this.props.totalGuessedCountries[countryCode] > 1;

    return (
      <div className="share-section">
        <h2 className="guess-count">
          <Twemoji className="emoji--large">{emoji}</Twemoji>
          {countryName}
        </h2>
        {guessedBefore && (
          <p className="info__text">
            You've guessed {countryName}{" "}
            {this.props.totalGuessedCountries[countryCode] - 1} times before
          </p>
        )}
        <button className="btn btn--wide btn--active" onClick={this.share}>
          Copy Results
        </button>
      </div>
    );
  }
}

export default ShareSection;
