import { React } from "react";
import { CATEGORYTEXT } from "../../../assets/data";
import "./categoryTitle.scss";

//props: index
const CategoryTitle = ({ flipShowDetails, index, showDetails }) => {
  return (
    <div className="display__title">
      <button className="title" onClick={flipShowDetails}>
        <span className="title__left">{CATEGORYTEXT[index][0]}</span>
        <span className="title__right">{showDetails ? "-" : "+"}</span>
      </button>
    </div>
  );
};
export default CategoryTitle;
