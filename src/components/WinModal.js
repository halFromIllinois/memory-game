import React from 'react';
import '../styles/WinModal.css'
import PropTypes from 'prop-types';

//ToDo: High z-index congratts modal on top of game on Win
//    with new game button

//Todo-cosmetics: Keyframe animation to slide modal from top

//idea: map a congratulatory string into spans applying colors
//    assignedColors as different style for each index

const WinModal = ({newGame}) => {

  WinModal.propTypes = {
    newGame: PropTypes.func
  }


  return(
    <div></div>
  )
}

export default WinModal;
