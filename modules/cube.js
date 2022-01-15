import { BoxBufferGeometry, Mesh, MeshStandardMaterial, } from 'three';
export default function createCube() {
    const geometry = new BoxBufferGeometry(3, 3, 3);
    const material = new MeshStandardMaterial({
        color: 'purple',
    });
    const cube = new Mesh(geometry, material);
    cube.rotation.set(-0.5, -0.1, 0.8);
    return cube;
}
