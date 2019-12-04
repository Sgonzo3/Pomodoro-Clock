import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppClock from './components/AppClock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 class="app-title">
          Pomodoro Clock
        </h1>
      </header>
      <main>
        <Break/>
        <Session/>
        <Timer/>
      </main>
      <footer>
      </footer>
    </div>
  );
}

class Break extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       value: 5,
     };
   }
   render(){
     return(
       <div>
         <label id="break-label">
           <span>"Break Length"</span>
         </label>
         <button id="break-decrement"></button>
         <span id="break-length">{this.state.value}</span>
         <button id="break-increment"></button>
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
