import { DirectionalLight } from 'three';

export default function createLight() {
  const light = new DirectionalLight('white', 8);

  light.position.set(10, 10, 10);

  return light;
}
