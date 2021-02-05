import GameManager from '../GameManager'

export default function inputMixin (BaseClass) {
  return class extends BaseClass {
    getInput () {
      if (!this._inputManager) {
        this._inputManager = GameManager.instance().getInputManager()
      }
      return this._inputManager.getCurrent()
    }
  }
}
