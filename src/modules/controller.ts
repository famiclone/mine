import Player from './player';

export default class Controller {
  constructor(private player: Player) {
    window.addEventListener('keydown', (e: KeyboardEvent) =>
      this.handleKeyDown(e.code),
    );

    window.addEventListener('keyup', (e: KeyboardEvent) =>
      this.handleKeyUp(e.code),
    );

    console.log(this.player);
  }

  handleKeyDown(code: string): void {
    switch (code) {
      case 'KeyW':
        this.player.vel.z = -1;
        break;
      case 'KeyA':
        this.player.vel.x = -1;
        break;
      case 'KeyS':
        this.player.vel.z = 1;
        break;
      case 'KeyD':
        this.player.vel.x = 1;
        break;
      case 'KeyQ':
        this.player.vel.y = -1;
        break;
      case 'KeyE':
        this.player.vel.y = 1;
        break;
      case 'Space':
        this.player.vel.y = 1;
        break;
    }
  }
  handleKeyUp(code: string): void {
    switch (code) {
      case 'KeyW':
        this.player.vel.z = 0;
        break;

      case 'KeyA':
        this.player.vel.x = 0;
        break;
      case 'KeyS':
        this.player.vel.z = 0;
        break;
      case 'KeyD':
        this.player.vel.x = 0;
        break;
      case 'Space':
        this.player.vel.y = 0;
        break;
      case 'KeyQ':
        this.player.vel.y = 0;
        break;
      case 'KeyE':
        this.player.vel.y = 0;
        break;
    }
  }
}
