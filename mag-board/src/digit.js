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

const onMap = {
  //   87654321
  0: 0b01110111,
  1: 0b00100100,
  2: 0b01101011,
  3: 0b01101101,
  4: 0b00111100,
  5: 0b01011101,
  6: 0b01011111,
  7: 0b01100100,
  8: 0b01111111,
  9: 0b01111101
};

const OFF_TIMER = 200;

class MagDigit {
  constructor(i2cBus, address) {
    this.i2cBus = i2cBus;
    this.address = address;
  }

  _ledOn(pattern, led) {
    return (
      pattern
        .toString(2)
        .padStart(8, "0")
        .charAt(8 - led) === "1"
    );
  }

  setNumber(number) {
    const low = onMap[number % 10];
    const high = on ^ 0b11111111; // xor -- turn on the off polarity of all the other segments

    const led = [
      this._ledOn(low, 7) ? "  --  " : "",
      (this._ledOn(low, 5) ? " | " : "   ") +
        (this._ledOn(low, 6) ? " | " : "  "),
      this._ledOn(low, 4) ? "  --  " : "",
      (this._ledOn(low, 2) ? " | " : "   ") +
        (this._ledOn(low, 3) ? " | " : "  "),
      this._ledOn(low, 1) ? "  --  " : ""
    ];

    this.i2cBus.writeWord(this.address, low, high).then(() => {
      setTimeout(() => {
        this.i2cBus.writeWord(this.address, 0x00, 0x00);
      }, OFF_TIMER);
    });
  }
}

module.exports = MagDigit;
