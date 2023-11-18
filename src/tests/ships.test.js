const Ship = require('../modules/ships')

test("Ship's hit() method should increment the hit count of the current ship", () => {
  const newShip = new Ship(5, 'A', '1')
  newShip.hit()
  expect(newShip.hits).toBe(1)
})

test("Ship's isSunk() method should return true when length and hits are equal", () => {
  const newShip = new Ship(2, 'A', '1')
  newShip.hit()
  newShip.hit()
  expect(newShip.isSunk()).toBe(true)
})

test("Ship's isSunk() method should return false when length and hits are not equal", () => {
  const newShip = new Ship(5, 'A', '1')
  newShip.hit()
  expect(newShip.isSunk()).toBe(false)
})
