import * as THREE from "three";

const OnWindowResize = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export default OnWindowResize;
