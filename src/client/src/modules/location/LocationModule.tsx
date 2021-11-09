import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OnRender, OnWindowResize } from "./handlers";
import { CreateCamera, CreateControls, CreateLights, CreateRenderer, CreateScene } from "./helpers";
import { LocationModuleWrapper } from "./styled";

interface Props {
  visible: boolean;
}

const createCube = (scene: THREE.Scene) => {
  const cubeGeometry = new THREE.BoxGeometry(500, 700, 200);

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

const LocationModule = ({ visible }: Props) => {
  const mountRef = useRef(null);
  const [camera] = useState(CreateCamera());
  const [scene] = useState(CreateScene());
  const [renderer] = useState(CreateRenderer());
  const [controls] = useState(CreateControls(renderer, camera));

  useEffect(() => {
    mountRef.current.appendChild(renderer.domElement);
    CreateLights(scene);

    createCube(scene);

    controls.addEventListener("change", () => OnRender(renderer, scene, camera));
    window.addEventListener("resize", () => OnWindowResize(renderer, camera), false);

    OnRender(renderer, scene, camera);
  }, [camera, controls, renderer, scene]);

  return (
    <LocationModuleWrapper>
      <div ref={mountRef} />
    </LocationModuleWrapper>
  );
};
export default LocationModule;
