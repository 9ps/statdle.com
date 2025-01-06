import React from "react";
import { COUNTRYEMOJI } from "../../assets/data";
import Twemoji from "react-twemoji";

// props: stats, hasWon
const GuessedCountries = (props) => {
  let countries = Object.entries(props.history).map((obj, index) => {
    const name = obj[1].name;
    const emoji = COUNTRYEMOJI[obj[1].code] || "";

    return (
      <div key={index} className="country-guess">
        <Twemoji className="emoji emoji--medium">{emoji}</Twemoji>
        <span>{name}</span>
      </div>
    );
  });

  return (
    <>
      {props.history.length !== 0 && (
        <h3 className="subtitle">Guessed Countries</h3>
      )}
      <div className="country-guess__container">{countries}</div>
    </>
  );
};

export default GuessedCountries;
