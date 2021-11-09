import * as THREE from "three";

const CreateCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 6000);
  camera.position.x = 750;
  camera.position.y = 500;
  camera.position.z = 1250;

  return camera;
}

export default CreateCamera