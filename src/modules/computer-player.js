class ComputerPlayer {
  constructor() {
    this.name = 'Computer'
  }

  /* eslint-disable class-methods-use-this */
  computerAttack(enemyGameboard) {
    let attackCoordinates = ComputerPlayer.generateRandomCoords()
    while (enemyGameboard.missedAttacks.includes(attackCoordinates)) {
      attackCoordinates = ComputerPlayer.generateRandomCoords()
    }
    enemyGameboard.recieveAttack(attackCoordinates)
  }

  static generateRandomCoords() {
    // Create random letter for the final coordinates
    const randomChar = String.fromCharCode(
      'A'.charCodeAt(0) + Math.floor(Math.random() * 10),
    )
    // Create random number for the final coordinates
    const randomNum = Math.floor(Math.random() * 11)

    // Return random attack coordinates
    return `${randomChar}${randomNum}`
  }
  /* eslint-enable class-methods-use-this */
}

module.exports = ComputerPlayer
