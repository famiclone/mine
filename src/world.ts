import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import createCamera from './modules/camera';
import Controller from './modules/controller';
import createCube from './modules/cube';
import createLight from './modules/light';
import createRenderer from './modules/renderer';
import Resizer from './modules/resizer';
import createScene from './modules/scene';

export default class World {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  controller: Controller;

  constructor(private container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.controller = new Controller(this.camera);
    container.append(this.renderer.domElement);

    const cube = createCube();
    const light = createLight();

    this.scene.add(cube, light);

    const resizer = new Resizer(container, this.camera, this.renderer);
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);
  }
}
