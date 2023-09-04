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
          fontSize: 65,
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
          paddingTop: "35px"
        }}
      >
        {now.tz("America/Phoenix").format("h:mm a")}
      </div>
    );
  };
}

export default Clock;
