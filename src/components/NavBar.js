import React from 'react';
import '../styles/NavBar.css'

const NavBar = ({newGame, appTitle}) => {
  return(
    <div className="NavBar">
      <h1 className="NavBar__title">{appTitle}</h1>
      <button
        onClick={newGame}
        type="button"
        className="button NavBar__new-game-button"
        >
          New Game
        </button>
    </div>
  )
}

export default NavBar;
