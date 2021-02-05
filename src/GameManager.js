import InputManager from './input/InputManager'

export default class GameManager {
  static _instance = null
  static instance () {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager()
    }
    return GameManager._instance
  }

  initialize (scene) {
    this.inputManager = new InputManager(scene)
  }

  update (time, delta) {
    this.inputManager.update(time, delta)
  }

  getInputManager () {
    return this.inputManager
  }
}
