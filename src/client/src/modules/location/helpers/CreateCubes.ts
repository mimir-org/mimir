import * as THREE from "three";
import { Node } from "../../../models";

const CreateCube = (scene: THREE.Scene, width: number, height: number, depth: number): THREE.Mesh => {
  const cubeGeometry = new THREE.BoxGeometry(width, height, depth); // width : Float, height : Float, depth : Float

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
  return mesh;
};

const CreateCubes = (scene: THREE.Scene, parent: Node, children: Node[]): THREE.Mesh[] => {
  const cubeGeometries = [] as THREE.Mesh[];
  cubeGeometries.push(CreateCube(scene, parent.width, parent.height, parent.length));
  return cubeGeometries;
};

export default CreateCubes;
