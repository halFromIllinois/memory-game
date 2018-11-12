import React from 'react';
import '../styles/StartGame.css'

const StartGame = ({startGame}) => {
  function transition() {
    let start = document.getElementById('startGame');
    start.classList.add('StartGame--fade-out');
    setTimeout(() => startGame(),500)
  }

  return (
    <div id="startGame" className="StartGame">
      <button className="StartGame__button button" type="button" onClick={transition}>START GAME</button>
    </div>
  )
}

export default StartGame;
