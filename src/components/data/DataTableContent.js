import React from "react";
import { DATA, CATEGORYTEXT, VALUETEXT } from "../../assets/data";

const DataTableContent = (props) => {
  let categoryIndex = props.categoryIndex;
  const Table = Object.entries(DATA)
    .sort((a, b) => a[1][categoryIndex][0] - b[1][categoryIndex][0])
    .map((item) => {
      // Seperate handling for Country Alphabetically
      if (categoryIndex !== "0") {
        if (VALUETEXT[categoryIndex][0]) {
          return (
            <tr className="data__tr">
              <td className="data__td">{item[1][categoryIndex][0]}</td>
              <td className="data__td">{item[1][0][1]}</td>
              <td className="data__td">{parseFloat(item[1][categoryIndex][1]).toLocaleString()}</td>
            </tr>
          );
        } else {
          return (
            <tr className="data__tr">
              <td className="data__td">{item[1][categoryIndex][0]}</td>
              <td className="data__td">{item[1][0][1]}</td>
              <td className="data__td">{item[1][categoryIndex][1]}</td>
            </tr>
          );
        }
      } else {
        return (
          <tr className="data__tr">
            <td className="data__td">{item[1][categoryIndex][0]}</td>
            <td className="data__td">{item[1][0][1]}</td>
          </tr>
        );
      }
    });

  if (categoryIndex !== "0") {
    const valueMeasure =
      VALUETEXT[categoryIndex][1] + VALUETEXT[categoryIndex][2] === ""
        ? ""
        : " (" +
          VALUETEXT[categoryIndex][1] +
          VALUETEXT[categoryIndex][2] +
          " )";
    return (
      <div className="data__container">
        <div className="category-info__top">
          <small>{"DESCRIPTION: " + CATEGORYTEXT[categoryIndex][1]}</small>
          <br></br>
          <small>{"SOURCE: " + CATEGORYTEXT[categoryIndex][4]}</small>
          <br></br>
        </div>
        <table>
          <thead>
            <tr className="data__tr">
              <th className="data__th">#</th>
              <th className="data__th">Country</th>
              <th className="data__th">{"Value" + valueMeasure}</th>
            </tr>
          </thead>
          <tbody>{Table}</tbody>
        </table>
        <div className="category-info__bottom">
          <small>{"NOTES: " + CATEGORYTEXT[categoryIndex][5]}</small>
        </div>
      </div>
    );
  } else {
    return (
      <div className="data__container">
        <div className="category-info__top">
          <small>{"DESCRIPTION: " + CATEGORYTEXT[categoryIndex][1]}</small>
          <br></br>
          <small>{"SOURCE: " + CATEGORYTEXT[categoryIndex][4]}</small>
          <br></br>
        </div>
        <table>
          <thead>
            <tr className="data__tr">
              <th className="data__th">#</th>
              <th className="data__th">Country</th>
            </tr>
          </thead>
          <tbody>{Table}</tbody>
        </table>
        <div className="category-info__bottom">
          <small>{"NOTES: " + CATEGORYTEXT[categoryIndex][5]}</small>
        </div>
      </div>
    );
  }
};
export default DataTableContent;
