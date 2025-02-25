import React from "react";
import { COUNTRYEMOJI } from "../../../assets/data";
import Twemoji from "react-twemoji";

const CategoryLine = (props) => {
  const emoji = COUNTRYEMOJI[props.code] || "";
  const activeClass =
    "active active--" + props.categoryRank + (props.guessCount % 2);
  return (
    <div className="display__row">
      <span className={"display__line " + activeClass}>
        <Twemoji className="emoji emoji--small">{emoji}</Twemoji>
        <span>
          is too {props.direction} (#{props.rank})
        </span>
      </span>
    </div>
  );
};

export default CategoryLine;
