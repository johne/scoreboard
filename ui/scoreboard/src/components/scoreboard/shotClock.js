import React from "react";
import Countdown from "react-countdown-now";
import Sound from "react-sound";
import styled from "styled-components";

const ClockContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 210px;
  font-family: "Arial Narrow";
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
  animation-name: countdown ${props => props.seconds};
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

class ShotClock extends React.Component {
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

  renderer = ({ seconds, completed }) => {
    const { start, paused } = this.props;
    const now = new Date().getTime();

    if (completed) {
      // Render a completed state
      return <div style={{ height: "100%", backgroundColor: "red" }}>00</div>;
    } else {
      // Render a countdown
      return (
        <React.Fragment>
          <span>{this.pad(seconds + 1, 2)}</span>
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
    const { shotClockEnd, paused, start } = this.props;
    const now = new Date().getTime();

    console.log("shot clock:" + (now - shotClockEnd));

    return paused || now < start ? (
      <div style={{ height: "100%" }}>--</div>
    ) : now < shotClockEnd ? (
      <Countdown
        date={shotClockEnd}
        renderer={this.renderer}
        intervalDelay={0}
        precision={3}
      />
    ) : (
      <div style={{ height: "100%", backgroundColor: "red" }}>00</div>
    );
  }

  render() {
    return <ClockContainer>{this.renderTimer()}</ClockContainer>;
  }
}

export default ShotClock;
