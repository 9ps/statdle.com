import React from "react";
import { COUNTRYEMOJI } from "../../assets/data";
import Twemoji from "react-twemoji";

const GuessedCountries = ({ history }) => {
  let countries = Object.entries(history).map((obj, index) => {
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
      {history.length !== 0 && <h3 className="subtitle">Guessed Countries</h3>}
      <div className="country-guess__container">{countries}</div>
    </>
  );
};

export default GuessedCountries;
