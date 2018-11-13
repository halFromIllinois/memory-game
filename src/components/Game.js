import React, { Component } from 'react';
import NavBar from './NavBar';
import Box from './Box';
import PropTypes from 'prop-types';
import '../styles/Game.css';

class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      visibleIds: []
    }
    this.addVisibleId = this.addVisibleId.bind(this);
  }

  static propTypes = {
    colors: PropTypes.array,
    newGame: PropTypes.func,
    appTitle: PropTypes.string
  }

  addVisibleId(id){
    this.setState({visibleIds: [...this.state.visibleIds, id]});
    //adding didmou/didupdate logic here and then validate for visibleIds>=2
    //and setTimeout for clearing visibleIds
  }

  render() {
      const boxes = this.props.colors.map((col, i) => (
        this.state.visibleIds.indexOf(i) !== -1 ?
          <Box
          key={i}
          index={i}
          color={col}
          addVisId={this.addVisibleId}
          visIds={this.state.visibleIds} />
        :
          <Box
          key={i}
          index={i}
          addVisId={this.addVisibleId}
          visIds={this.state.visibleIds} />
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
