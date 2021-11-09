import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CreateControls = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  return controls;
}

export default CreateControls;
