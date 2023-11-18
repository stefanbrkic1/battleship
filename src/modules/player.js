class Player {
  constructor(name) {
    this.name = name
  }

  /* eslint-disable class-methods-use-this */
  attack(enemyGameboard, attackCoordinates) {
    enemyGameboard.recieveAttack(attackCoordinates)
  }
  /* eslint-enable class-methods-use-this */
}

module.exports = Player
