import Phaser from 'phaser'

export default class Course extends Phaser.GameObjects.Container {
  constructor ({ scene, map }) {
    super(scene, 0, 0)
    this.map = map
    this.scene = scene
    this.waypoints = []
    this.initializeCourse()
    this.scene.add.existing(this)
  }
  initializeCourse () {
    this.image = this.scene.matter.add.image(0, 0, this.map, 0, { isStatic: true, isSensor: true, ignoreGravity: true }).setOrigin(0, 0)

    const body = this.scene.matter.add.rectangle(500, 200, 10, 20, { isStatic: true, ignoreGravity: true })
    this.image.setExistingBody(body)
  }
}
