class gameboardDOMHandler {
  /* eslint-disable class-methods-use-this */
  renderGameboard(gameboard, DOMGameboard) {
    const allShipsCoordinates = []
    gameboard.ships.forEach((ship) => {
      allShipsCoordinates.push(ship.coordinates)
    })
    const occupiedCoordinates = [].concat(...allShipsCoordinates)
    gameboardDOMHandler.createGameboard(
      gameboard,
      DOMGameboard,
      occupiedCoordinates,
    )

    this.handleEmptyCells()
    this.handleOccupiedCells()
  }

  static createGameboard(gameboard, DOMGameboard, occupiedCoordinates) {
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
}

module.exports = gameboardDOMHandler
