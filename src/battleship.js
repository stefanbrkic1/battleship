import './styles/battleship.css'

const {
  GameboardDOMHandler,
  handleRotationButton,
  handleCellStyling,
  openGameOverModal,
  handleGameRestart,
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
    // Predetermined Computer Ships Coordinates
    this.computerGameboard.placeShip(5, 'A', '1', 'HORIZONTAL')
    this.computerGameboard.placeShip(4, 'J', '1', 'VERTICAL')
    this.computerGameboard.placeShip(3, 'A', '10', 'HORIZONTAL')
    this.computerGameboard.placeShip(3, 'F', '9', 'HORIZONTAL')
    this.computerGameboard.placeShip(2, 'H', '4', 'VERTICAL')

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
      handleCellStyling(clickedCell)

      // Perform attack
      this.player.attack(this.computerGameboard, clickedCell.dataset.value)

      // Switch turn and continue the game loop
      this.switchPlayerTurn()
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
        this.gameLoop() // Continue the game loop after the computer's attack
      }, 1000)
    }
  }

  gameLoop() {
    // Return if game is over to avoid double invocation
    if (this.isGameOver === true) {
      return
    }
    // Check if the game is over
    if (
      this.playerGameboard.areAllShipsSunk() === true ||
      this.computerGameboard.areAllShipsSunk() === true
    ) {
      openGameOverModal()
      this.isGameOver = true
    }

    // Check if it's computers turn
    this.handleComputerTurn()
  }
}

const newGame = new Game()

function handleStartGame() {
  const startForm = document.getElementById('startForm')
  const readyBtn = document.getElementById('readyBtn')

  // Prevent form from submiting to server
  startForm.addEventListener('submit', (e) => {
    e.preventDefault()
  })
  // Start game when player is ready
  readyBtn.addEventListener('click', () => {
    const gameboardsContainer = document.getElementById('gameboardsContainer')
    const nameInput = document.getElementById('nameInput')
    const playerCoords = gameboardDOM.playerPlacingCoords

    // Check if player placed all the ships and provided name
    if (playerCoords.length === 5 && nameInput.value !== '') {
      startForm.classList.add('display-none')
      gameboardsContainer.classList.remove('display-none')
      newGame.startGame()
    }
  })
}

window.addEventListener('load', () => {
  handleStartGame()
  handleRotationButton()
  gameboardDOM.handlePlayerPlacement()
  handleGameRestart()
})
