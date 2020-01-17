import { Object3D, Scene, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

export default class Cybertruck {
  public readonly object: Object3D;
  private readonly WHEEL_BASE = 120;
  private readonly dT = 100;
  private speed = 0;
  private heading = 0.3;
  private steerAngle = 0.3;

  public readonly frontWheel = new Mesh(
    new BoxGeometry(5, 3, 10),
    new MeshBasicMaterial(),
  );

  public readonly backWheel = new Mesh(
    new BoxGeometry(5, 3, 10),
    new MeshBasicMaterial(),
  );

  constructor(model: Scene) {
    this.object =
      model.children[0].children[0].children[0].children[0].children[1];
    this.object.translateY(-300);
    this.object.scale.x = 30;
    this.object.scale.y = 30;
    this.object.scale.z = 30;
    this.controlSpeed();
    this.controlPosition();
    this.controlSteeringAngle();
  }

  private controlPosition() {
    setInterval(() => {
      this.object.rotation.z = this.heading;
      this.frontWheel.position.setY(60);
      this.frontWheel.position.setX(
        this.object.position.x + (this.WHEEL_BASE / 2) * Math.sin(this.heading),
      );
      this.frontWheel.position.setZ(
        this.object.position.z + (this.WHEEL_BASE / 2) * Math.cos(this.heading),
      );
      this.frontWheel.rotation.y = this.heading;

      this.backWheel.position.setY(60);
      this.backWheel.position.setX(
        this.object.position.x - (this.WHEEL_BASE / 2) * Math.sin(this.heading),
      );
      this.backWheel.position.setZ(
        this.object.position.z - (this.WHEEL_BASE / 2) * Math.cos(this.heading),
      );
      this.backWheel.rotation.y = this.heading;

      ////////////////////////////////////////
      this.frontWheel.position.x +=
        this.speed * this.dT * 0.01 * Math.sin(this.heading + this.steerAngle);
      this.frontWheel.position.z +=
        this.speed * this.dT * 0.01 * Math.cos(this.heading + this.steerAngle);
      this.backWheel.position.x +=
        this.speed * this.dT * 0.01 * Math.sin(this.heading);
      this.backWheel.position.z +=
        this.speed * this.dT * 0.01 * Math.cos(this.heading);
      this.object.position.setX(
        (this.frontWheel.position.x + this.backWheel.position.x) / 2,
      );
      this.object.position.setZ(
        (this.frontWheel.position.z + this.backWheel.position.z) / 2,
      );
      this.heading = -Math.atan2(
        this.backWheel.position.x - this.frontWheel.position.x,
        this.frontWheel.position.z - this.backWheel.position.z,
      );
    }, this.dT);
  }

  private controlSpeed() {
    let accelerating = false;
    let decelerating = false;

    setInterval(() => {
      if (accelerating && this.speed < 100) {
        this.speed += 5;
      }
      if (decelerating && this.speed > -50) {
        this.speed -= 5;
      }
      if (!accelerating && !decelerating) {
        this.speed = 0;
      }
    }, this.dT);

    document.addEventListener('keypress', e => {
      if (e.key === 'w') {
        accelerating = true;
      }
      if (e.key === 's') {
        decelerating = true;
      }
    });
    document.addEventListener('keyup', e => {
      if (e.key === 'w') {
        accelerating = false;
      }
      if (e.key === 's') {
        decelerating = false;
      }
    });
  }

  private controlSteeringAngle() {
    document.addEventListener('keypress', e => {
      if (e.key === 'a') {
        this.steerAngle += 0.6;
      }
      if (e.key === 'd') {
        this.steerAngle -= 0.6;
      }
    });
    document.addEventListener('keyup', e => {
      if (e.key === 'a' || e.key === 'd') {
        this.steerAngle = 0;
      }
    });
  }
}
