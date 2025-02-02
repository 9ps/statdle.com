import React from "react";
import { COUNTRYEMOJI } from "../../../assets/data";
import Twemoji from "react-twemoji";
import "./categoryRow.scss";

const CategoryRow = (props) => {
  const emoji = COUNTRYEMOJI[props.code] || "";
  const activeClass =
    props.active === 1
      ? "active active--" + props.categoryRank + (props.guessCount % 2)
      : "";
  return (
    <div className="display__row display__row--real">
      <span className={"display__cell position-symbol " + activeClass}>
        {props.direction}
      </span>
      <span className={"display__cell rank-number " + activeClass}>
        {props.rank ? "#" + props.rank : ""}
      </span>
      <span
        className={"display__cell country-name " + activeClass}
        onClick={props.flipShowValues}
      >
        <Twemoji className="emoji emoji--medium">{emoji}</Twemoji>
        <span>{props.showValues ? props.value : props.name}</span>
      </span>
    </div>
  );
};

export default CategoryRow;
