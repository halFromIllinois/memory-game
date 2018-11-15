import React, { Component } from 'react';
import NavBar from './NavBar';
import Box from './Box';
import PropTypes from 'prop-types';
import '../styles/Game.css';

class Game extends Component {

  // Todo: refactor for dificulty. Not dependent on pairs but matchable variables
  //   set by the user.

  //Todo: Method for clearing all state variables and pass to NavBar for
    // new game on click

  //Todo-cosmetics: Game fade in, short randomized colors animation on new
  //  game using App.shuffle mehod and setInterval

  constructor(props){
    super(props);
    this.state = {
      visibleIds: [], //for matched boxes
      tempVisibleIds: [], //the index of boxes pending vis verification
      tempVisibleColors: [] //color counterpart to tempVisIds
    }
    this.addVisibleId = this.addVisibleId.bind(this);
    this.resetTempVisIds = this.resetTempVisIds.bind(this);
    this.updateTempVisIds = this.updateTempVisIds.bind(this);
    this.updateVisIds = this.updateVisIds.bind(this);
  }

  static propTypes = {
    colors: PropTypes.array,
    newGame: PropTypes.func,
    appTitle: PropTypes.string
  }

  //validates selection count and clears temp state
  resetTempVisIds(){
    if (this.state.tempVisibleIds.length >= 2) {
      setTimeout(()=> this.setState({tempVisibleIds: [], tempVisibleColors: []}), 300)
    }
  }

  //Updates temp state
  //Takes a call back argument so we can validate if we need to update visIds
  //  or clear temp state only
  updateTempVisIds(id, color, callback){
    this.setState({
      tempVisibleIds: [...this.state.tempVisibleIds, id],
      tempVisibleColors: [...this.state.tempVisibleColors, color]
    },
    () => callback(id,color));
  }

  //update visible ids and clears temp state
  updateVisIds(id, color){
    this.setState(
      {visibleIds: [...this.state.visibleIds, ...this.state.tempVisibleIds]},
      () => this.resetTempVisIds()
    )
  }

  // Takes the id assigned to the box from the colors.map in the render method
  // Gets color from colors with id argument
  // Calls the reset to validate only 2 boes are available
  // Updates the temp array with the correct callback
  addVisibleId(id){
    let color = this.props.colors[id];
    this.resetTempVisIds();
    (this.state.tempVisibleColors.indexOf(color) !== -1) ?
      this.updateTempVisIds(id, color, this.updateVisIds)
      :
      this.updateTempVisIds(id, color, this.resetTempVisIds)
  }

  render() {
      const boxes = this.props.colors.map((col, i) => (
        this.state.visibleIds.indexOf(i) !== -1 ?
          <Box
          key={i}
          index={i}
          color={col}
          addVisId={this.addVisibleId}
          visIds={this.state.visibleIds}/>
        : this.state.tempVisibleIds.indexOf(i) !== -1 ?
            <Box
            key={i}
            index={i}
            color={col}
            addVisId={this.addVisibleId}
            visIds={this.state.visibleIds}/>
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
