import React, { useState, useEffect } from "react";
import { DATA, COUNTRYEMOJI } from "../../../assets/data";
import Twemoji from "react-twemoji";
import "./Hint.scss";

// props: hints=[this.state.history.validCountries, this.state.history.bestGuess] targets = [1,2,3,4], hasEnded
const Hint = (props) => {
  const [targetShown, setTargetShown] = useState(0);
  const [validCountriesShown, setValidCountriesShown] = useState(0);

  useEffect(() => {
    if (props.hasEnded) {
      setTargetShown(false);
      setValidCountriesShown(false);
    }
  }, [props.hasEnded]);

  const flipTargetShown = () => {
    if (props.hasEnded) {
      setTargetShown(false);
      return;
    }
    setTargetShown(!targetShown);
    props.setHasHint();
  };

  const flipValidCountriesShown = () => {
    if (props.hasEnded) {
      setValidCountriesShown(false);
      return;
    }
    setValidCountriesShown(!validCountriesShown);
    props.setHasHint();
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
          <div className="valid-country" key={[country]}>
            <Twemoji className="emoji emoji--medium valid-country__emoji">
              {COUNTRYEMOJI[country] || ""}
            </Twemoji>
            <span className="valid-country__name">{DATA[country][0][1]}</span>
          </div>
        );
      });
    }
  }

  const Targets = props.targets.map((element) => {
    return <span className="target" key={element}>{`#${element}`}</span>;
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

        <div className="details__hints">
          <button className="details details--button" onClick={flipTargetShown}>
            <span className={props.hasEnded ? "details--disabled" : undefined}>
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

          <button
            className="details details--button"
            onClick={props.doBestGuess}
          >
            <span
              className={
                !bestGuessActive || props.hasEnded
                  ? "details--disabled"
                  : undefined
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
                !validCountriesActive || props.hasEnded
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
        </div>
      </details>
    </section>
  );
};

export default Hint;
