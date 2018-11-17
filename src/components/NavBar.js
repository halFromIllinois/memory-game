import React from 'react';
import '../styles/NavBar.css'

const NavBar = ({newGame, appTitle, winVisStyle, showWinModal}) => {
  return(
    <div
      className={showWinModal === true ?
        `NavBar ${winVisStyle}` :
          "NavBar"}
    >
      <h1 className="NavBar__title">
        {appTitle}
      </h1>
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
