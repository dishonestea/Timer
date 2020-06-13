import React from 'react';
import './App.css';
import ting from './ting.wav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 300,
      isActive: false,
      isEnded: false
    };
  }

    secondUp = () => {
      this.setState((state, props) => ({
        timer: state.timer + 1
      }));
    }

    secondDown = () => {
      this.setState((state, props) => ({
        timer: state.timer - 1
      }));
    }

    minuteUp = () => {
      this.setState((state, props) => ({
        timer: state.timer + 60
      }));
    }

    minuteDown = () => {
      if(this.state.timer > 60){
      this.setState((state, props) => ({
        timer: state.timer - 60
      }));
    }
    }

    pauseClicked = () => {
      if (this.state.isActive === true && this.state.isEnded === false) {
        this.timerID = setInterval(
          () => this.secondDown(),
          1000);}
          else {
            clearInterval(this.timerID);
          }
      }

    resetClicked = () => {
    this.setState({
      timer: 300,
      isActive: false,
      isEnded: false
      });
      clearInterval(this.timerID);
    }
    
    pauseButton = () => {
      if(this.state.isEnded === false){
      this.setState(prevState => ({
        isActive: !prevState.isActive
      })
      , () => this.pauseClicked(),)
    }
    }

    showTime = () => {
      let minutes = Math.floor(this.state.timer/60);
      let seconds = this.state.timer%60;
      
      if(seconds > 9){
      return(
      <h1 className = 'largerFont'>{this.state.isEnded? "Time's Up" :
      `${minutes}:${seconds}`
    }</h1>);
  } else {
    return(
      <h1 className = 'largerFont'>{this.state.isEnded? "Time's Up" :
      `${minutes}:0${seconds}`
    }</h1>);
  }
  

    }
    
    componentDidUpdate() {
      if (this.state.timer <= 0 && this.state.isEnded === false) {
        
        clearInterval(this.timerID);
        this.setState({
          isActive: false,
          isEnded: true
        }, () => this.play());
      }
    }
     audio = new Audio(ting);

    play = () => {
      this.audio.play()
    }


  render() {

    return (
      <div className = 'App'>

        <h2 className = 'title'>Timer</h2>
        <div className = 'showtime'>{this.showTime()}</div>
        <div className = 'times'>
        <p className = 'tex'>Minutes</p>
        <div className = 'minutes'>
        <button className = 'timeButton plusButton' onClick={() => this.minuteUp()}>+</button>
        <button className = 'timeButton minusButton' onClick={() => this.minuteDown()}>-</button>
        </div>
        <p className = ' tex'>Seconds</p>
        <div className = 'seconds'>
        <button className = 'timeButton plusButton' onClick={() => this.secondUp()}>+</button>
        <button className = 'timeButton minusButton' onClick={() => this.secondDown()}>-</button>
        </div>
        </div>
        <div className = 'resume'>
        <button className = 'resumeButton' onClick={() => this.pauseButton()}>{this.state.isActive ? "Pause" : "Start"}</button>
        </div>
        <div className = 'reset'>
        <button className = 'resetButton' onClick={() => this.resetClicked()}>Reset</button>
        </div>
      </div>
    );
  }

}


export default App;
