import { WebGLRenderer } from 'three';

export default function createRenderer() {
  const renderer = new WebGLRenderer();

  renderer.physicallyCorrectLights = true;

  return renderer;
}
