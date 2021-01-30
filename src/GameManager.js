import Input from './input/Input'

export default class GameManager {
  static _instance = null
  static instance () {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager()
    }
    return GameManager._instance
  }

  initialize (scene) {
    this.input = new Input(scene)
  }

  update (time, delta) {
    this.input.update(time, delta)
  }

  getInput () {
    return this.input
  }
}
