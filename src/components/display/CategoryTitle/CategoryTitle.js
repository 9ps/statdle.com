import { React } from "react";
import { CATEGORYTEXT } from "../../../assets/data";
import "./categoryTitle.scss";

//props: index
const CategoryTitle = (props) => {
  return (
    <div className="display__title">
      <button className={"title"} onClick={props.flipShowDetails}>
        <span className="title__left">{CATEGORYTEXT[props.index][0]}</span>
        <span className="title__right">{props.showDetails ? "-" : "+"}</span>
      </button>
    </div>
  );
};
export default CategoryTitle;
