const Ship = require('./ships')

class Gameboard {
  constructor() {
    this.ships = []
    this.missedAttacks = []
  }

  static createCoordinates(length, coordinateX, coordinateY, direction) {
    const coordinates = []
    let x = coordinateX
    let y = coordinateY

    for (let i = 0; i < length; i += 1) {
      coordinates.push(`${x}${y}`)

      if (direction === 'H') {
        x = String.fromCharCode(x.charCodeAt(0) + 1)
      } else if (direction === 'V') {
        y = Number(y) + 1
      }
    }

    return coordinates
  }

  /* eslint-disable no-param-reassign */
  placeShip(length, coordinateX, coordinateY, direction) {
    const coords = Gameboard.createCoordinates(
      length,
      coordinateX,
      coordinateY,
      direction,
    )
    const newShip = new Ship(length, coords)
    this.ships.push(newShip)
  }
  /* eslint-enable no-param-reassign */

  recieveAttack(attackCoordinates) {
    // Check if there is a ship at the specified attackCoordinates
    const hittedShipIndex = this.ships.findIndex((ship) =>
      ship.coordinates.includes(attackCoordinates),
    )
    // If a ship is found, register the hit by calling its 'hit' method
    if (hittedShipIndex !== -1) {
      const hittedShip = this.ships[hittedShipIndex]
      hittedShip.hit()
    } else {
      // If no ship is found, record the attackCoordinates as a missed attack
      this.missedAttacks.push(attackCoordinates)
    }
  }

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk() === true)
  }
}

module.exports = Gameboard
