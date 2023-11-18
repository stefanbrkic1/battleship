class Ship {
  constructor(length, coordinateX, coordinateY) {
    this.length = length
    this.coordinateX = coordinateX
    this.coordinateY = coordinateY
    this.hits = 0
  }

  hit() {
    this.hits += 1
  }

  isSunk() {
    return this.hits === this.length
  }
}

module.exports = Ship
