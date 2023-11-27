import './styles/battleship.css'

const {
  GameboardDOMHandler,
  handleRotationButton,
  handleCellEffects,
  openGameOverModal,
  handleGameRestart,
  handleStartGame,
} = require('./modules/dom')
const Gameboard = require('./modules/gameboard')
const Player = require('./modules/player')
const ComputerPlayer = require('./modules/computer-player')

const gameboardDOM = new GameboardDOMHandler()

class Game {
  constructor() {
    this.player = new Player('Stefan')
    this.computerPlayer = new ComputerPlayer()
    this.currentPlayerTurn = this.player.name
    this.playerGameboard = new Gameboard()
    this.computerGameboard = new Gameboard()
    this.playerGameboardDOM = document.getElementById('playerGameboard')
    this.computerGameboardDOM = document.getElementById('computerGameboard')
    this.computerGameboardDOM.addEventListener('click', this.handlePlayerClick)
    this.isGameOver = false
  }

  startGame() {
    // Place player ships according to his placed coordinates
    const playerCoords = gameboardDOM.playerPlacingCoords
    playerCoords.forEach((coord) => {
      this.playerGameboard.placeShip(
        coord.length,
        coord.coordX,
        coord.coordY,
        coord.rotation,
      )
    })

    // Place computer ships randomly
    gameboardDOM.placeComputerShips(this.computerGameboard)

    // Render placed ships to DOM Gameboard
    gameboardDOM.renderGameboard(this.playerGameboard, this.playerGameboardDOM)
    gameboardDOM.renderGameboard(
      this.computerGameboard,
      this.computerGameboardDOM,
    )

    // Start game loop
    this.gameLoop()
  }

  switchPlayerTurn() {
    this.currentPlayerTurn =
      this.currentPlayerTurn === this.player.name
        ? this.computerPlayer.name
        : this.player.name
  }

  handlePlayerClick = (e) => {
    const clickedCell = e.target
    // Prevent player from attacking already attacked coordinates
    if (
      clickedCell.classList.contains('missed-attack-cell') ||
      clickedCell.classList.contains('hit-attack-cell')
    ) {
      return
    }
    // Check if it's players turn and perform attacks
    if (this.currentPlayerTurn === this.player.name) {
      // Update Cell Styling
      handleCellEffects(clickedCell)

      // Perform attack
      this.player.attack(this.computerGameboard, clickedCell.dataset.value)

      // Switch turn and disable player click
      this.switchPlayerTurn()
      this.computerGameboardDOM.classList.add('disable-attack')
      this.gameLoop() // Continue the game loop after the player's attack
    }
  }

  handleComputerTurn = () => {
    if (this.currentPlayerTurn === this.computerPlayer.name) {
      // Delay for better user experience
      setTimeout(() => {
        this.computerPlayer.computerAttack(
          this.playerGameboard,
          this.playerGameboardDOM,
        )
        // Switch to player
        this.switchPlayerTurn()
        this.computerGameboardDOM.classList.remove('disable-attack')
        this.gameLoop() // Continue the game loop after the computer's attack
      }, 2500)
    }
  }

  gameLoop() {
    // Return if game is over to avoid double invocation
    if (this.isGameOver === true) {
      return
    }
    // Check if the game is over and open game over modal
    if (
      this.playerGameboard.areAllShipsSunk() === true ||
      this.computerGameboard.areAllShipsSunk() === true
    ) {
      openGameOverModal()
      this.isGameOver = true
    }

    // Check if it's computers turn and make attack if it is
    this.handleComputerTurn()
  }
}

window.addEventListener('load', () => {
  handleStartGame(new Game(), gameboardDOM)
  handleRotationButton()
  gameboardDOM.handlePlayerPlacement()
  handleGameRestart()
})
