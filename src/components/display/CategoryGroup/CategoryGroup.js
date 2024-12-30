import React, { useState } from "react";
import CategoryRow from "../CategoryRow/CategoryRow.js";
import CategoryTitle from "../CategoryTitle/CategoryTitle.js";
import CategoryDetails from "../CategoryDetails/CategoryDetails.js";
import "./categoryGroup.scss";
import CategoryLine from "../CategoryLine/CategoryLine.js";

// props: values[<catgoryName>, high, highname, low, lowName, target], active<[0, 0]>
const CategoryGroup = (props) => {
  const [showValues, setShowValues] = useState(
    props.values[0] === "1" ? true : false
  );
  const [showDetails, setShowDetails] = useState(null);
  const category = props.values[1];
  const flipShowValues = () => {
    if (category.highValues[0] || category.lowValues[0]) {
      setShowValues(!showValues);
    }
  };

  const flipShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const firstRound = props.values[1].activeRow === -1;

  const lineDirection =
    props.active[0] === 2 ? "high" : props.active[1] === 2 ? "low" : null;

  return (
    <div key={props.values[0]} className={"display__group"}>
      <CategoryTitle
        index={props.values[0]}
        flipShowDetails={flipShowDetails}
        showDetails={showDetails}
      />
      {showDetails ? (
        <CategoryDetails index={props.values[0]} firstRound={firstRound} />
      ) : null}

      {!firstRound && (
        <>
          <CategoryRow
            guessCount={props.guessCount}
            categoryRank={props.index}
            direction={"↓"}
            rank={category.high}
            code={category.highValues[0]}
            name={category.highValues[1]}
            value={category.highValues[2]}
            active={props.active[0]}
            flipShowValues={flipShowValues}
            showValues={showValues}
          />
          <CategoryRow
            guessCount={props.guessCount}
            categoryRank={props.index}
            direction={"↑"}
            rank={category.low}
            code={category.lowValues[0]}
            name={category.lowValues[1]}
            value={category.lowValues[2]}
            active={props.active[1]}
            flipShowValues={flipShowValues}
            showValues={showValues}
          />
          {category.line && (
            <CategoryLine
              guessCount={props.guessCount}
              categoryRank={props.index}
              direction={lineDirection}
              rank={category.line}
              code={category.lineValues[0]}
              name={category.lineValues[1]}
              active={props.active}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryGroup;
