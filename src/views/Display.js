import CategoryGroup from "../components/display/CategoryGroup/CategoryGroup.js";
import Hint from "../components/display/Hint/Hint.js";
import React from "react";
import "./display.scss";

//props: values={this.state.categories}, hint=[this.state.history.validCountries, this.state.history.bestGuess], win
const Display = ({
  values,
  hints,
  hasEnded,
  setHasHint,
  guessCount,
  doSearch,
  today,
}) => {
  const categories = Object.entries(values).map((values, index) => {
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
      />
    );
  });

  const doBestGuess = () => {
    if (hints === undefined || hasEnded) {
      return;
    }
    setHasHint();
    doSearch(hints[0].bestGuess[0]);
  };

  const targets = Object.values(values).map((category) => category.target);

  return (
    <main className="main__container">
      <Hint
        targets={targets}
        hints={hints}
        doBestGuess={doBestGuess}
        hasEnded={hasEnded}
        setHasHint={setHasHint}
      />
      {guessCount === 0 && (
        <section className="tip__container">
          <p className="tip__text tip__text--small">{"#" + today}</p>

          <p className="tip__text tip__text--big">Today's Categories:</p>
        </section>
      )}
      <section>{categories}</section>
      {/* <div className="filler"></div> */}
      {guessCount === 0 && (
        <section className="tip__container">
          <p className="tip__text tip__text--small">
            Tip: Guess a country that would rank in the middle of today’s
            categories
          </p>
        </section>
      )}
    </main>
  );
};

export default Display;
