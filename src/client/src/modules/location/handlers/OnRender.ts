import * as THREE from "three";

const OnRender = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
  console.log(camera);
  renderer.render(scene, camera);
}

export default OnRender;