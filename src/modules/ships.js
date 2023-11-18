class Ship {
  constructor(length, coordinates) {
    this.length = length
    this.hits = 0
    this.coordinates = coordinates
  }

  hit() {
    this.hits += 1
  }

  isSunk() {
    return this.hits === this.length
  }
}

module.exports = Ship
