import createCamera from './modules/camera';
import createCube from './modules/cube';
import createLight from './modules/light';
import createRenderer from './modules/renderer';
import Resizer from './modules/resizer';
import createScene from './modules/scene';
export default class World {
    constructor(container) {
        this.container = container;
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        container.append(this.renderer.domElement);
        const cube = createCube();
        const light = createLight();
        this.scene.add(cube, light);
        const resizer = new Resizer(container, this.camera, this.renderer);
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
