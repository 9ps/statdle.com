import CategoryGroup from "../components/display/CategoryGroup/CategoryGroup.js";
import Hint from "../components/display/Hint/Hint.js";
import History from "../components/display/History/History.js";
import { React, useState } from "react";
import "./display.scss";

const Display = ({
  values,
  hasEnded,
  setHasHint,
  guessCount,
  doSearch,
  history,
}) => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const lastHistory = history.slice(-1)[0];

  const categories = Object.entries(
    hasEnded ? history[history.length - 1 - historyIndex].categories : values
  ).map((values, index) => {
    let active = [0, 0];
    if (values[1].activeRow === -2) {
      //win condition
      active = [1, 1];
    } else if (values[1].activeRow === 0) {
      active[0] = 2;
    } else if (values[1].activeRow === 1) {
      active[0] = 1;
    } else if (values[1].activeRow === 2) {
      active[1] = 1;
    } else if (values[1].activeRow === 3) {
      active[1] = 2;
    }
    return (
      <CategoryGroup
        active={active}
        values={values}
        key={index}
        index={index}
        guessCount={guessCount}
        historyIndex={historyIndex}
        hasEnded={hasEnded}
      />
    );
  });

  const doBestGuess = () => {
    if (lastHistory === undefined || hasEnded) {
      return;
    }
    setHasHint();
    doSearch(lastHistory.bestGuess[0]);
  };

  const handlePrev = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleNext = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const targets = Object.values(values).map((category) => category.target);

  return (
    <main className="main__container">
      <Hint
        targets={targets}
        hints={
          hasEnded ? history[history.length - 1 - historyIndex] : lastHistory
        }
        doBestGuess={doBestGuess}
        hasEnded={hasEnded}
        setHasHint={setHasHint}
      />
      {guessCount === 0 && (
        <section className="tip__container">
          <p className="tip__text">Today's Categories:</p>
        </section>
      )}
      <section>{categories}</section>
      {hasEnded && (
        <History
          handlePrev={handlePrev}
          handleNext={handleNext}
          disabledPrev={historyIndex === history.length - 1}
          disabledNext={historyIndex === 0}
        />
      )}
    </main>
  );
};

export default Display;
