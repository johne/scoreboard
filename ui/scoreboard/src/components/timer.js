import React from "react";
import Countdown from "react-countdown-now";
import Sound from "react-sound";

// Random component

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
      return <span>{seconds}</span>;
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
              {milliseconds && (
                <React.Fragment>
                  .{Math.round(milliseconds / 100)}
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

  render() {
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
}

export default Timer;
