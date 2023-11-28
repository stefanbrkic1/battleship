const explosion = require('../assets/audio/explosion.mp3').default
const water = require('../assets/audio/water-splash.mp3').default

const modal = document.querySelector('[data-modal]')
const modalOverlay = document.querySelector('.overlay')

class GameboardDOMHandler {
  constructor() {
    this.playerPlacingCoords = []
    this.shipTextDisplayer = document.getElementById('shipTextDisplayer')
  }

  /* eslint-disable class-methods-use-this */
  renderGameboard(gameboard, DOMGameboard) {
    const allShipsCoordinates = []
    gameboard.ships.forEach((ship) => {
      allShipsCoordinates.push(ship.coordinates)
    })
    const occupiedCoordinates = [].concat(...allShipsCoordinates)
    GameboardDOMHandler.createGameboard(DOMGameboard, occupiedCoordinates)
  }

  static createGameboard(DOMGameboard, occupiedCoordinates) {
    // Loop through columns (1 to 10)
    for (let j = 1; j <= 10; j += 1) {
      // Loop through rows (A to J)
      for (let i = 1; i <= 10; i += 1) {
        // Create a cell with a data-value attribute
        const cell = document.createElement('div')
        cell.classList.add('cell')

        // Calculate the row label ('A' to 'J') based on the loop index (i)
        const rowLabel = String.fromCharCode(64 + i)

        // Set the data-value attribute using the row label and column index (j)
        cell.dataset.value = rowLabel + j

        // Add classes based on occupiedCoordinates
        if (occupiedCoordinates.includes(cell.dataset.value)) {
          cell.classList.add('occupied-coordinate')
        } else {
          cell.classList.add('empty-coordinate')
        }

        // Make the player cells visible
        if (
          DOMGameboard.id === 'playerGameboard' &&
          occupiedCoordinates.includes(cell.dataset.value)
        ) {
          cell.classList.add('player-placed-cell')
        }

        // Append the cell to the DOMGameboard
        DOMGameboard.appendChild(cell)
      }
    }
  }

  placeComputerShips(computerGameboard) {
    const randomNum = Math.floor(Math.random() * 4)
    console.log(randomNum)

    if (randomNum === 0) {
      // Predetermined Computer Ships Coordinates Combination
      computerGameboard.placeShip(5, 'A', '1', 'HORIZONTAL')
      computerGameboard.placeShip(4, 'J', '1', 'VERTICAL')
      computerGameboard.placeShip(3, 'A', '10', 'HORIZONTAL')
      computerGameboard.placeShip(3, 'F', '9', 'HORIZONTAL')
      computerGameboard.placeShip(2, 'H', '4', 'VERTICAL')
    }

    if (randomNum === 1) {
      // Predetermined Computer Ships Coordinates Combination
      computerGameboard.placeShip(5, 'B', '3', 'HORIZONTAL')
      computerGameboard.placeShip(4, 'E', '6', 'HORIZONTAL')
      computerGameboard.placeShip(3, 'B', '7', 'VERTICAL')
      computerGameboard.placeShip(3, 'I', '1', 'VERTICAL')
      computerGameboard.placeShip(2, 'I', '9', 'VERTICAL')
    }

    if (randomNum === 2) {
      // Predetermined Computer Ships Coordinates Combination
      computerGameboard.placeShip(5, 'B', '2', 'VERTICAL')
      computerGameboard.placeShip(4, 'C', '9', 'HORIZONTAL')
      computerGameboard.placeShip(3, 'G', '6', 'HORIZONTAL')
      computerGameboard.placeShip(3, 'E', '1', 'VERTICAL')
      computerGameboard.placeShip(2, 'I', '2', 'VERTICAL')
    }

    if (randomNum === 3) {
      // Predetermined Computer Ships Coordinates Combination
      computerGameboard.placeShip(5, 'B', '9', 'HORIZONTAL')
      computerGameboard.placeShip(4, 'I', '6', 'VERTICAL')
      computerGameboard.placeShip(3, 'B', '4', 'VERTICAL')
      computerGameboard.placeShip(3, 'F', '2', 'VERTICAL')
      computerGameboard.placeShip(2, 'I', '2', 'VERTICAL')
    }

    if (randomNum === 4) {
      // Predetermined Computer Ships Coordinates Combination
      computerGameboard.placeShip(5, 'I', '2', 'VERTICAL')
      computerGameboard.placeShip(4, 'B', '6', 'VERTICAL')
      computerGameboard.placeShip(3, 'D', '2', 'HORIZONTAL')
      computerGameboard.placeShip(3, 'F', '9', 'HORIZONTAL')
      computerGameboard.placeShip(2, 'F', '4', 'VERTICAL')
    }
  }

