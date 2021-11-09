import { useEffect, useRef, useState } from "react";
import { OnRender, OnWindowResize } from "./handlers";
import { CreateCamera, CreateControls, CreateCubes, CreateLights, CreateRenderer, CreateScene } from "./helpers";
import { LocationModuleWrapper } from "./styled";

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
    mountRef.current.appendChild(renderer.domElement);
    CreateLights(scene);

    CreateCubes(scene, null, []);

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
