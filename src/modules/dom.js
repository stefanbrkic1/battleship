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
      rotation = document.getElementById('rotateBtn').textContent

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

    this.shipTextDisplayer.textContent = `SHIP: ${shipName}`
  }
}

function handleCellStyling(cell) {
  // Update Cell Styling
  if (cell.classList.contains('empty-coordinate')) {
    cell.classList.add('missed-attack-cell')
  } else if (cell.classList.contains('occupied-coordinate')) {
    cell.classList.add('hit-attack-cell')
  }
}

function handleRotationButton() {
  const rotateBtn = document.getElementById('rotateBtn')
  rotateBtn.addEventListener('click', () => {
    if (rotateBtn.textContent === 'HORIZONTAL') {
      rotateBtn.textContent = 'VERTICAL'
    } else {
      rotateBtn.textContent = 'HORIZONTAL'
    }
  })
}

function openGameOverModal() {
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

module.exports = {
  GameboardDOMHandler,
  handleRotationButton,
  handleCellStyling,
  openGameOverModal,
  closeGameOverModal,
  handleGameRestart,
}