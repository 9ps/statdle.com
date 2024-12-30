import React from "react";
import "./guessHistory.scss";
import { COUNTRYEMOJI } from "../../assets/data";
// import Twemoji from "../../assets/Twemoji";
import Twemoji from "react-twemoji";

// props: num, code, ranks: [[100, 0], [200, 0], ...]

const GuessHistory = (props) => {
  const emoji = COUNTRYEMOJI[props.code] || "";
  const ranks = props.ranks.map((rank) => {
    if (rank[1]) {
      return <span className="guess active">{rank[0]}</span>;
    } else {
      return <span className="guess">{rank[0]}</span>;
    }
  });

  return (
    <div className="guess__container">
      <span>{props.num}</span>
      <Twemoji options={{ className: "emoji" }}>{emoji}</Twemoji>
      {ranks}
    </div>
  );
};

export default GuessHistory;
