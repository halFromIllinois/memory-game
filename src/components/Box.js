import React from 'react';
import '../styles/Box.css'
import PropTypes from 'prop-types';

const Box = ({color="", index, addVisId}) => {

  Box.propTypes = {
    index: PropTypes.number,
    color: PropTypes.string,
    addVisId: PropTypes.func,
  }

  const id = `box${index}`;
  const visStyle = {backgroundColor: color, border: "outset 4px #383838"};

  return(
    <div id={id} className="Box" style={color !== "" ? visStyle : null} onClick={() => addVisId(index)}></div>
  )
}

export default Box;
