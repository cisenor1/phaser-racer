import Phaser from 'phaser'

export default class InputManager {
  KEYS = {
    up: undefined,
    down: undefined,
    left: undefined,
    right: undefined,
    menu: undefined
  }
  constructor ({ input }) {
    this.input = input // scene.input
    this.current = {
      up: false,
      down: false,
      left: false,
      right: false,
      x: 0,
      y: 0
    }
    this.initializeKeys()
    this.initializeGamepad()
  }

  initializeGamepad () {
    if (this.input.gamepad.gamepads.length > 0) {
      this.gamepad = this.input.gamepad.gamepads[0]
    }
    this.input.gamepad.once('connected', (pad) => {
      console.log('connected', pad.id)
      this.gamepad = this.input.gamepad.gamepads[0]
    })
  }

  initializeKeys () {
    this.KEYS.up = this.input.keyboard.addKey('W')
    this.KEYS.down = this.input.keyboard.addKey('S')
    this.KEYS.left = this.input.keyboard.addKey('A')
    this.KEYS.right = this.input.keyboard.addKey('D')
    this.KEYS.menu = this.input.keyboard.addKey('ESC')
  }

  update (_time, _delta) {
    this.current.up = Phaser.Input.Keyboard.DownDuration(this.KEYS.up)
    this.current.down = Phaser.Input.Keyboard.DownDuration(this.KEYS.down)
    this.current.left = Phaser.Input.Keyboard.DownDuration(this.KEYS.left)
    this.current.right = Phaser.Input.Keyboard.DownDuration(this.KEYS.right)
    this.current.x = (this.current.left ? -1 : 0) + (this.current.right ? 1 : 0)
    this.current.y = (this.current.down ? -1 : 0) + (this.current.up ? 1 : 0)
    this.current.restart = Phaser.Input.Keyboard.JustDown(this.KEYS.menu)
    this.current.throttle = this.current.y
    if (this.gamepad) {
      this.current.throttle = this.gamepad.R2
      this.current.brake = this.gamepad.L2
      this.current.x = this.gamepad.leftStick.x
      this.current.y = this.gamepad.leftStick.y
      this.current.restart = this.gamepad.A
    }
  }

  getCurrent () {
    return this.current
  }
}
