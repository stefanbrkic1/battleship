class GameboardDOMHandler {
  /* eslint-disable class-methods-use-this */
  renderGameboard(gameboard, DOMGameboard) {
    const allShipsCoordinates = []
    gameboard.ships.forEach((ship) => {
      allShipsCoordinates.push(ship.coordinates)
    })
    const occupiedCoordinates = [].concat(...allShipsCoordinates)
    GameboardDOMHandler.createGameboard(
      gameboard,
      DOMGameboard,
      occupiedCoordinates,
    )

    this.handleEmptyCells()
    this.handleOccupiedCells()
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

        // Append the cell to the DOMGameboard
        DOMGameboard.appendChild(cell)
      }
    }
  }

  handleEmptyCells() {
    const emptyCells = document.querySelectorAll('.empty-coordinate')

    emptyCells.forEach((cell) => {
      cell.addEventListener('click', () => {
        cell.classList.add('missed-attack-cell')
      })
    })
  }

  handleOccupiedCells() {
    const occupiedCells = document.querySelectorAll('.occupied-coordinate')

    occupiedCells.forEach((cell) => {
      cell.addEventListener('click', () => {
        cell.classList.add('hit-attack-cell')
      })
    })
  }

  /* eslint-disable no-use-before-define */
  handleShipPlacement() {
    const placingGameboard = document.getElementById('placingGameboard')
    const placingCells = placingGameboard.querySelectorAll('.cell')

    placingCells.forEach((cell) => {
      cell.addEventListener('mouseover', handleCellHover)
    })

    placingCells.forEach((cell) => {
      cell.addEventListener('mouseout', handleCellLeave)
    })

    let hoveredCell
    let hoveredCoords
    let coordX
    let coordY
    let ships
    let currentShip
    let adjacentCoords
    let rotation

    function handleCellHover(e) {
      hoveredCell = e.target
      hoveredCoords = hoveredCell.dataset.value
      coordX = [...hoveredCoords].at(0)
      // Handle coordY based on number of digits
      coordY =
        hoveredCoords.length === 3
          ? `${[...hoveredCoords].at(1)}${[...hoveredCoords].at(2)}`
          : [...hoveredCoords].at(1)
      // Define ship lengths
      ships = [5, 4, 3, 3, 2]
      currentShip = 0
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

      if (adjacentCoords.length === 0) {
        hoveredCell.classList.add('invalid-placement-cell')
      } else {
        hoveredCell.classList.add('valid-placement-cell')
        adjacentCoords.forEach((coord) => {
          const adjacentCell = placingGameboard.querySelector(
            `[data-value=${coord}]`,
          )
          if (adjacentCell) {
            adjacentCell.classList.add('adjacent-cell')
          }
        })
      }
    }

    function handleCellLeave() {
      if (hoveredCell) {
        hoveredCell.classList.remove('invalid-placement-cell')
        hoveredCell.classList.remove('valid-placement-cell')
        adjacentCoords.forEach((coord) => {
          const adjacentCell = placingGameboard.querySelector(
            `[data-value=${coord}]`,
          )
          if (adjacentCell) {
            adjacentCell.classList.remove('adjacent-cell')
          }
        })
      }
    }
  }
  /* eslint-enable no-use-before-define */
}

module.exports = GameboardDOMHandler
