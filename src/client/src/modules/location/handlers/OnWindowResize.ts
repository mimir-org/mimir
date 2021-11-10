import * as THREE from "three";

const OnWindowResize = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
  camera.current.aspect = window.innerWidth / window.innerHeight;
  camera.current.updateProjectionMatrix();
  renderer.current.setSize(window.innerWidth, window.innerHeight);
};

export default OnWindowResize;
