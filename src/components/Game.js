import React from 'react';
import NavBar from './NavBar';
import Box from './Box';
import WinModal from './WinModal';
import PropTypes from 'prop-types';
import '../styles/Game.css';

const Game = ({colors, newGame, addVisibleId, showWinModal,
            visibleIds, tempVisibleIds, appTitle}) => {

  //Todo-cosmetics: Game fade in, short randomized colors animation on new
  //  game using App.shuffle mehod and setInterval

  Game.propTypes = {
    colors: PropTypes.array,
    visibleIds: PropTypes.array,
    tempVisibleIds: PropTypes.array,
    newGame: PropTypes.func,
    addVisibleId: PropTypes.func,
    appTitle: PropTypes.string,
    showWinModal: PropTypes.bool
  }

  const boxes = colors.map((col, i) => (
    visibleIds.indexOf(i) !== -1 ?
      <Box
      key={i}
      index={i}
      color={col}
      addVisId={addVisibleId}
      visIds={visibleIds}/>
    : tempVisibleIds.indexOf(i) !== -1 ?
        <Box
        key={i}
        index={i}
        color={col}
        addVisId={addVisibleId}
        visIds={visibleIds}/>
      :
        <Box
        key={i}
        index={i}
        addVisId={addVisibleId}
        visIds={visibleIds} />
  ));

  const winVisStyle = "win-modal-visible";

  return(
    <div className="Game">

      {showWinModal === true ?
        <WinModal newGame={newGame}/>:
          null
      }
      <NavBar newGame={newGame}
              appTitle={appTitle}
              winVisStyle={winVisStyle}
              showWinModal={showWinModal}/>
      <div
        className={showWinModal === true ?
          `Game__container ${winVisStyle}` :
            "Game__container"}
      >
        <div className="Game__box-container">
          {boxes}
        </div>
      </div>
    </div>
  )

  }

export default Game;
