import * as THREE from "three";
import { Node } from "../../../models";

const RenderCube = (
  node: Node,
  cubes: THREE.Mesh,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const newSize = new THREE.BoxGeometry(node?.width, node?.height, node?.length);

  if (cubes) {
    cubes.current[0].geometry.dispose();
    cubes.current[0].geometry = newSize;
  }

  renderer.current.render(scene.current, camera.current);
};

export default RenderCube;

// const animate = function () {
//   requestAnimationFrame(animate);
//   cubes[0].rotation.x += 0.01;
//   cubes[0].rotation.y += 0.01;
//   cubes[0].rotation.z += 0.01;
//   renderer.render(scene, camera);
// };

// OnRender(renderer, scene, camera);
// const animate = function () {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// };
// animate();
