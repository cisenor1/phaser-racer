import Phaser, { Math } from 'phaser'
import GameManager from '../GameManager'

export default class Racecar {
  FRICTION = 0.001
  AIR_FRICTION = 0.005
  STATIC_FRICTION = 1
  MAX_VELOCITY = 2
  MOVEMENT_SPEED = 0.01
  BRAKE_FORCE = 2
  ROTATION_SPEED = 2
  constructor ({ scene, startPoint }) {
    this.initializeDebug(scene)

    scene.events.on('update', this.update, this)
    this.input = GameManager.instance().getInput()
    this.sprite = scene.matter.add.sprite(0, 0, 'player-car', 0)
    this.initializeMatterBody(startPoint)
  }

  initializeDebug (scene) {
    this.debugTexts = []
    this.debugText = new Phaser.GameObjects.Text(scene, 0, 0, '')
    scene.add.existing(this.debug())
  }

  initializeMatterBody (startPoint) {
    const { Body, Bodies } = Phaser.Physics.Matter.Matter
    const { height: h, width: w } = this.sprite
    const mainBody = Bodies.rectangle(30, 16, w, h, { chamfer: { radius: 6 } })
    this.sensors = {
      front: Bodies.rectangle(w * 0.95, h / 2, w * 0.1, h)
    }
    const compoundBody = Body.create({
      parts: [mainBody, this.sensors.front],
      frictionStatic: this.STATIC_FRICTION,
      frictionAir: this.AIR_FRICTION,
      friction: this.FRICTION
    })

    this.sprite
      .setExistingBody(compoundBody)
      .setScale(1)
      .setPosition(startPoint.x, startPoint.y)
    this.isTouching = { back: false, front: false, left: false, right: false }
  }

  update (time, delta) {
    this.deltaTime = delta / 1000
    this.handleUpdateStarted()
    this.handleInputs()
    this.handleTelemetry()
    this.handleDebug()
  }

  handleUpdateStarted () {
    this.debugTexts = []
  }

  handleDebug () {
    this.debugText.setText(this.debugTexts)
  }

  handleInputs () {
    const current = this.input.getCurrent()
    this.setThrottle(current.throttle)
    this.setSteering(current.x)
    this.setBrake(current.brake)
  }

  handleTelemetry () {
    this.debugTexts.push(`Speed: ${new Phaser.Math.Vector2(this.sprite.body.velocity).length()}`)
  }

  setThrottle (throttle) {
    const velocity = new Phaser.Math.Vector2(this.sprite.body.velocity).length()
    this.debugTexts.push(`Throttle: ${throttle}`)
    if (throttle > 0) {
      if (velocity < this.MAX_VELOCITY) {
        this.sprite.thrust(throttle * this.MOVEMENT_SPEED * this.deltaTime)
        // const vec = new Math.Vector2()
        // const speed = throttle * this.MAX_VELOCITY * this.deltaTime
        // vec.setToPolar(this.sprite.rotation, speed)
        // this.sprite.setVelocity(vec.x, vec.y)
      }
    }
  }

  setBrake (brake) {
    this.debugTexts.push(`Brake: ${brake}`)
    this.sprite.setFrictionAir(this.AIR_FRICTION + (brake * this.deltaTime * this.BRAKE_FORCE))
  }

  setSteering (steering) {
    this.debugTexts.push(`Steering: ${steering}`)
    this.sprite.setAngularVelocity(steering * this.ROTATION_SPEED * this.deltaTime)
  }

  debug () {
    return this.debugText
  }
}
