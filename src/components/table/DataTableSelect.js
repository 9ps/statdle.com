import React from "react";
import { CATEGORYTEXT } from "../../assets/data";

const DataTableSelect = (props) => {

  const handleCategoryChange = (event) => {
    props.setCategoryIndex(event.target.value);
  };

  const Options = CATEGORYTEXT.map((item, index) => {
    return (
      <option key={index} className="option" value={index}>{item[0]}
      </option>
    );
  });

  return (
    <div className="select__container">
      <select className="select" name="categories" value={Options[props.categoryIndex]?.value} onChange={handleCategoryChange}>{Options}</select>
    </div>
  );
};
export default DataTableSelect;