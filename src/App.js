import React from 'react';
import './App.css';
import ting from './ting.wav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 10,
      isActive: false,
      isEnded: false,
      counter: 0,
      initialTimeSet: 0,
      breakTimer: 5,
      isBreakStarted: false,
      isBreakActive: false,
      isBreakEnded: false

    };
  }

    setInitialTime = () => {
      if(this.state.initialTimeSet !== 0 && this.state.isActive === false && this.state.isEnded === false){
        this.setState(state => ({
          initialTimeSet: this.state.timer
        }))
      }
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

    breakSecondUp = () => {
      this.setState((state, props) => ({
        breakTimer: state.breakTimer + 1
      }));
    }

    breakSecondDown = () => {
      this.setState((state, props) => ({
        breakTimer: state.breakTimer - 1
      }));
    }

    breakMinuteUp = () => {
      this.setState((state, props) => ({
        breakTimer: state.breakTimer + 60
      }));
    }

    breakMinuteDown = () => {
      this.setState((state, props) => ({
        breakTimer: state.breakTimer - 60
      }));
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

      pauseBreakClicked = () => {
        if (this.state.isBreakActive === true && this.state.isBreakStarted === true) {
          this.timerID = setInterval(
            () => this.breakSecondDown(),
            1000);}
            else {
              clearInterval(this.timerID);
            }
        }

    resetClicked = () => {
    this.setState({
      timer: 300,
      isActive: false,
      isEnded: false,
      breakTimer: 100,
      isBreakStarted: false,
      isBreakActive: false,
      isBreakEnded: false
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

    pauseBreakButton = () => {
      if(this.state.isBreakStarted === true){
      this.setState(prevState => ({
        isBreakActive: !prevState.isBreakActive
      })
      , () => this.pauseBreakClicked(),)
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
    
 showBreakTime = () => {
  let minutes = Math.floor(this.state.breakTimer/60);
  let seconds = this.state.breakTimer%60;

  if(seconds > 9){
    return(
    <h1 className = 'largerFont'>{this.state.isBreakEnded? "Break time's Up" :
    `${minutes}:${seconds} (break)`
  }</h1>);
} else {
  return(
    <h1 className = 'largerFont'>{this.state.isBreakEnded? "Break time's Up" :
    `${minutes}:0${seconds} (break)`
  }</h1>);
}

}

    startBreak = () =>{
      this.play();
      this.pauseBreakClicked();
    }


    componentDidUpdate() {
      if (this.state.timer <= 0 && this.state.isEnded === false && this.state.isBreakStarted === false) {
        
        clearInterval(this.timerID);
        this.setState({
          isActive: false,
          isEnded: true,
          initialTimeSet: 0,
          isBreakStarted: true,
          isBreakActive: true,

        }, () => this.startBreak());
        this.setState(state => ({
          counter: state.counter + 1
        }));
      } else if(this.state.breakTimer <= 0 && this.state.isBreakEnded === false && this.state.isBreakStarted === true){

        clearInterval(this.timerID);
        this.setState({
          isBreakEnded: true
        }, () => this.play());

      }
    }
     audio = new Audio(ting);

    play = () => {
      this.audio.play()
    }

    counterImages = () => {
      let i = 0;
      let counterImages = [];
      for( i > 0; i < this.state.counter; i++){
        counterImages.push("#");
      }
      return counterImages;
    }

    pauseAndSetTime = () => {
      this.pauseButton();
      this.setInitialTime();
    }
    


  render() {

    return (
      <div className = 'App'>
        
        <h2 className = 'title'>Timer</h2>
        <p>{this.state.counter}</p>
        {this.state.isBreakStarted?
         <div>
        <div className = 'showtime'>{this.showBreakTime()}</div>
        <div className = 'times'>
        <p className = 'tex'>Minutes</p>
        <div className = 'minutes'>
        <button className = 'timeButton plusButton' onClick={() => this.breakMinuteUp()}>+</button>
        <button className = 'timeButton minusButton' onClick={() => this.breakMinuteDown()}>-</button>
        </div>
        <p className = ' tex'>Seconds</p>
        <div className = 'seconds'>
        <button className = 'timeButton plusButton' onClick={() => this.breakSecondUp()}>+</button>
        <button className = 'timeButton minusButton' onClick={() => this.breakSecondDown()}>-</button>
        </div>
        </div>
        <div className = 'resume'>
        <button className = 'resumeButton' onClick={() => this.pauseBreakButton()}>{this.state.isBreakActive ? "Pause" : "Start"}</button>
        </div>
        </div> 
          : 
        
        <div>
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
        </div>

        }
        
        <div className = 'reset'>
        <button className = 'resetButton' onClick={() => this.resetClicked()}>Reset</button>
        </div>
      </div>
    );
  }

}


export default App;
