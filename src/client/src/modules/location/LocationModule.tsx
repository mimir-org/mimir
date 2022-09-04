import { useEffect, useRef } from "react";
import { OnRender, OnWindowResize } from "./handlers";
import { CreateCamera, CreateControls, CreateCubes, CreateLights, CreateRenderer, CreateScene } from "./creators";
import { LocationModuleContainer } from "./LocationModule.styled";
import { Node } from "@mimirorg/modelbuilder-types";
import { RenderCubes } from "./helpers";

interface Props {
  visible: boolean;
  rootNode: Node;
  nodes: Node[];
}

/**
 * Component for 3D view of the Location Aspect.
 * This functionality is currently not in use, but is planned for future development.
 * @param interface
 * @returns as JSX element with 3D functionality.
 */
const LocationModule = ({ visible, rootNode, nodes }: Props) => {
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
    cubes.current = CreateCubes(scene, nodes?.concat(rootNode));
    CreateLights(scene);
    mountRef.current?.appendChild(renderer.current.domElement);
    controls.current.addEventListener("change", () => OnRender(renderer, scene, camera));
    window.addEventListener("resize", () => OnWindowResize(renderer, camera), false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    RenderCubes(rootNode?.id, nodes?.concat(rootNode), cubes, renderer, scene, camera);
  }, [rootNode, nodes, visible]);

  return (
    visible && (
      <LocationModuleContainer id="Location3D">
        <div ref={mountRef} />
      </LocationModuleContainer>
    )
  );
};

export default LocationModule;
