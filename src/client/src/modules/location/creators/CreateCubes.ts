import * as THREE from "three";
import { Color } from "../../../compLibrary/colors/Color";
import { Node } from "../../../models";
import { GetAttributeMap, GetSize } from "../helpers";

const CreateCube = (scene: THREE.Scene, node: Node): THREE.Object3D[] => {
  const map = GetAttributeMap(node);
  const size = GetSize(map);

  const cubeGeometry = new THREE.BoxGeometry(size.width, size.height, size.depth);

  const mesh = new THREE.Mesh(
    cubeGeometry,
    new THREE.MeshPhongMaterial({
      color: Color.MAGENTA,
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

  mesh.userData.nodeId = node?.id;
  line.userData.nodeId = node?.id;

  scene.current.add(mesh);
  scene.current.add(line);

  const elements = [] as THREE.Object3D[];
  elements.push(mesh);
  elements.push(line);
  return elements;
};

const CreateCubes = (scene: THREE.Scene, nodes: Node[]): THREE.Object3D[] => {
  let cubeGeometries = [] as THREE.Object3D[];

  nodes?.forEach((x) => {
    cubeGeometries = cubeGeometries.concat(CreateCube(scene, x));
  });
  return cubeGeometries;
};

export default CreateCubes;
