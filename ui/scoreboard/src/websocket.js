import React from "react";
import PropTypes from "prop-types";

class Websocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attempts: 0
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.setupWebsocket = this.setupWebsocket.bind(this);
    this.connect = this.connect.bind(this);
  }

  logging(logline) {
    if (this.props.debug === true) {
      console.log(logline);
    }
  }

  generateInterval(k) {
    if (this.props.reconnectIntervalInMilliSeconds > 0) {
      return this.props.reconnectIntervalInMilliSeconds;
    }
    return Math.min(30, Math.pow(2, k) - 1) * 1000;
  }

  setupWebsocket() {
    let websocket = this.state.ws;

    websocket.onopen = () => {
      this.logging("Websocket connected");
      if (typeof this.props.onOpen === "function") this.props.onOpen();
    };

    this.shouldReconnect = this.props.reconnect;
    websocket.onerror = e => {
      if (typeof this.props.onError === "function") this.props.onError(e);
      this.logging(e);
    };

    websocket.onmessage = evt => {
      this.props.onMessage(evt.data);
    };

    websocket.onclose = evt => {
      this.logging(
        `Websocket disconnected,the reason: ${evt.reason},the code: ${evt.code}`
      );
      if (typeof this.props.onClose === "function")
        this.props.onClose(evt.code, evt.reason);
      if (this.shouldReconnect) {
        this.connect();
      }
    };
  }

  connect() {
    this.logging("connect");
    let time = this.generateInterval(this.state.attempts);
    this.timeoutID = setTimeout(() => {
      this.setState({ attempts: this.state.attempts + 1 });
      this.setState({
        ws: window.WebSocket
          ? new window.WebSocket(this.props.url, this.props.protocol)
          : new window.MozWebSocket(this.props.url, this.props.protocol)
      });
      console.log("setting up websocket");
      this.setupWebsocket();
    }, time);
    this.connectionTimeoutId = setTimeout(() => {
      if (this.state.ws.readyState !== WebSocket.OPEN) {
        this.state.ws.close();
      }
    }, time * 2);
  }

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.shouldReconnect = false;
    clearTimeout(this.timeoutID);
    clearTimeout(this.connectionTimeoutId);
    let websocket = this.state.ws;
    websocket.close();
  }

  sendMessage(message) {
    let websocket = this.state.ws;
    websocket.send(message);
  }

  render() {
    return <div></div>;
  }
}

Websocket.defaultProps = {
  debug: false,
  reconnect: true
};

Websocket.propTypes = {
  url: PropTypes.string.isRequired,
  onMessage: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onError: PropTypes.func,
  debug: PropTypes.bool,
  reconnect: PropTypes.bool,
  protocol: PropTypes.string,
  reconnectIntervalInMilliSeconds: PropTypes.number
};

export default Websocket;
