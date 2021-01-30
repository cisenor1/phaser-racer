import Phaser from 'phaser'

export default {
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 0 },
      showVelocity: true,
      debug: {
        showVelocity: true,
        velocityColor: 0x00aeef
      }
    }
  },
  input: {
    gamepad: true
  },
  type: Phaser.AUTO,
  backgroundColor: '#809051',
  parent: 'content',
  width: 1920,
  height: 1080,
  localStorageName: 'phaseres6webpack'
}
