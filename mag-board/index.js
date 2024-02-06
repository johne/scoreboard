// const { openPromisified } = require("i2c-bus");
const MagDigit = require("./src/digit2");

const i2cBus = { writeWord: () => new Promise(() => {}) };

const digit = new MagDigit(i2cBus, 0x20);

digit.setNumber(0);
digit.setNumber(1);
digit.setNumber(2);
digit.setNumber(3);
digit.setNumber(4);
digit.setNumber(5);
digit.setNumber(6);
digit.setNumber(7);
digit.setNumber(8);
digit.setNumber(9);
