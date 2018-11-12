import React from 'react';
import NavBar from './NavBar';

const Game = ({colors, newGame}) => {
  return(
    <div className="Game">
      <NavBar newGame={newGame}/>
      {/*render boxes in a method above and return here*/}
    </div>
  )
}

export default Game;
