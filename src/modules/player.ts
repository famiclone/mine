import { PerspectiveCamera } from 'three';

export default class Player {
  pos: { x: number; y: number; z: number };
  vel: { x: number; y: number; z: number };
  speed: number;
  constructor(public camera: PerspectiveCamera) {
    this.pos = { x: 0, y: 0, z: 30 };
    this.vel = { x: 0, y: 0, z: 0 };
    this.speed = 0.25;
  }

  update() {
    this.pos.x += this.speed * this.vel.x;
    this.pos.y += this.speed * this.vel.y;
    this.pos.z += this.speed * this.vel.z;

    this.camera.position.set(this.pos.x, this.pos.y, this.pos.z);

    // console.log(this.camera.position);
    // console.log(this.vel);
  }
}
