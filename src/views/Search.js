import React from "react";
import "./search.scss";
import { COUNTRYNAMES } from "../assets/data.js";

//props: history, hasEnded
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      autocompleteCountries: {},
      autocompleteIndex: -1,
      validCountry: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.autocompleteClick = this.autocompleteClick.bind(this);
    this.scrollToSelected = this.scrollToSelected.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.resetState = this.resetState.bind(this);

    this.searchInput = React.createRef();
    this.selectedSuggestion = React.createRef();
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  scrollToSelected() {
    if (this.state.autocompleteIndex !== -1) {
      this.selectedSuggestion.current.scrollIntoView();
    }
  }

  autocompleteClick(e) {
    this.setState({
      inputValue: e.target.textContent,
      autocompleteCountries: {},
      validCountry: true,
    });
  }

  handleKeyDown(e) {
    var autocompleteIndex = this.state.autocompleteIndex;
    const autocompleteCountries = Object.keys(this.state.autocompleteCountries);
    const autocompleteLength = autocompleteCountries.length;

    //Enter
    if (e.keyCode === 13) {
      this.handleSearch(e);
      return;
    }

    // required for UP, DOWN, etc ...
    if (autocompleteLength === 0) {
      return;
    }

    // UP
    if (e.keyCode === 38) {
      e.preventDefault();

      if (autocompleteIndex === -1 || autocompleteIndex === 0) {
        autocompleteIndex = autocompleteLength;
      }

      this.setState(
        {
          autocompleteIndex: autocompleteIndex - 1,
        },
        () => {
          this.scrollToSelected();
        }
      );
      return;
    }

    //DOWN
    if (e.keyCode === 40) {
      e.preventDefault();

      if (autocompleteIndex === autocompleteLength - 1) {
        autocompleteIndex = -1;
      }
      this.setState(
        {
          autocompleteIndex: autocompleteIndex + 1,
        },
        () => {
          this.scrollToSelected();
        }
      );
      return;
    }

    // HOME
    if (e.keyCode === 36) {
      e.preventDefault();

      this.setState(
        {
          autocompleteIndex: 0,
        },
        () => {
          this.scrollToSelected();
        }
      );
      return;
    }

    // END
    if (e.keyCode === 35) {
      e.preventDefault();

      this.setState(
        {
          autocompleteIndex: autocompleteLength - 1,
        },
        () => {
          this.scrollToSelected();
        }
      );

      this.scrollToSelected();
      return;
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      inputValue: e.target.value,
      autocompleteIndex: -1,
    });

    this.handleAutocomplete(e.target.value);
  }

  handleAutocomplete(str) {
    //if nothing in input
    if (str.length < 1) {
      this.setState({
        autocompleteCountries: {},
        validCountry: false,
      });
      return;
    }

    const reducedCountries = {};

    // add index 0 first
    Object.keys(COUNTRYNAMES).forEach((country) => {
      let testA = country.toLowerCase().search(str.toLowerCase());
      if (testA === 0) {
        reducedCountries[country] = testA;
      }
    });

    // now the stragglers
    Object.keys(COUNTRYNAMES).forEach((country) => {
      if (reducedCountries[country] !== 0) {
        let testB = country.toLowerCase().search(" " + str.toLowerCase());
        if (testB !== -1) {
          reducedCountries[country] = testB + 1;
        }
      }
    });

    //check if one autocomplete is left
    const validCountry =
      Object.keys(reducedCountries).length === 1 ? true : false;

    this.setState({
      autocompleteCountries: reducedCountries,
      validCountry: validCountry,
    });
  }

  handleSearch(e) {
    e.preventDefault();

    if (this.props.hasEnded) {
      return;
    }

    let autoCompleteCountries = Object.keys(this.state.autocompleteCountries);
    if (!this.state.validCountry && autoCompleteCountries.length !== 0) {
      let autocompleteIndex =
        this.state.autocompleteIndex === -1 ? 0 : this.state.autocompleteIndex;

      e.target.value = autoCompleteCountries[autocompleteIndex];
      // let autoCompleteCountries = {}
      let newAutoCompleteCountries = {
        [autoCompleteCountries[autocompleteIndex]]: Object.values(
          this.state.autocompleteCountries
        )[autocompleteIndex],
      };
      this.handleChange(e);
      this.setState({
        validCountry: true,
        autocompleteCountries: newAutoCompleteCountries,
      });
      return;
    }

    const searchItem =
      COUNTRYNAMES[this.state.inputValue] ??
      COUNTRYNAMES[autoCompleteCountries[0]] ??
      0;
    if (searchItem === 0) {
      this.props.togglePopup(2); //invalid
      this.resetState();
      return;
    }

    for (let i in this.props.history) {
      if (searchItem === this.props.history[i].code) {
        this.props.togglePopup(1); //duplicate
        this.resetState();
        return;
      }
    }
    this.props.doSearch(searchItem);
    this.resetState();
    return;
  }

  resetState() {
    this.setState({
      inputValue: "",
      autocompleteIndex: -1,
      autocompleteCountries: {},
      validCountry: false,
    });
  }

  render() {
    const suggestions = Object.entries(this.state.autocompleteCountries).map(
      (item, index) => {
        if (
          this.state.inputValue === item ||
          Object.keys(this.state.autocompleteCountries).length === 1 ||
          this.state.autocompleteIndex === index
        ) {
          return (
            <div
              role="option"
              aria-selected="true"
              key={item[0]}
              onClick={this.autocompleteClick}
              className="suggestion suggestion--selected"
              ref={this.selectedSuggestion}
            >
              {item[0]}
            </div>
          );
        } else {
          return (
            <div
              role="option"
              aria-selected="false"
              className="suggestion"
              key={item[0]}
              onClick={this.autocompleteClick}
            >
              {item[0].slice(0, item[1])}
              <span className="suggestion-match-text">
                {item[0].slice(item[1], this.state.inputValue.length + item[1])}
              </span>
              {item[0].slice(this.state.inputValue.length + item[1])}
            </div>
          );
        }
      }
    );

    return (
      <div className="search__container">
        <div
          role="listbox"
          aria-label="filtered countries"
          className="suggestion__container"
        >
          {suggestions}
        </div>
        <form className="form" onSubmit={this.handleSearch}>
          <input
            aria-label="Enter Country"
            type="text"
            placeholder="Enter a Country..."
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.inputValue}
            onKeyDown={this.handleKeyDown}
            disabled={this.props.hasEnded}
            aria-disabled={this.props.hasEnded}
            className={
              "country-search " +
              (this.props.hasEnded ? "country-search--disabled" : "")
            }
            ref={(inp) => (this.searchInput = inp)}
          ></input>

          <input
            type="submit"
            aria-label="guess"
            aria-disabled={this.props.hasEnded || !this.state.validCountry}
            className={
              "country-submit " +
              (this.state.validCountry
                ? "country-submit--active"
                : "country-submit--disabled")
            }
            value={`Guess [${this.props.guessCount}/10]`}
          />
        </form>
      </div>
    );
  }
}

export default Search;
