import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CreateControls = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.1;
  controls.zoomSpeed = 0.1;
  return controls;
}

export default CreateControls;
