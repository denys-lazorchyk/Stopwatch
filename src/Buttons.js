import React from "react";
import "./Buttons.css";
import PropTypes from "prop-types";
import Button from "./Button";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let numberOfClicks = 0;

const intervalIdClicks = setInterval(() => {
  numberOfClicks = 0;
}, 300);

class Buttons extends React.Component {
  static propTypes = {
    updateHours: PropTypes.func,
    updateMinutes: PropTypes.func,
    updateSeconds: PropTypes.func,
    getCurrentTime: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      running: false,
      intervalId: 0,
    };

    this.updateRunning = this.updateRunning.bind(this);
    this.updateStartStopButton = this.updateStartStopButton.bind(this);

    this.manageStartStop = this.manageStartStop.bind(this);
    this.manageReset = this.manageReset.bind(this);
    this.manageWait = this.manageWait.bind(this);

    this.update = this.update.bind(this);
  }

  updateRunning(newRunning) {
    this.setState({ running: newRunning });
  }

  updateStartStopButton() {
    this.updateRunning(false);
    clearInterval(this.state.intervalId);
  }

  manageStartStop() {
    const { hours, minutes, seconds } = this.props.getCurrentTime();
    const timerNew =
      new Date().getTime() -
      Number(hours) * hour -
      Number(minutes) * minute -
      Number(seconds) * second;

    if (this.state.running) {
      this.updateStartStopButton();
    } else {
      const interval = setInterval(() => {
        this.update(timerNew);
      }, 1000);

      this.setState({
        intervalIdClicks: intervalIdClicks,
      });
      this.setState({
        intervalId: interval,
      });
    }
  }

  manageReset() {
    this.updateStartStopButton();

    this.props.updateHours("00");
    this.props.updateMinutes("00");
    this.props.updateSeconds("00");
  }

  manageWait() {
    numberOfClicks++;

    if (numberOfClicks >= 2) {
      this.updateStartStopButton();
      numberOfClicks = 0;
    }
  }

  update(start) {
    const current = new Date().getTime() - start;

    this.updateRunning(true);

    const textHour = Math.floor((current % day) / hour);
    const textMinute = Math.floor((current % hour) / minute);
    const textSecond = Math.floor((current % minute) / second);

    console.log(50, textHour, textMinute, textSecond);

    if (textHour === 99 && textMinute === 59 && textSecond === 59) {
      this.updateEndStopButton();
    }

    this.props.updateHours(textHour > 9 ? textHour : "0" + textHour);
    this.props.updateMinutes(textMinute > 9 ? textMinute : "0" + textMinute);
    this.props.updateSeconds(textSecond > 9 ? textSecond : "0" + textSecond);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalIdTime);
    clearInterval(intervalIdClicks);
  }

  render() {
    return (
      <div className="buttons">
        <Button
          name={!this.state.running ? "start" : "stop"}
          sClass="start-stop"
          clickHandle={this.manageStartStop}
        />
        <Button name="reset" sClass="reset" clickHandle={this.manageReset} />
        <Button name="wait" sClass="wait" clickHandle={this.manageWait} />
      </div>
    );
  }
}

export default Buttons;