  /* eslint-disable no-use-before-define */
  handlePlayerPlacement() {
    const placingGameboard = document.getElementById('placingGameboard')
    const placingCells = placingGameboard.querySelectorAll('.cell')

    placingCells.forEach((cell) => {
      cell.addEventListener('mouseover', handleCellHover)
    })

    placingCells.forEach((cell) => {
      cell.addEventListener('mouseout', handleCellLeave)
    })

    placingCells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick.bind(this))
    })

    let hoveredCell
    let hoveredCoords
    let coordX
    let coordY
    let ships
    let currentShip = 0
    let adjacentCoords
    let adjacentCell
    let rotation

    function handleCellHover(e) {
      hoveredCell = e.target
      hoveredCoords = hoveredCell.dataset.value
      coordX = [...hoveredCoords].at(0)
      coordY = Number([...hoveredCoords].slice(1).join(''))

      // Define ship lengths
      ships = [5, 4, 3, 3, 2]
      adjacentCoords = []
      rotation = document.getElementById('rotateBtn').dataset.value

      if (rotation === 'VERTICAL') {
        // Vertical ship
        for (let i = 1; i < ships[currentShip]; i += 1) {
          if (Number(coordY) + i <= 10) {
            adjacentCoords.push(`${coordX}${Number(coordY) + i}`)
          } else {
            adjacentCoords = []
          }
        }
      }

      if (rotation === 'HORIZONTAL') {
        // Horizontal ship
        const columnIndex = 'ABCDEFGHIJ'.indexOf(coordX)
        for (let i = 1; i < ships[currentShip]; i += 1) {
          if (columnIndex + i < 10) {
            adjacentCoords.push(`ABCDEFGHIJ`[columnIndex + i] + coordY)
          } else {
            adjacentCoords = []
          }
        }
      }

      // Check for placement validity acording to adjacent cells
      const validPlacement = () => {
        let isValid = false

        // Check if adjacent cells are not already placed
        const notAlreadyPlaced = !adjacentCoords.some((coord) => {
          const cell = placingGameboard.querySelector(`[data-value=${coord}]`)
          return cell && cell.classList.contains('placed-cell')
        })

        // Check if adjacent coords exist and if adjacent cells are not alrady placed
        if (adjacentCoords.length !== 0 && notAlreadyPlaced === true) {
          isValid = true
        }

        return isValid
      }

      // Check for placement validity and update the dom accordingly
      if (validPlacement()) {
        hoveredCell.classList.add('valid-placement-cell')
        adjacentCoords.forEach((coord) => {
          adjacentCell = placingGameboard.querySelector(`[data-value=${coord}]`)
          if (adjacentCell) {
            adjacentCell.classList.add('adjacent-cell')
          }
        })
      } else {
        hoveredCell.classList.add('invalid-placement-cell')
      }
    }

    function handleCellLeave() {
      if (hoveredCell) {
        hoveredCell.classList.remove('invalid-placement-cell')
        hoveredCell.classList.remove('valid-placement-cell')
        adjacentCoords.forEach((coord) => {
          adjacentCell = placingGameboard.querySelector(`[data-value=${coord}]`)
          if (adjacentCell) {
            adjacentCell.classList.remove('adjacent-cell')
          }
        })
      }
    }

    function handleCellClick(e) {
      const clickedCell = e.target
      if (
        !clickedCell.classList.contains('invalid-placement-cell') &&
        !clickedCell.classList.contains('disabled-attack')
      ) {
        const clickedCoords = clickedCell.dataset.value

        // Extract Coordinates
        coordX = [...clickedCoords].at(0)
        coordY = Number([...clickedCoords].slice(1).join(''))

        // Add placing coordinate to playerPlacingCoords
        if (currentShip <= 5) {
          this.playerPlacingCoords.push({
            length: ships[currentShip],
            coordX,
            coordY,
            rotation,
          })

          // Move to next ship
          currentShip += 1

          // Update DOM text
          this.updateShipPlacingText(currentShip)

          // Place ship on placingGameboard visually
          clickedCell.classList.add('placed-cell')
          adjacentCoords.forEach((coord) => {
            adjacentCell = placingGameboard.querySelector(
              `[data-value=${coord}]`,
            )
            adjacentCell.classList.add('placed-cell')
          })
        }
      }
    }
  }

  /* eslint-enable no-use-before-define */
  updateShipPlacingText(currentShip) {
    let shipName = ''
    switch (currentShip) {
      case 0:
        shipName = 'CARRIER'
        break
      case 1:
        shipName = 'BATTLESHIP'
        break
      case 2:
        shipName = 'CRUISER'
        break
      case 3:
        shipName = 'SUBMARINE'
        break
      case 4:
        shipName = 'DESTROYER'
        break
      default:
        shipName = 'NO SHIPS LEFT'
    }

    this.shipTextDisplayer.textContent = `SHIP ( ${shipName} )`
  }
}

