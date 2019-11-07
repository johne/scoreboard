import React from "react";
import moment from "moment";

class Paused extends React.Component {
  componentWillMount() {
    this.interval = setInterval(() => {
      const { start } = this.props;
      const then = moment(start);
      const now = moment();
      const countup = moment(now - then);
      const minutes = countup.format("mm");
      const seconds = countup.format("ss");
      const milliseconds = countup.format("SSS");

      this.setState({ minutes, seconds, milliseconds });
    }, 1000);
  }

  pad = (n, width) => {
    const z = "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { minutes, seconds, milliseconds } = this.state;

    return minutes === 0 ? (
      <span>
        {this.pad(seconds, 2)}.{Math.round(milliseconds / 100)}
      </span>
    ) : (
      <span>
        {minutes}:{this.pad(seconds, 2)}
      </span>
    );
  }
}

export default Paused;
