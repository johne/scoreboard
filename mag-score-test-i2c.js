const lights = [0x01, 0x02, 0x04, 0x8, 0x10, 0x20, 0x40, 0x80];
const segs = [0x01, 0x02];

const { openSync, openPromisified } = require("i2c-bus");

const i2cbus = openSync(1);

const i2cBusPromise = openPromisified(1);

var doItInterval = setInterval(doIt, 1000);

let on = false;

function doIt() {
  const value = 0x01 | 0x02;

  console.log({ value, on });

  i2cBusPromise.writeWordSync();

  i2cbus.writeWordSync(0x20, on ? value : 0x00, on ? 0x00 : value);
  setTimeout(() => {
    i2cbus.writeWordSync(0x20, 0x00, 0x00);
  }, 100);

  on = !on;
}

function stopIt() {
  clearInterval(doItInterval);
}

setTimeout(stopIt, 20000);
