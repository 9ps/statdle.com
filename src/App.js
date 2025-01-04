import React from "react";

import Search from "./views/Search";
import Display from "./views/Display";
import Top from "./views/Top";

import DataTable from "./components/table/DataTable";
import ModalHow from "./components/how/ModalHow";
import ModalWin from "./components/win/ModalWin";
import Popup from "./components/popup/Popup";
import Confetti from "./components/win/Confetti";

import {
  setupStats,
  setupStorageGame,
  setStorageGame,
  updateStorageGame,
  updateStorageStats,
  updateStorageHint,
} from "./services/storage";
import { seedTarget, populateCategories } from "./services/seeding";
import {
  evaluateCountry,
  parseValue,
  getBestGuess,
  getValidCountries,
} from "./services/logic";
import "./styles/_defaults.scss";

import { DATA } from "./assets/data";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.doSearch = this.doSearch.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateDisplayWin = this.updateDisplayWin.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.setHasHint = this.setHasHint.bind(this);

    this.state = {
      categories: {}, // {<categoryname>: {high: <0>, highName: <"">, low: <0> lowName: <""> target: <0>, activeRow: <0>}, ...}
      history: [], //[{name: "", correct: 0, range: N}, ...]
      modalType: 0, //0: "none", 1: "how" 2: "win from top" 3: "win", 4: "table" TODO
      popupType: 0, //0: "none", 1: "Already Guessed", 2: "Invalid Country", 3: "Copied to Clipboard"
      hasWon: false,
      hasHint: false,
      hasEnded: false,
      today: Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000) - 19101,
    };
  }

  componentDidMount() {
    // localStorage.clear(); //TEST
    // seedTest(); //TEST
    setupStats();
    this.setupGame();
  }

  /* pick target country and categories */
  setupGame() {
    const newState = setupStorageGame(this.state.today);
    this.setState(newState);
    if (Object.keys(newState).length === 7) {
      return;
    }

    const targetCountry = seedTarget(this.state.today);
    const populatedCategories = populateCategories(
      targetCountry,
      this.state.today
    );

    this.setState({
      categories: populatedCategories,
      targetCountry: targetCountry,
    });

    setStorageGame(targetCountry, populatedCategories, this.state.today);
  }

  /* logic and display changes for valid country submission */
  updateDisplay(newCountry) {
    let newCategories = { ...this.state.categories }; //creates a seperated copy
    let newValues = DATA[newCountry]; // {[], [], []...}
    let newHistory = {
      code: newCountry,
      name: newValues[0][1],
      correct: 0,
      range: [],
      validCountries: [],
      bestGuess: "",
    };
    let hasEnded = false;

    //win condition
    if (newCountry === this.state.targetCountry) {
      this.updateDisplayWin(newCategories, newHistory, newCountry, newValues);
      return;
    }

    if (this.state.history.length >= 9) {
      // lose condition
      updateStorageStats(
        this.state.hasWon,
        this.state.hasHint,
        this.state.history,
        this.state.today
      );
      this.togglePopup(5);
      this.toggleModal(3);
      hasEnded = true;
    }

    evaluateCountry(this.state.categories, newValues, newCountry, newHistory);

    newHistory.bestGuess = getBestGuess(newCategories);
    newHistory.validCountries = getValidCountries(newCategories);

    let finalHistory = this.state.history.concat(newHistory);

    this.setState({
      categories: newCategories,
      history: finalHistory,
      hasEnded: hasEnded,
    });

    updateStorageGame(newCategories, finalHistory, false, hasEnded);
  }

  updateDisplayWin(newCategories, newHistory, newCountry, newValues) {
    for (let i in Object.keys(this.state.categories)) {
      const categoryIndex = Object.keys(this.state.categories)[i];
      const category = this.state.categories[categoryIndex];
      const value = parseValue(
        newValues[categoryIndex][1],
        i,
        parseInt(Object.keys(this.state.categories)[i])
      );
      const name = newValues[0][1];

      newCategories[categoryIndex] = {
        high: category.target,
        highValues: [newCountry, name, value],
        low: category.target,
        lowValues: [newCountry, name, value],
        activeRow: -2,
      };
      newHistory.range.push(0);
    }
    newHistory.correct = 4;
    let finalHistory = this.state.history.concat(newHistory);

    this.setState(
      {
        categories: newCategories,
        history: finalHistory,
        hasWon: true,
        hasEnded: true,
      },
      () => {
        updateStorageStats(
          this.state.hasWon,
          this.state.hasHint,
          this.state.history,
          this.state.today
        );
        updateStorageGame(newCategories, finalHistory, true, true);
        this.togglePopup(4);
        this.toggleModal(3);
      }
    );
  }

  /* -------------------- */

  //input: 0: Duplicate Country, 1: Invalid Country, 2: Copied to Clipboard, 3: Well Done!, 4: Unlucky Champion!
  togglePopup(type = 0) {
    this.setState({
      popupType: type,
    });
  }

  // changes modal display - input: 0: "none", 1: "how" 2: "results" 3: "win", 4: "table"
  toggleModal(type = 0) {
    this.setState({
      modalType: type,
    });
  }

  doSearch(inp) {
    if (!inp) {
      this.togglePopup(2);
      return;
    } else if (this.state.hasEnded) {
      return;
    }

    this.updateDisplay(inp);
  }

  setHasHint() {
    updateStorageHint();
    this.setState({
      hasHint: true,
    });
  }

  /* -------------------- */

  render() {
    let modalDisplay = null;
    switch (this.state.modalType) {
      case 0:
        break;
      case 1:
        return <ModalHow toggleModal={this.toggleModal} />;
      case 2:
        modalDisplay = (
          <ModalWin
            toggleModal={this.toggleModal}
            togglePopup={this.togglePopup}
            targetCountry={this.state.targetCountry}
            categories={this.state.categories}
            history={this.state.history}
            special={false}
            hasWon={this.state.hasWon}
            hasEnded={this.state.hasEnded}
            today={this.state.today}
          />
        );
        break;
      case 3:
        modalDisplay = (
          <ModalWin
            toggleModal={this.toggleModal}
            togglePopup={this.togglePopup}
            targetCountry={this.state.targetCountry}
            categories={this.state.categories}
            history={this.state.history}
            special={true}
            hasWon={this.state.hasWon}
            hasEnded={this.state.hasEnded}
            today={this.state.today}
          />
        );
        break;
      case 4:
        return <DataTable toggleModal={this.toggleModal} />;
      default:
        break;
    }

    const popupDisplay = this.state.popupType ? (
      <Popup
        display={this.state.popupType}
        togglePopup={this.togglePopup}
        guessCount={this.state.history.length}
      />
    ) : null;

    return (
      <>
        <Confetti
          hasWon={this.state.hasWon}
          guessedCountries={this.state.history.map((item) => item.code)}
          supportsFlagEmoji={this.state.supportsFlagEmoji}
        />
        {popupDisplay}
        {modalDisplay}
        <Top toggleModal={this.toggleModal} />
        <Display
          values={this.state.categories}
          hints={this.state.history.slice(-1)}
          doSearch={this.doSearch}
          setHasHint={this.setHasHint}
          guessCount={this.state.history.length}
          hasWon={this.state.hasWon}
          today={this.state.today}
        />
        <Search
          doSearch={this.doSearch}
          togglePopup={this.togglePopup}
          history={this.state.history}
          hasEnded={this.state.hasEnded}
          guessCount={this.state.history.length}
        />
      </>
    );
  }
}

export default App;
