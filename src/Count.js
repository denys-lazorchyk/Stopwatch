import React from "react";
import Buttons from "./Buttons";
import "./Count.css";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    this.updateHours = this.updateHours.bind(this);
    this.updateMinutes = this.updateMinutes.bind(this);
    this.updateSeconds = this.updateSeconds.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
  }

  updateHours(newHours) {
    this.setState({ hours: newHours });
  }

  updateMinutes(newMinutes) {
    this.setState({ minutes: newMinutes });
  }

  updateSeconds(newSeconds) {
    this.setState({ seconds: newSeconds });
  }

  getCurrentTime() {
    return { ...this.state };
  }

  render() {
    return (
      <div className="main">
        <div className="measurements">
          <div>
            <h1 className="hours">{this.state.hours}</h1>
            <h2>Hours</h2>
          </div>
          <div>
            <h1>:</h1>
            <h2>&nbsp;</h2>
          </div>
          <div>
            <h1 className="minutes">{this.state.minutes}</h1>
            <h2>Minutes</h2>
          </div>
          <div>
            <h1>:</h1>
            <h2>&nbsp;</h2>
          </div>
          <div>
            <h1 className="seconds">{this.state.seconds}</h1>
            <h2>seconds</h2>
          </div>
        </div>
        <Buttons
          updateHours={this.updateHours}
          updateMinutes={this.updateMinutes}
          updateSeconds={this.updateSeconds}
          getCurrentTime={this.getCurrentTime}
        />
      </div>
    );
  }
}
