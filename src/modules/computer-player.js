class ComputerPlayer {
  constructor() {
    this.name = 'Computer'
  }

  /* eslint-disable class-methods-use-this */
  computerAttack(enemyGameboard, enemyGameboardDOM) {
    let attackCoordinates = ComputerPlayer.generateRandomCoords()
    while (
      enemyGameboard.missedAttacks.includes(attackCoordinates) ||
      enemyGameboard.goodAttacks.includes(attackCoordinates)
    ) {
      attackCoordinates = ComputerPlayer.generateRandomCoords()
    }
    const playerCellDOM = enemyGameboardDOM.querySelector(
      `[data-value=${attackCoordinates}]`,
    )
    console.log(attackCoordinates)
    console.log(playerCellDOM)
    playerCellDOM.click()
    enemyGameboard.recieveAttack(attackCoordinates)
  }

  static generateRandomCoords() {
    // Create random letter for the final coordinates
    const randomChar = String.fromCharCode(
      'A'.charCodeAt(0) + Math.floor(Math.random() * 10),
    )
    // Create random number for the final coordinates
    const randomNum = Math.floor(Math.random() * 10) + 1

    // Return random attack coordinates
    return `${randomChar}${randomNum}`
  }
  /* eslint-enable class-methods-use-this */
}

module.exports = ComputerPlayer
