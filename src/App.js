import React, { Component } from 'react';
import './App.css';

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

  }

  getRandomColor(){
    const randIndex = Math.floor(Math.random() * (this.props.colors.length -1));
    const color = this.props.colors[randIndex];
    return color;
  }

  colorCount(color, arr){
    const newArr = arr.filter((val) => val === color);
    return newArr.length;
  }

  assignColors(){
    let colorArr = [];
    for(let i=0; i <= BOX_NUM; i++){
      let color = this.getRandomColor();

      if(colorArr.filter(val => val === color).length >= 2){
        console.log("entered if");
        while(colorArr.filter(val => val === color).length >= 2){
          color = this.getRandomColor();
        }
        colorArr.push(color);
        //function in loop causing issues. While loop trouble. 
      } else {
        console.log("entered else");
        colorArr.push(color);
      }
    }
    this.setState({assignedColors: colorArr});
  }

  render() {
    return (
      <div className="App">
        <button type="button" onClick={this.assignColors}>START</button>
      </div>
    );
  }
}



export default App;
