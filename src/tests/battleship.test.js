const Game = require('../battleship')

const newGame = new Game()

test('Game class should be able to switch turns', () => {
  // By default it's player's turn switch to computer
  newGame.switchPlayerTurn()
  expect(newGame.currentPlayerTurn).toBe('Computer')
})
