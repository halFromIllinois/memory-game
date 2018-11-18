import React, { Component } from 'react';
import StartGame from './StartGame';
import Game from './Game';
import '../styles/App.css';

const BOX_NUM = 16;

// Todo: refactor for dificulty. Not dependent on pairs but matchable variables
//   set by the user. BOX_NUM will be part of state.

//Todo-cosmetics: responsive design

class App extends Component {

  static defaultProps = {
    colors: ["#ff6f00", "#47e6e8", "#6d2ca1", "#e99cac",
            "#dfb746", "#85db42", "#1e1c95", "#5b1616"],
    appTitle: "Remember Me"
  }

  constructor(props){
    super(props);
    this.state={
      assignedColors: [],
      visibleIds: [], //for matched boxes
      tempVisibleIds: [], //the index of boxes pending vis verification
      tempVisibleColors: [], //color counterpart to tempVisIds
      showWinModal: false
    }

    this.addVisibleId = this.addVisibleId.bind(this);
    this.resetTempVisIds = this.resetTempVisIds.bind(this);
    this.updateTempVisIds = this.updateTempVisIds.bind(this);
    this.updateVisIds = this.updateVisIds.bind(this);
    this.assignColors = this.assignColors.bind(this);
    this.getUniqueBoxCount = this.getUniqueBoxCount.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.newGame = this.newGame.bind(this);
    this.validateWin = this.validateWin.bind(this)
  }

  shuffle(arr){
    for(let i = 0; i < arr.length; i++){
      let r = Math.floor(Math.random() * i);
      [arr[i], arr[r]] = [arr[r], arr[i]]
    }
    return arr;
  }

  /*
  Ensures all boxes are matchable and appropriate amount of colors are present,
    if not, reduces box count to accomdate amount of colors
  Todo: Refactor to account for dificulty levels, i.e. set_count rather
    than modulo 2 etc.
  */
  getUniqueBoxCount(){
    let validateBoxCount;
    if (BOX_NUM%2 !== 0){
      validateBoxCount = BOX_NUM - 1;
    } else if (BOX_NUM%2 === 0) {
      validateBoxCount = BOX_NUM;
    }
    while(validateBoxCount/this.props.colors.length > 2){
      validateBoxCount = validateBoxCount - 2;
    }
    return validateBoxCount/2;
  }

  //Assigns the correct amount of colors to the assigned colors state variable.
  //This is it's own method (rather than setting all colors in state by default)
  //in order to make validating and accounting for more boxes in adding a feature
  //for difficulty later
  assignColors(){
    const uniqueBoxCount = this.getUniqueBoxCount();
    let colorArr = [];
    for(let i=0; i < uniqueBoxCount; i++){
        colorArr.push(this.props.colors[i]);
    }
    let dupeArr = Array.from(colorArr);
    colorArr = this.shuffle(colorArr.concat(dupeArr));
    this.setState({assignedColors: colorArr});
  }

  newGame(){
    this.setState({visibleIds: [], tempVisibleIds: [], showWinModal: false});
    this.assignColors();
  }

  validateWin(){
    if (this.state.assignedColors.length <= this.state.visibleIds.length){
      this.setState({showWinModal: true});
    }
  }

  //validates selection count and clears temp state
  //calls validate win only if clearing tempId state - this might be a bad
  //  since we are relying on no mutation bugs to validate a win, but we
  //  are also halving the validateWin function calls, Possible refactor needed
  resetTempVisIds(){
    if (this.state.tempVisibleIds.length >= 2) {
      setTimeout(()=> this.setState(
        {tempVisibleIds: [], tempVisibleColors: []},
        () => this.validateWin()
      ),300)
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
  updateVisIds(){
    this.setState(
      {visibleIds: [...this.state.visibleIds, ...this.state.tempVisibleIds]},
      () => this.resetTempVisIds()
    )
  }

  // Takes the id assigned to the box from the colors.map in the render method
  // Gets color from colors with id argument
  // Calls the reset to validate only 2 boxes are available
  // Updates the temp array with the correct callback
  addVisibleId(id){
    if (this.state.visibleIds.indexOf(id) === -1 &&
            this.state.tempVisibleIds.indexOf(id) === -1){
      let color = this.state.assignedColors[id];
      this.resetTempVisIds();
      (this.state.tempVisibleColors.indexOf(color) !== -1) ?
        this.updateTempVisIds(id, color, this.updateVisIds)
        :
        this.updateTempVisIds(id, color, this.resetTempVisIds)
    } else {
      return 
    }

  }

  render() {
    return (
      <div className="App">
        { this.state.assignedColors.length===0 ?
            <StartGame startGame={this.newGame}/> :
            <Game
            colors={this.state.assignedColors}
            newGame={this.newGame}
            appTitle={this.props.appTitle}
            addVisibleId={this.addVisibleId}
            tempVisibleIds={this.state.tempVisibleIds}
            visibleIds={this.state.visibleIds}
            showWinModal={this.state.showWinModal}/>
        }
      </div>
    );
  }
}



export default App;
