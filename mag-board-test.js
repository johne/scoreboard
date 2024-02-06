var Gpio = require("onoff").Gpio;
var SegOn = new Gpio(17, "out");
var SegOff = new Gpio(27, "out");
var flipInterval = setInterval(flipSegment, 1000);

var on = true;

function flip(segment) {
  segment.writeSync(1);
  setTimeout(() => {
    segment.writeSync(0);
  }, 100);
}

function flipSegment() {
  on != on;
  flip(on ? SegOn : SegOff);
}

function endFlipping() {
  clearInterval(flipInterval);
  SegOff.unexport();
  SegOn.unexport();
}

setTimeout(endFlipping, 15000);
