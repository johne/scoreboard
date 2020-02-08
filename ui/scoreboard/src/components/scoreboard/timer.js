import React from "react";
import Countdown from "react-countdown-now";
import Sound from "react-sound";
import styled from "styled-components";

const ClockContainer = styled.div`
  text-align: center;
  width: 100%;
  color: white;
  font-size: 210px;
  font-family: "Arial Narrow";
  padding-top: 5px;
`;

const PauseCounter = styled.div`
  color: red;
  font-size: 100px;
  text-align: right;
  padding-right: 30px;
  position: absolute;
  bottom: 2px;
  right: 2px;
  animation-duration: 1.1s;
  animation-name: countdown${props => props.seconds};
  animation-timing-function: ease-in;
  
  @keyframes countdown${props => props.seconds} {
    from {
      transform: scale(0.5);
      transform-origin: 100% 100%;
    }
    to {
      transform: scale(2.5);
      transform-origin: 100% 100%;
    }
  }
`;

class Timer extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({});
    });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  completion = () => {
    const { onComplete } = this.props;

    if (this.interval) {
      clearInterval(this.interval);
    }

    return (
      <Sound
        url="air-horn.wav"
        autoLoad={true}
        volume={100}
        playFromPosition={0}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={onComplete}
      />
    );
  };

  pad = (n, width) => {
    const z = "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  startupRenderer = ({ seconds, completed }) => {
    if (completed) {
      return <React.Fragment />;
    } else {
      return <PauseCounter seconds={seconds}>{seconds + 1}</PauseCounter>;
    }
  };

  renderer = ({ minutes, seconds, completed, milliseconds }) => {
    const { start, paused } = this.props;
    const now = new Date().getTime();

    if (completed) {
      // Render a completed state
      return this.completion();
    } else {
      // Render a countdown
      return (
        <React.Fragment>
          {minutes === 0 ? (
            <span>
              {this.pad(seconds, 2)}
              {milliseconds !== undefined && (
                <React.Fragment>
                  .{Math.round(milliseconds + 1 / 100)}
                </React.Fragment>
              )}
            </span>
          ) : (
            <span>
              {this.pad(minutes, 2)}:{this.pad(seconds, 2)}
            </span>
          )}
          {start > now && !paused && (
            <Countdown
              date={start}
              renderer={this.startupRenderer}
              intervalDelay={0}
              precision={3}
            />
          )}
        </React.Fragment>
      );
    }
  };

  renderTimer() {
    const { end, start, paused, timeLeft } = this.props;
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = ((timeLeft % 60000) / 1000).toFixed(0);
    const milliseconds = parseInt(timeLeft % 1000);
    const now = new Date().getTime();

    return paused || now < start ? (
      this.renderer({ minutes, seconds, milliseconds })
    ) : now < end + 1000 ? (
      <Countdown
        date={end}
        renderer={this.renderer}
        intervalDelay={0}
        precision={3}
      />
    ) : (
      <div />
    );
  }

  render() {
    return <ClockContainer>{this.renderTimer()}</ClockContainer>;
  }
}

export default Timer;
