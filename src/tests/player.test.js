const Gameboard = require('../modules/gameboard')
const Player = require('../modules/player')

test('Player method attack() should attack enemy gameboard', () => {
  const playerGameboard = new Gameboard()
  const computerGameboard = new Gameboard()

  const player = new Player('Stefan')
  const computer = new Player('Computer')

  playerGameboard.placeShip(2, 'A', '1', 'H')
  computerGameboard.placeShip(2, 'E', '1', 'V')

  player.attack(computerGameboard, 'E1')
  computer.attack(playerGameboard, 'A1')
  player.attack(computerGameboard, 'E2')

  expect(playerGameboard.ships[0].hits).toBe(1)
  expect(computerGameboard.ships[0].hits).toBe(2)
})
