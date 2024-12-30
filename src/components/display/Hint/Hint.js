import React, { useState, useEffect } from "react";
import { DATA, COUNTRYEMOJI } from "../../../assets/data";
import Twemoji from "react-twemoji";
import "./Hint.scss";

// props: hints=[this.state.history.validCountries, this.state.history.bestGuess] targets = [1,2,3,4], win
const Hint = (props) => {
  const [targetShown, setTargetShown] = useState(0);
  const [validCountriesShown, setValidCountriesShown] = useState(0);

  useEffect(() => {
    if (props.win) {
      setTargetShown(false);
      setValidCountriesShown(false);
    }
  }, [props.win]);

  const flipTargetShown = () => {
    setTargetShown(!targetShown);
  };

  const flipValidCountriesShown = () => {
    setValidCountriesShown(!validCountriesShown);
  };

  let validCountriesCount = 194;
  let bestGuessActive = false;
  let validCountriesActive = false;
  let ValidCountriesLeft = <></>;
  if (props.hints.length !== 0) {
    validCountriesCount = props.hints[0].validCountries.length;
    bestGuessActive = true;
    if (props.hints[0].validCountries.length < 30) {
      validCountriesActive = true;
      ValidCountriesLeft = props.hints[0].validCountries.map((country) => {
        return (
          <div className="valid-country">
            <Twemoji className="emoji valid-country__emoji">
              {COUNTRYEMOJI[country] || ""}
            </Twemoji>
            <span className="valid-country__name">{DATA[country][0][1]}</span>
          </div>
        );
      });
    }
  }

  const Targets = props.targets.map((element) => {
    return <span className="target">{`#${element}`}</span>;
  });

  return (
    <section>
      <details className="details__container">
        <summary className="details--primary">
          <span className="details__left">{`${validCountriesCount} Valid ${
            validCountriesCount === 1 ? "Country" : "Countries"
          } Left`}</span>
          <span className="details__right">Hints</span>
        </summary>

        <button className="details details--button" onClick={flipTargetShown}>
          <span className={props.win ? "details--disabled" : undefined}>
            Reveal Secret Country Ranks
          </span>
          <span className="details__right">{targetShown ? "-" : "+"}</span>
        </button>
        {targetShown ? (
          <div className="target__container details">
            <span className="target">Secret</span>
            {Targets}
          </div>
        ) : null}

        <button className="details details--button" onClick={props.doBestGuess}>
          <span
            className={
              !bestGuessActive || props.win ? "details--disabled" : undefined
            }
          >
            Make 2nd Best Guess
          </span>
          <span className="details__right">+</span>
        </button>

        <button
          className="details details--button"
          onClick={flipValidCountriesShown}
        >
          <span
            className={
              !validCountriesActive || props.win
                ? "details--disabled"
                : undefined
            }
          >
            Reveal Valid Countries Left
          </span>
          <span className="details__right">
            {validCountriesShown ? "-" : "+"}
          </span>
        </button>
        {validCountriesShown ? (
          <div className="valid-country__container details">
            {ValidCountriesLeft}
          </div>
        ) : null}
      </details>
    </section>
  );
};

export default Hint;
