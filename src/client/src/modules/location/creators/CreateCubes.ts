import * as THREE from "three";
import { Color } from "../../../compLibrary";
import { Node } from "../../../models";

const CreateCube = (scene: THREE.Scene, width: number, height: number, depth: number): THREE.Mesh => {
  const cubeGeometry = new THREE.BoxGeometry(width, height, depth);

  const mesh = new THREE.Mesh(
    cubeGeometry,
    new THREE.MeshPhongMaterial({
      color: Color.LocationMain,
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

  scene.current.add(mesh);
  scene.current.add(line);
  return mesh;
};

const CreateCubes = (scene: THREE.Scene, parent: Node, children: Node[]): THREE.Mesh[] => {
  const cubeGeometries = [] as THREE.Mesh[];
  cubeGeometries.push(CreateCube(scene, parent?.width, parent?.height, parent?.length));
  return cubeGeometries;
};

export default CreateCubes;
