import React from "react";
import moment from "moment";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { now: moment() };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ now: moment() });
    }, 10000);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  render = () => {
    const { now } = this.state;
    return <div>{now.format("h:mm a")}</div>;
  };
}

export default Clock;
