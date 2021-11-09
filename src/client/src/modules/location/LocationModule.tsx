import { useEffect, useRef, useState } from "react";
import { OnRender, OnWindowResize } from "./handlers";
import { CreateCamera, CreateControls, CreateCubes, CreateLights, CreateRenderer, CreateScene } from "./helpers";
import { LocationModuleWrapper } from "./styled";
import { Node } from "../../models";
import * as THREE from "three";

interface Props {
  visible: boolean;
  selectedNode: Node;
}

let camera, scene, renderer, controls, cubes;

const LocationModule = ({ visible, selectedNode }: Props) => {
  const mountRef = useRef(null);
  // const [camera, setCamera] = useState(null);
  // const [scene, setScene] = useState(null);
  // const [renderer, setRenderer] = useState(null);
  // const [controls, setControls] = useState(null);
  // const [cubes, setCubes] = useState(null);

  useEffect(() => {
    console.log("Constructor");
    camera = CreateCamera();
    scene = CreateScene();
    renderer = CreateRenderer();
    controls = CreateControls(renderer, camera);
    CreateLights(scene);
    cubes = CreateCubes(scene, selectedNode, []);
    mountRef.current?.appendChild(renderer.domElement);
    controls.addEventListener("change", () => OnRender(renderer, scene, camera));
    window.addEventListener("resize", () => OnWindowResize(renderer, camera), false);

    // const animate = function () {
    //   requestAnimationFrame(animate);
    //   cubes[0].rotation.x += 0.01;
    //   cubes[0].rotation.y += 0.01;
    //   cubes[0].rotation.z += 0.01;
    //   renderer.render(scene, camera);

    //   console.log("render");
    // };

    // animate();
  }, []);

  useEffect(() => {
    // if (cubes?.length >= 0 && selectedNode) {
    //   console.log("New Values");
    //   cubes[0].geometry.parameters.width = selectedNode.width;
    //   // cubes[0].parameters.height = selectedNode.height;
    //   cubes[0].geometry.parameters.length = selectedNode.length;
    //   cubes[0].rotation.x += 0.01;
    //   // THREE.
    // }
    // console.log(cubes);
    // console.log("height/width/length:", selectedNode.height, selectedNode.width, selectedNode.length);
    let new_geometry = new THREE.BoxGeometry(selectedNode.width, selectedNode.height, selectedNode.length);
    cubes[0].geometry.dispose();
    cubes[0].geometry = new_geometry;

    // cubes[0].position.x = selectedNode.width;
    renderer.render(scene, camera);
    // OnRender(renderer, scene, camera);
    // const animate = function () {
    //   requestAnimationFrame(animate);
    //   renderer.render(scene, camera);
    // };
    // animate();
  }, [selectedNode]);

  return (
    visible && (
      <LocationModuleWrapper id="Location3D">
        <div ref={mountRef} />
      </LocationModuleWrapper>
    )
  );
};
export default LocationModule;
