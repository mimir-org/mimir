import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CreateControls = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
  const controls = new OrbitControls(camera.current, renderer.current.domElement);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.0;

  return controls;
};

export default CreateControls;
