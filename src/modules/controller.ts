import { PerspectiveCamera } from 'three';

export default class Controller {
  speed: number;
  constructor(private camera: PerspectiveCamera) {
    window.addEventListener('keydown', (e: KeyboardEvent) =>
      this.handleKeyDown(e.code),
    );

    window.addEventListener('keyup', (e: KeyboardEvent) =>
      this.handleKeyUp(e.code),
    );

    this.speed = 1;
  }

  handleKeyDown(code: string): void {
    const { x, y, z } = this.camera.position;

    switch (code) {
      case 'KeyW':
        this.camera.position.set(x, y + this.speed, z);
        break;

      case 'KeyA':
        this.camera.position.set(x - this.speed, y, z);
        break;
      case 'KeyS':
        this.camera.position.set(x, y - this.speed, z);
        break;
      case 'KeyD':
        this.camera.position.set(x + this.speed, y, z);
        break;
    }
  }
  handleKeyUp(code: string): void {}
}
