import { React } from "react";
import { DATA, CATEGORYTEXT, COUNTRYEMOJI } from "../../../assets/data";
// import Twemoji from "../../../assets/Twemoji";
import Twemoji from "react-twemoji";
import "./categoryDetails.scss";

//props: index
const CategoryDetails = ({ index }) => {
  const emojiFirst = COUNTRYEMOJI[CATEGORYTEXT[index][2]] || "";
  const emojiLast = COUNTRYEMOJI[CATEGORYTEXT[index][3]] || "";

  return (
    <div className="display__row display__details">
      <p className="details__description">{CATEGORYTEXT[index][1]}</p>
      <div className="details__countries">
        <span className="details__country">
          <Twemoji className="emoji emoji--medium">{emojiFirst}</Twemoji>
          <span>{DATA[CATEGORYTEXT[index][2]][0][1]}</span>
        </span>
        <span className="details__line"></span>
        <span className="details__country">
          <Twemoji className="emoji emoji--medium">{emojiLast}</Twemoji>
          <span>{DATA[CATEGORYTEXT[index][3]][0][1]}</span>
        </span>
      </div>
    </div>
  );
};

export default CategoryDetails;
