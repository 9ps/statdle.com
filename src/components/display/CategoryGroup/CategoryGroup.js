import React, { useState } from "react";
import CategoryRow from "../CategoryRow/CategoryRow.js";
import CategoryTitle from "../CategoryTitle/CategoryTitle.js";
import CategoryDetails from "../CategoryDetails/CategoryDetails.js";
import "../../../styles/common/_row.scss";
import CategoryLine from "../CategoryLine/CategoryLine.js";

const CategoryGroup = ({
  values,
  active,
  guessCount,
  hasEnded,
  historyIndex,
  index,
}) => {
  const [showValues, setShowValues] = useState(
    values[0] === "1" ? true : false
  );
  const [showDetails, setShowDetails] = useState(0);
  const category = values[1];
  const flipShowValues = () => {
    if (category.highValues[0] || category.lowValues[0]) {
      setShowValues(!showValues);
    }
  };

  const flipShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const firstRound = values[1].activeRow === -1;
  const animationStage = hasEnded ? historyIndex : guessCount;

  const lineDirection =
    active[0] === 2 ? "high" : active[1] === 2 ? "low" : null;

  return (
    <div key={values[0]} className={"display__group"}>
      <CategoryTitle
        index={values[0]}
        flipShowDetails={flipShowDetails}
        showDetails={showDetails}
      />
      {showDetails ? (
        <CategoryDetails index={values[0]} firstRound={firstRound} />
      ) : null}

      {!firstRound && (
        <>
          <CategoryRow
            guessCount={animationStage}
            categoryRank={index}
            direction={"↓"}
            rank={category.high}
            code={category.highValues[0]}
            name={category.highValues[1]}
            value={category.highValues[2]}
            active={active[0]}
            flipShowValues={flipShowValues}
            showValues={showValues}
          />
          <CategoryRow
            guessCount={animationStage}
            categoryRank={index}
            direction={"↑"}
            rank={category.low}
            code={category.lowValues[0]}
            name={category.lowValues[1]}
            value={category.lowValues[2]}
            active={active[1]}
            flipShowValues={flipShowValues}
            showValues={showValues}
          />
          {category.line && (
            <CategoryLine
              guessCount={animationStage}
              categoryRank={index}
              direction={lineDirection}
              rank={category.line}
              code={category.lineValues[0]}
              name={category.lineValues[1]}
              active={active}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryGroup;
