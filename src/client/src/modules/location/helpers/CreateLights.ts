import * as THREE from "three";

const CreateLights = (scene: THREE.Scene) => {
  const lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
  lights[2] = new THREE.PointLight(0xffffff, 1, 0);

  lights[0].position.set(0, 2000, 0);
  lights[1].position.set(1000, 2000, 1000);
  lights[2].position.set(-1000, -2000, -1000);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
}

export default CreateLights;
