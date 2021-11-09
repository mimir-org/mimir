import * as THREE from "three";

const CreateCube = (scene: THREE.Scene) => {
  const cubeGeometry = new THREE.BoxGeometry(500, 500, 500);

  const mesh = new THREE.Mesh(
    cubeGeometry,
    new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading,
    })
  );

  const line = new THREE.LineSegments(
    new THREE.WireframeGeometry(cubeGeometry),
    new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1,
      opacity: 0.25,
      transparent: true,
    })
  );

  scene.add(mesh);
  scene.add(line);
};

const CreateCubes = (scene: THREE.Scene, parent: Node, children: Node[]) => {
  CreateCube(scene);
};

export default CreateCubes;
