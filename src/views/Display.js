import CategoryGroup from "../components/display/CategoryGroup/CategoryGroup.js";
import Hint from "../components/display/Hint/Hint.js";
import React from "react";
import "./display.scss";

//props: values={this.state.categories}, hint=[this.state.history.validCountries, this.state.history.bestGuess], win
const Display = (props) => {
  const categories = Object.entries(props.values).map((values, index) => {
    let active = [0, 0]; // LineThing, high, low, LineThing
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
        guessCount={props.guessCount}
      />
    );
  });

  let firstGuessNumber = <></>;
  let firstGuessTip = <></>;
  if (props.guessCount === 0) {
    firstGuessNumber = (
      <section className="tip__container">
        <p className="tip__text tip__text--small">{"#" + props.today}</p>

        <p className="tip__text tip__text--big">Today's Categories:</p>
      </section>
    );
    firstGuessTip = (
      <>
        <section className="tip__container">
          <p className="tip__text tip__text--bottom">
            Tip: Guess a country that would rank in the middle of today’s
            categories
          </p>
        </section>
      </>
    );
  }

  const doBestGuess = () => {
    if (props.hints === undefined) {
      return;
    }
    props.doSearch(props.hints[0].bestGuess[0]);
  };

  const targets = Object.values(props.values).map(
    (category) => category.target
  );

  return (
    <main className="main__container">
      <Hint
        targets={targets}
        hints={props.hints}
        doBestGuess={doBestGuess}
        win={props.win}
      />
      {firstGuessNumber}
      <section>{categories}</section>
      <div className="filler"></div>
      {firstGuessTip}
    </main>
  );
};

export default Display;
