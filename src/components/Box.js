import React from 'react';
import '../styles/Box.css'
import PropTypes from 'prop-types';

const Box = ({color, index, addVisId}) => {

  Box.propTypes = {
    index: PropTypes.number,
    color: PropTypes.string,
    addVisId: PropTypes.func,
  }

  const id = `box${index}`;
  const style = {backgroundColor: color}

  return(
    <div id={id} className="Box" style={style} onClick={() => addVisId(index)}></div>
  )
}

export default Box;
