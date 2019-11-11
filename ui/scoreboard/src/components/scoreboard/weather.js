import React from "react";

class Weather extends React.Component {
  componentDidMount() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML =
      "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');";
    this.instance.appendChild(s);
  }

  render = () => {
    return (
      <div
        style={{ width: "100%", paddingTop: 15, display: "inline-block" }}
        ref={el => (this.instance = el)}
      >
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/en/33d88n111d93/85331/?unit=us"
          data-label_1="Ellis Center"
          data-label_2="Weather"
          data-days="3"
          data-theme="original"
        >
          Cave Creek Weather
        </a>
      </div>
    );
  };
}

export default Weather;
