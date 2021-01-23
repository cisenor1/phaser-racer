/* globals __DEV__ */
import Phaser from 'phaser'

import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  init () {}
  preload () {}

  create () {
    this.mushroom = new Mushroom({
      scene: this,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height / 2,
      asset: 'mushroom'
    })

    this.add.existing(this.mushroom)
    this.add.text(100, 100, 'Phaser 3 - ES6 - Webpack ', {
      font: '64px Arial',
      fill: '#7744ff'
    })
  }
}
