import React from 'react';
import '../styles/WinModal.css'
import PropTypes from 'prop-types';

const WinModal = ({newGame}) => {

  WinModal.propTypes = {
    newGame: PropTypes.func
  }


  return(
    <div className="WinModal">
      <div className="WinModal__congrats-box">
        <h2 className="WinModal__win-message WinModal__win-message--h2">YOU WON!</h2>
        <h3 className="WinModal__win-message WinModal__win-message--h3">CONGRATULATIONS!</h3>
        <button className="WinModal__button" onClick={newGame}>PLAY AGAIN?</button>
      </div>
    </div>
  )
}

export default WinModal;
