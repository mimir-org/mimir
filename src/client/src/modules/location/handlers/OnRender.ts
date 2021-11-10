import * as THREE from "three";

const OnRender = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
  renderer.current.render(scene.current, camera.current);
};

export default OnRender;
