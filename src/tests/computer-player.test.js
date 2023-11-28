const Gameboard = require('../modules/gameboard')
const ComputerPlayer = require('../modules/computer-player')

test('ComputerPlayer should be able to attack enemy gameboard', () => {
  const enemyGameboard = new Gameboard()
  const computer1 = new ComputerPlayer()
  enemyGameboard.placeShip(5, 'A', '1', 'HORIZONTAL')
  computer1.computerAttack(enemyGameboard)

  expect(
    enemyGameboard.ships[0].hits.length || enemyGameboard.missedAttacks.length,
  ).toBe(1)
})
