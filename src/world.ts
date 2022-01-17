import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import createCamera from './modules/camera';
import Controller from './modules/controller';
import createCube from './modules/cube';
import createLight from './modules/light';
import Player from './modules/player';
import createRenderer from './modules/renderer';
import Resizer from './modules/resizer';
import createScene from './modules/scene';

export default class World {
  player: Player;
  scene: Scene;
  renderer: WebGLRenderer;
  controller: Controller;

  constructor(private container: Element) {
    const camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.player = new Player(camera);
    this.controller = new Controller(this.player);
    container.append(this.renderer.domElement);

    const chunk = [
      [
        [1, 1, 1],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 2, 2],
        [2, 2, 2],
        [0, 2, 2],
      ],
    ];

    chunk.forEach((layer, y) => {
      layer.forEach((row, z) => {
        row.forEach((block, x) => {
          if (block !== 0) {
            let type: 'dirt' | 'stone' = 'dirt';

            if (block === 1) {
              type = 'dirt';
            } else if (block === 2) {
              type = 'stone';
            }

            const cube = createCube(type);
            cube.position.set(x * 3, -y * 3, z * 3);

            this.scene.add(cube);
          }
        });
      });
    });

    const light = createLight();

    this.scene.add(light);

    const resizer = new Resizer(container, this.player.camera, this.renderer);
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.player.update();
    this.renderer.render(this.scene, this.player.camera);
  }
}
