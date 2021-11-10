import { useEffect, useRef } from "react";
import { OnRender, OnWindowResize } from "./handlers";
import { CreateCamera, CreateControls, CreateCubes, CreateLights, CreateRenderer, CreateScene } from "./creators";
import { LocationModuleBox } from "./styled";
import { Node } from "../../models";
import { RenderCube } from "./helpers";

interface Props {
  visible: boolean;
  selectedNode: Node;
}

const LocationModule = ({ visible, selectedNode }: Props) => {
  const mountRef = useRef(null);
  const camera = useRef(null);
  const scene = useRef(null);
  const renderer = useRef(null);
  const controls = useRef(null);
  const cubes = useRef(null);

  useEffect(() => {
    camera.current = CreateCamera();
    scene.current = CreateScene();
    renderer.current = CreateRenderer();
    controls.current = CreateControls(renderer, camera);
    cubes.current = CreateCubes(scene, selectedNode, []);
    CreateLights(scene);
    mountRef.current?.appendChild(renderer.current.domElement);
    controls.current.addEventListener("change", () => OnRender(renderer, scene, camera));
    window.addEventListener("resize", () => OnWindowResize(renderer, camera), false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    RenderCube(selectedNode, cubes, renderer, scene, camera);
  }, [selectedNode, visible]);

  return (
    visible && (
      <LocationModuleBox id="Location3D">
        <div ref={mountRef} />
      </LocationModuleBox>
    )
  );
};
export default LocationModule;
