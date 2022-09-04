import * as THREE from "three";
import { GetAttributeMap, GetPosition, GetSize } from ".";
import { Node } from "@mimirorg/modelbuilder-types";

const changeNode = (node: Node, cube: THREE.Object3D, isRoot: boolean) => {
  const map = GetAttributeMap(node);
  const size = GetSize(map);
  const pos = GetPosition(map, isRoot);

  const newSize = new THREE.BoxGeometry(size.width, size.height, size.depth);
  cube.geometry.dispose();
  cube.geometry = newSize;

  cube.position.x = pos.relativeX;
  cube.position.y = pos.relativeY;
  cube.position.z = pos.relativeZ;
};

const RenderCubes = (
  rootNodeId: string,
  nodes: Node[],
  cubes: THREE.Object3D,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  cubes.current.forEach((cube: THREE.Object3D) => {
    const isRoot = cube.userData.nodeId === rootNodeId;
    const node = nodes?.find((x) => x?.id === cube.userData.nodeId);
    changeNode(node, cube, isRoot);
  });

  renderer.current.render(scene.current, camera.current);
};

export default RenderCubes;
