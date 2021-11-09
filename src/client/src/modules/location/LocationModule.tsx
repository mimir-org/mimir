import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OnRender, OnWindowResize } from "./handlers";
import { CreateCamera, CreateControls, CreateLights, CreateRenderer, CreateScene } from "./helpers";
import { LocationModuleWrapper } from "./styled";
import { EquinorTestLogo } from "../../assets/icons/equinor/nodes";

const createCube = (scene: THREE.Scene) => {
  const cubeGeometry = new THREE.BoxGeometry(680, 350, 200);

  const texture = new THREE.TextureLoader().load(EquinorTestLogo);
  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const mesh = new THREE.Mesh(cubeGeometry, material);

  // const mesh = new THREE.Mesh(
  //   cubeGeometry,
  //   new THREE.MeshPhongMaterial({
  //     color: 0x156289,
  //     emissive: 0x072534,
  //     side: THREE.DoubleSide,
  //     shading: THREE.FlatShading,
  //   })
  // );

  // const mesh = new THREE.Mesh(cubeGeometry, material);

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

interface Props {
  visible: boolean;
}

const LocationModule = ({ visible }: Props) => {
  const mountRef = useRef(null);
  const [camera] = useState(CreateCamera());
  const [scene] = useState(CreateScene());
  const [renderer] = useState(CreateRenderer());
  const [controls] = useState(CreateControls(renderer, camera));

  useEffect(() => {
    mountRef.current?.appendChild(renderer.domElement);
    CreateLights(scene);
    createCube(scene);

    controls.addEventListener("change", () => OnRender(renderer, scene, camera));
    window.addEventListener("resize", () => OnWindowResize(renderer, camera), false);

    OnRender(renderer, scene, camera);
  }, [camera, controls, renderer, scene, visible]);

  return (
    visible && (
      <LocationModuleWrapper id="Location3D">
        <div ref={mountRef} />
      </LocationModuleWrapper>
    )
  );
};
export default LocationModule;
