import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">
          Pomodoro Clock
        </h1>
      </header>
      <Pomodoro />
      <footer>
      </footer>
    </div>
  );
}
class Pomodoro extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       break: 5,
       session: 25,
       active: false,
       start: 0,
       end: 0,
       timer: 0,
     };
   }
   decrementTime = (element, elementName) => {
     if(element > 1) {
       this.setState((prevState, props)=> {
         return {
           elementName: --prevState[elementName],
         }
       });
     }
   }
   incrementTime = (element, elementName) => {
       this.setState((prevState, props) => {
         return {
           elementName: ++prevState[elementName],
         }
       });
   }
  playPause = () => {
     this.setState({
       active: !this.state.active,
       start: Date.now(),
       end: (this.state.session * 60000) + Date.now(),
       timer: (this.state.end - Date.now()) / 60000
     })
     this.update();
  }
  update = () => {
    let incomplete = (this.state.end - Date.now());

    if(!incomplete){
      return;
    }
    this.setState({
      timer: Math.floor(incomplete/1000),
    });
    window.requestAnimationFrame(this.update);
  };

  reset = () => {

  }

   render(){
     return(
       <main>
         <Break
           break={this.state.break}
           decrementTime={this.decrementTime}
           incrementTime={this.incrementTime}
           />
         <Session
           session={this.state.session}
           decrementTime={this.decrementTime}
           incrementTime={this.incrementTime}
           />
         <Timer
           break={this.state.break}
           session={this.state.session}
           active={this.state.active}
           then={this.props.then}
           playPause={this.playPause}
           timer={this.state.timer}
           update={this.update}
           />
       </main>
     );
   }
}
class Break extends React.Component {
   constructor(props) {
     super(props);
     this.state = {

     };
   }
   handleClick = (e) => {
     e.target.innerText === '-'
      ? this.props.decrementTime(this.props.break, 'break')
      : this.props.incrementTime(this.props.break, 'break')
   }
   render(){
     return(
       <div>
         <label id="break-label">
           <h2>Break Length</h2>
         </label>
         <button
           id="break-decrement"
           onClick={this.handleClick}
           >-</button>
         <span id="break-length">{this.props.break}</span>
         <button
           id="break-increment"
           onClick={this.handleClick}
           >+</button>
       </div>
     );
   }
}

class Session extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       value: 25,
     };
   }
   render(){
     return(
       <div>
         <label id="session-label">
           <span>"Session Length"</span>
         </label>
         <button id="session-decrement"></button>
        <span id="session-length">{this.state.value}</span>
         <button id="session-increment"></button>
       </div>
     );
   }
}

class Timer extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       value: 25,
     };
   }
   render(){
     return(
       <div>
         <label id="timer-label">
           <span>Session</span>
         </label>
         <AppClock id="time-left"/>
         <button id="start_stop">Play / Pause</button>
         <button id="reset">Reset</button>
       </div>
     );
   }
}



export default App;
