const Gameboard = require('../modules/gameboard')
const Player = require('../modules/player')

test('Player method attack() should attack enemy gameboard', () => {
  const computerGameboard = new Gameboard()

  const player = new Player('Stefan')

  computerGameboard.placeShip(3, 'A', '1', 'HORIZONTAL')

  player.attack(computerGameboard, 'A1')

  expect(computerGameboard.ships[0].hits).toBe(1)
})
