import { Color, Scene } from 'three';

export default function createScene() {
  const scene = new Scene();

  scene.background = new Color('skyblue');

  return scene;
}
