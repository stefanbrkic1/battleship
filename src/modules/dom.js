class handleGameboardDOM {
  /* eslint-disable class-methods-use-this */
  renderGameboard(gameboard, DOMGameboard) {
    const allShipsCoordinates = []
    gameboard.ships.forEach((ship) => {
      allShipsCoordinates.push(ship.coordinates)
    })
    const occupiedCoordinates = [].concat(...allShipsCoordinates)
    handleGameboardDOM.createGameboard(
      gameboard,
      DOMGameboard,
      occupiedCoordinates,
    )
  }

  static createGameboard(gameboard, DOMGameboard, occupiedCoordinates) {
    // Loop through rows (A to J)
    for (let i = 1; i <= 10; i += 1) {
      // Loop through columns (1 to 10)
      for (let j = 1; j <= 10; j += 1) {
        // Create a cell with a data-value attribute
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.dataset.value = String.fromCharCode(64 + i) + j
        if (occupiedCoordinates.includes(cell.dataset.value)) {
          cell.classList.add('occupied-coordinate')
        } else {
          cell.classList.add('empty-coordinate')
        }
        gameboard.appendChild(cell)
      }
    }
  }
}

module.exports = handleGameboardDOM
