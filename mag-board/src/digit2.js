/******
 *
 * digit
 *
 * 7  --
 * 5 |  | 6
 * 4  --
 * 2 |  | 3
 * 1  --
 */

// to pin address
const segMap = {
  7: 0,
  6: 2,
  5: 4,
  4: 6,
  3: 8,
  2: 10,
  1: 12
};

const onMap = {
  0: [7, 6, 5, 3, 2, 1],
  1: [6, 3],
  2: [7, 6, 4, 2, 1],
  3: [7, 6, 4, 3, 1],
  4: [5, 6, 4, 3],
  5: [7, 5, 4, 3, 1],
  6: [7, 5, 4, 3, 2, 1],
  7: [7, 6, 3],
  8: [7, 6, 5, 4, 3, 2, 1],
  9: [7, 6, 5, 4, 3, 1]
};

const segsOff = 0b1010101010101010;

const OFF_TIMER = 200;

const b = number => {
  return number.toString(2).padStart(16, "0");
};

class MagDigit {
  constructor(i2cBus, address) {
    this.i2cBus = i2cBus;
    this.address = address;
  }

  _ledOn(pattern, led) {
    const segAddr = 1 << segMap[led];

    return (pattern & segAddr) === segAddr;
  }

  setNumber(number) {
    const onArray = onMap[number % 10];

    const value = onArray.reduce((value, seg) => {
      const segAddr = 1 << segMap[seg];
      const segOff = 1 << (segMap[seg] + 1);

      return (value | segAddr) ^ segOff;
    }, segsOff);

    const led = [
      this._ledOn(value, 7) ? "  --  " : "",
      (this._ledOn(value, 5) ? " | " : "   ") +
        (this._ledOn(value, 6) ? " | " : "  "),
      this._ledOn(value, 4) ? "  --  " : "",
      (this._ledOn(value, 2) ? " | " : "   ") +
        (this._ledOn(value, 3) ? " | " : "  "),
      this._ledOn(value, 1) ? "  --  " : ""
    ];

    console.log(led.join("\n"));

    this.i2cBus
      .writeWord(this.address, value & 0xff, (value >> 8) & 0xff)
      .then(() => {
        setTimeout(() => {
          this.i2cBus.writeWord(this.address, 0x00, 0x00);
        }, OFF_TIMER);
      });
  }
}

module.exports = MagDigit;
