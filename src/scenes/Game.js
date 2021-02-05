import Phaser from 'phaser'
import GameManager from '../GameManager'
import Racecar from '../sprites/Racecar'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }

  init () {
    this.matter.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height, 32, true, true, true, true)
    this.gameManager = GameManager.instance()
    this.gameManager.initialize(this)
    this.startPoint = new Phaser.Math.Vector2(100, 100)
  }

  preload () {
    this.load.image('player-car', 'assets/sportscar-32x61-yellow.png')
    this.load.image('tire-smoke', 'assets/tire-smoke.png')
    this.load.image('track-1', 'assets/track_1.png')
  }

  create () {
    this.add.image(0, 0, 'track-1').setOrigin(0)
    this.player = new Racecar({ scene: this, startPoint: this.startPoint })
  }

  update (time, delta) {
    this.gameManager.update(time, delta)
    this.player.update(time, delta)
  }
}
