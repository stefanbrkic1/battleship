import Ship from './ships'

export default class Gameboard {
  constructor() {
    this.ships = []
    this.missedAttacks = []
  }

  /* eslint-disable no-param-reassign */
  placeShip(length, coordinateX, coordinateY) {
    const newShip = new Ship(length, coordinateX, coordinateY)
    this.ships.push(newShip)
  }
  /* eslint-enable no-param-reassign */

  recieveAttack(x, y) {
    // Check if there is a ship at the specified coordinates
    const hittedShip = this.ships.find(
      (ship) => ship.coordinateX === x && ship.coordinateY === y,
    )
    //  If a ship is found, register the hit by calling its 'hit' method
    if (hittedShip) {
      hittedShip.hit()
    }
    // If no ship is found (else), record the coordinates as a missed attack
    else {
      this.missedAttacks.push({ coordinateX: x, coordinateY: y })
    }
  }

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk() === true)
  }
}
