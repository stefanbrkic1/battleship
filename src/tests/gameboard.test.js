const Gameboard = require('../modules/gameboard')

test('placeShip() method should place ship inside ships array with the Horizontal direction', () => {
  const gameboard1 = new Gameboard()
  gameboard1.placeShip(5, 'A', '1', 'HORIZONTAL')
  expect(gameboard1.ships[0]).toEqual({
    length: 5,
    hits: 0,
    coordinates: ['A1', 'B1', 'C1', 'D1', 'E1'],
  })
})

test('placeShip() method should place ship inside ships array with the Vertical direction', () => {
  const gameboard1 = new Gameboard()
  gameboard1.placeShip(5, 'A', '1', 'VERTICAL')
  expect(gameboard1.ships[0]).toEqual({
    length: 5,
    hits: 0,
    coordinates: ['A1', 'A2', 'A3', 'A4', 'A5'],
  })
})

test('recieveAttack hits ship when attackCoordinates match shipsCoordinates', () => {
  const gameboard1 = new Gameboard()
  gameboard1.placeShip(5, 'A', '1', 'HORIZONTAL')
  gameboard1.recieveAttack('A1')
  gameboard1.recieveAttack('B1')
  expect(gameboard1.ships[0].hits).toBe(2)
})

test('recieveAttack records missedCoordinates for invalid attacks without hitting the ship', () => {
  const gameboard1 = new Gameboard()
  gameboard1.placeShip(5, 'A', '1', 'HORIZONTAL')
  gameboard1.recieveAttack('C3')
  gameboard1.recieveAttack('E5')
  expect(gameboard1.ships[0].hits).toBe(0)
  expect(gameboard1.missedAttacks).toEqual(['C3', 'E5'])
})

test('areAllShipsSunk should be able to report whether or not all of ships have been sunk.', () => {
  const gameboard1 = new Gameboard()
  // Create ships
  gameboard1.placeShip(2, 'A', '1', 'HORIZONTAL')
  gameboard1.placeShip(2, 'A', '2', 'HORIZONTAL')
  // Attack and HIT ships
  gameboard1.recieveAttack('A1')
  gameboard1.recieveAttack('B1')
  gameboard1.recieveAttack('A2')
  gameboard1.recieveAttack('B2')

  expect(gameboard1.areAllShipsSunk()).toBe(true)

  const gameboard2 = new Gameboard()
  // Create ships
  gameboard2.placeShip(2, 'A', '1', 'HORIZONTAL')
  gameboard2.placeShip(2, 'A', '2', 'HORIZONTAL')
  // Attack and MISS ships
  gameboard2.recieveAttack('E5')
  gameboard2.recieveAttack('C3')

  expect(gameboard2.areAllShipsSunk()).toBe(false)
})
