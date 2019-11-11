import React from "react";
import moment from "moment-timezone";

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
    return (
      <div
        style={{
          color: "white",
          font: "Tahoma",
          fontSize: 29,
          fontWeight: "bold",
          textAlign: "center",
          paddingTop: 15,
          minHeight: 125,
          width: "100%"
        }}
      >
        {now.tz("America/Phoenix").format("h:mm a")}
      </div>
    );
  };
}

export default Clock;
