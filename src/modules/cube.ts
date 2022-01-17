import {
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereBufferGeometry,
  TextureLoader,
} from 'three';

export default function createCube(type: 'dirt' | 'stone') {
  const loader = new TextureLoader();
  const geometry = new BoxBufferGeometry(3, 3, 3);
  const material = new MeshStandardMaterial({
    color:
      type === 'dirt' ? 'yellowgreen' : type === 'stone' ? 'white' : 'black',
    map: loader.load('images/dirt.jpg'),
  });
  const cube = new Mesh(geometry, material);

  console.log(type);

  // cube.rotation.set(-0.5, -0.1, 0.8);

  return cube;
}
