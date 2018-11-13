import React from 'react';
import '../styles/Box.css'


const Box = ({color, key}) => {
  const id = `box${key}`;
  const style = {backgroundColor: color}

  return(
    <div id={id} className="Box" style={style}></div>
  )
}

export default Box;