function handleCellEffects(cell) {
  const explosionAudio = new Audio(explosion)
  const missAudio = new Audio(water)

  // Update Cell Styling and Play audio
  if (cell.classList.contains('empty-coordinate')) {
    missAudio.play()
    cell.classList.add('missed-attack-cell')
  } else if (cell.classList.contains('occupied-coordinate')) {
    explosionAudio.play()
    cell.classList.add('hit-attack-cell')
  }
}

function handleRotationButton() {
  const rotateBtn = document.getElementById('rotateBtn')
  rotateBtn.addEventListener('click', () => {
    if (rotateBtn.dataset.value === 'HORIZONTAL') {
      rotateBtn.dataset.value = 'VERTICAL'
    } else {
      rotateBtn.dataset.value = 'HORIZONTAL'
    }
  })
}

function openGameOverModal(computerGameboard) {
  const winnerDisplayer = document.getElementById('winnerDisplayer')

  // Set winner text
  if (computerGameboard.areAllShipsSunk() === true) {
    winnerDisplayer.textContent = `( YOU WON )`
  } else {
    winnerDisplayer.textContent = `( COMPUTER WON )`
  }

  // Open game over modal
  modalOverlay.classList.add('modal-open')
  modal.showModal()
}

function closeGameOverModal() {
  modalOverlay.classList.remove('modal-open')
  modal.close()
}

function handleGameRestart() {
  const playAgainBtn = document.getElementById('playAgainBtn')
  playAgainBtn.addEventListener('click', () => {
    window.location.reload()
    closeGameOverModal()
  })
}

function handleStartGame(newGame, gameboardDOM) {
  const startForm = document.getElementById('startForm')
  const readyBtn = document.getElementById('readyBtn')
  const placingGameboard = document.getElementById('placingGameboard')
  const shipTextDisplayer = document.getElementById('shipTextDisplayer')

  // Prevent form from submiting to server
  startForm.addEventListener('submit', (e) => {
    e.preventDefault()
  })

  placingGameboard.addEventListener('click', () => {
    if (shipTextDisplayer.textContent === 'SHIP ( NO SHIPS LEFT )') {
      readyBtn.classList.remove('disabled-btn')
    }
  })

  // Start game when player is ready
  readyBtn.addEventListener('click', () => {
    const gameboardsContainer = document.getElementById('gameboardsContainer')
    const playerNameDisplayer = document.getElementById('playerNameDisplayer')
    const nameInput = document.getElementById('nameInput')
    const playerCoords = gameboardDOM.playerPlacingCoords

    // Check if player placed all the ships and provided name
    if (playerCoords.length === 5 && nameInput.value !== '') {
      startForm.classList.add('display-none')
      gameboardsContainer.classList.remove('display-none')
      playerNameDisplayer.textContent = nameInput.value.toUpperCase()
      newGame.startGame()
    }
  })
}

module.exports = {
  GameboardDOMHandler,
  handleRotationButton,
  handleCellEffects,
  openGameOverModal,
  closeGameOverModal,
  handleGameRestart,
  handleStartGame,
}
