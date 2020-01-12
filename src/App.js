import React from 'react';
import './App.css';

function App() {
  return (<div className="App">
    <header className="App-header">
      <h1 className="app-title">
        Pomodoro Clock
      </h1>
    </header>
    <Pomodoro/>
    <footer></footer>
  </div>);
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
      timer: 0
    };
  }
  decrementTime = (element, elementName) => {
    if (element > 1) {
      this.setState((prevState, props) => {
        return {
          elementName: --prevState[elementName]
        }
      });
    }
  }
  incrementTime = (element, elementName) => {
    this.setState((prevState, props) => {
      return {
        elementName: ++prevState[elementName]
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
    if (this.state.active) {
      let incomplete = (this.state.end - Date.now());
      if (!incomplete) {
        return;
      }
      this.setState({
        timer: Math.floor(incomplete / 1000)
      });
    }
    window.requestAnimationFrame(this.update);
  };
  reset = () => {
    this.setState({
      active: false,
      start: 0,
      end: 0,
      timer: 0
    });
  }
  render() {
    return (<main>
      <Break break={this.state.break} decrementTime={this.decrementTime} incrementTime={this.incrementTime}/>
      <Session session={this.state.session} decrementTime={this.decrementTime} incrementTime={this.incrementTime}/>
      <Timer break={this.state.break} session={this.state.session} active={this.state.active} then={this.props.then} playPause={this.playPause} timer={this.state.timer} update={this.update} reset={this.reset}/>
    </main>);
  }
}
class Break extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick = (e) => {
    e.target.innerText === '-'
      ? this.props.decrementTime(this.props.break, 'break')
      : this.props.incrementTime(this.props.break, 'break')
  }
  render() {
    return (<div>
      <label id="break-label">
        <h2>Break Length</h2>
      </label>
      <button id="break-decrement" onClick={this.handleClick}>-</button>
      <span id="break-length">{this.props.break}</span>
      <button id="break-increment" onClick={this.handleClick}>+</button>
    </div>);
  }
}

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick = (e) => {
    e.target.innerText === '-'
      ? this.props.decrementTime(this.props.session, 'session')
      : this.props.incrementTime(this.props.session, 'session')
  }
  render() {
    return (<div>
      <label id="session-label">
        <h2>Session Length</h2>
      </label>
      <button id="session-decrement" onClick={this.handleClick}>-</button>
      <span id="session-length">{this.props.session}</span>
      <button id="session-increment" onClick={this.handleClick}>+</button>
    </div>);
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  displayTime = (time) => {
    if (time < 10) {
      return '0' + time;
    } else {
      return time;
    }
  }
  render() {
    const seconds = this.props.timer % 60;
    const minutes = Math.floor(this.props.timer / 60);

    return (<div>
      <label id="timer-label">
        <h2>Session</h2>
      </label>
      <h3 id="time-left">{`${this.displayTime(minutes)}:${this.displayTime(seconds)}`}</h3>
      <button id="start_stop" onClick={this.props.playPause}>Play / Pause</button>
      <button id="reset" onClick={this.props.reset}>Reset</button>
    </div>);
  }
}

export default App;
