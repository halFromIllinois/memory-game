import React, { Component } from 'react';
import StartGame from './StartGame';
import Game from './Game';
import '../styles/App.css';

const BOX_NUM = 16;

class App extends Component {

  static defaultProps = {
    colors: ["#ff6f00", "#47e6e8", "#6d2ca1", "#e99cac",
            "#dfb746", "#85db42", "#1e1c95", "#5b1616"]
  }

  constructor(props){
    super(props);
    this.state={
      assignedColors: []
    }

    this.assignColors = this.assignColors.bind(this);
    this.getUniqueBoxCount = this.getUniqueBoxCount.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  // getRandomColor(){
  //   let randIndex = Math.floor(Math.random() * (this.props.colors.length));
  //   let color = this.props.colors[randIndex];
  //   return color;
  // }
  //
  // getColorCount(color, arr){
  //   const newArr = arr.filter((val) => val === color);
  //   return newArr.length;
  // }

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

  render() {
    return (
      <div className="App">
        { this.state.assignedColors.length===0 ?
            <StartGame startGame={this.assignColors}/> :
            <Game
            colors={this.state.assignedColors}
            newGame={this.assignColors}/>
        }
      </div>
    );
  }
}



export default App;
