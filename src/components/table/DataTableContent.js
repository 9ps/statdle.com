import React from "react";
import { DATA, CATEGORYTEXT, VALUETEXT, COUNTRYEMOJI } from "../../assets/data";
import Twemoji from "react-twemoji";
import "./dataTable.scss";

const DataTableContent = ({ categoryIndex }) => {
  const sortedData = Object.entries(DATA).sort(
    (a, b) => a[1][categoryIndex][0] - b[1][categoryIndex][0]
  );

  const renderValue = (item) => {
    const value = item[1][categoryIndex][1];
    return VALUETEXT[categoryIndex][0]
      ? parseFloat(value).toLocaleString()
      : value;
  };

  const Table = sortedData.map((item) => (
    <tr key={item[0]} className="data__tr">
      <td className="data__td">{item[1][categoryIndex][0]}</td>
      <td className="data__td">
        <Twemoji className="emoji emoji--medium">
          {COUNTRYEMOJI[item[0]]}
        </Twemoji>
        <span className="data__td--country">{item[1][0][1]}</span>
      </td>
      {categoryIndex !== "0" && (
        <td className="data__td">{renderValue(item)}</td>
      )}
    </tr>
  ));
  const valueSuffix =
    VALUETEXT[categoryIndex][1] + VALUETEXT[categoryIndex][2] === ""
      ? ""
      : " (" +
        VALUETEXT[categoryIndex][1] +
        VALUETEXT[categoryIndex][2].trim() +
        ")";

  const includeNotes = CATEGORYTEXT[categoryIndex][5] !== "";

  return (
    <div className="data__container">
      <div className="category-info__top">
        <small>{"DESCRIPTION: " + CATEGORYTEXT[categoryIndex][1]}</small>
        <br />
        <small>{"SOURCE: " + CATEGORYTEXT[categoryIndex][4]}</small>
        <br />
        {includeNotes && (
          <>
            <small>{"NOTES: " + CATEGORYTEXT[categoryIndex][5]}</small>
            <br />
          </>
        )}
      </div>
      <table>
        <thead>
          <tr className="data__tr">
            <th className="data__th">#</th>
            <th className="data__th">Country</th>
            {categoryIndex !== "0" && (
              <th className="data__th">{"Value" + valueSuffix}</th>
            )}
          </tr>
        </thead>
        <tbody>{Table}</tbody>
      </table>
    </div>
  );
};

export default DataTableContent;
