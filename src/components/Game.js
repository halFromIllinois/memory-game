import React, { Component } from 'react';
import NavBar from './NavBar';
import '../styles/Game.css'
import Box from './Box';
import PropTypes from 'prop-types';

// const Game = ({colors, newGame, appTitle}) => {
//   const boxes = colors.map((col, i) => (
//       <Box
//       className="Box"
//       key={i}
//       color={col} />
//   ));
//   return(
//     <div className="Game">
//       <NavBar newGame={newGame} appTitle={appTitle}/>
//       <div className="Game__container">
//         <div className="Game__box-container">
//           {boxes}
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export default Game;

class Game extends Component {

  static propTypes = {
    colors: PropTypes.array,
    newGame: PropTypes.func,
    appTitle: PropTypes.string
  }

  render() {
      const boxes = this.props.colors.map((col, i) => (
          <Box
          className="Box"
          key={i}
          color={col} />
      ));
      return(
        <div className="Game">
          <NavBar newGame={this.props.newGame}
                  appTitle={this.props.appTitle}/>
          <div className="Game__container">
            <div className="Game__box-container">
              {boxes}
            </div>
          </div>
        </div>
      )
    }
  }




export default Game;
