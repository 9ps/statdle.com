import React from "react";
import "../styles/common/_nav.scss";
import Help from "../assets/icons/help.svg";
import Results from "../assets/icons/results.svg";
import Table from "../assets/icons/table.svg";

const Top = (props) => {
  return (
    <nav className="nav" role="menubar">
      <h1 className="nav__item nav__left">↑↓ Statdle</h1>
      <div className="nav__item nav__right">
        <button
          role="menuitem"
          aria-label="data table"
          tabIndex="0"
          className="btn btn--icon"
          onClick={() => props.toggleModal(4)}
        >
          <img className="icons" src={Table} alt="Data Table" />
        </button>
        <button
          role="menuitem"
          aria-label="results"
          tabIndex="0"
          className="btn btn--icon"
          onClick={() => props.toggleModal(2)}
        >
          <img className="icons" src={Results} alt="Results" />
        </button>
        <button
          role="menuitem"
          aria-label="how to play"
          tabIndex="0"
          className="btn btn--icon"
          onClick={() => props.toggleModal(1)}
        >
          <img className="icons" src={Help} alt="How to Play" />
        </button>
      </div>
    </nav>
  );
};

export default Top;
