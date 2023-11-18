const Gameboard = require('../modules/gameboard')

test('placeShip() method should place ship inside gameboard ship array with the given coordinates', () => {
  const gameboard1 = new Gameboard()
  gameboard1.placeShip(5, 'A', '1')
  expect(gameboard1.ships[0]).toEqual({
    length: 5,
    coordinateX: 'A',
    coordinateY: '1',
    hits: 0,
  })
})
