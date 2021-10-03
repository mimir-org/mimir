import * as Helpers from "./helpers/";
import ReactFlow, { ReactFlowProvider, Elements } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../../project";
import { RootState } from "../../../redux/store/index";
import { useOnConnect, useOnDrop, useOnRemove } from "../hooks";
import { FullScreenBox } from "../../../compLibrary/controls";
import { Size } from "../../../compLibrary";
import { OpenProjectMenu } from "../../project/openProject/";
import { BlobData } from "../../../models";
import { ProjectState } from "../../../redux/store/project/types";
import { IsBlockView } from "../block/helpers";
import { changeInspectorTab } from "../../../modules/inspector/redux/tabs/actions";
import { SetDarkModeColor } from "../helpers";
import { CreateTreeElements } from "../creators";
import { LibraryState } from "../../../redux/store/library/types";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { MODULE_TYPE } from "../../../models/project";
import { getBlobData } from "../../../redux/store/typeEditor/actions";
import { SetPanelHeight } from "../../../modules/inspector/helpers";
import { updatePosition, setActiveNode, setActiveEdge } from "../../../redux/store/project/actions";

/**
 * Component for the Flow library in TreeView
 * @returns a scene with Flow elements and Mimir nodes, transports and edges.
 */
const FlowTree = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = useSelector<RootState>((s) => s.darkMode.active) as boolean;
  const projectState = useSelector<RootState>((s) => s.projectState) as ProjectState;
  const icons = useSelector<RootState>((s) => s.typeEditor.icons) as BlobData[];
  const library = useSelector<RootState>((s) => s.library) as LibraryState;
  const project = projectState?.project;

  const OnElementsRemove = (elementsToRemove) => {
    return useOnRemove(elementsToRemove, setElements, dispatch);
  };

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(CreateTreeElements(project));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [project]
  );

  const OnConnect = (params) => {
    const fromNode = project.nodes.find((x) => x.id === params.source);
    const fromConnector = fromNode.connectors.find((x) => x.id === params.sourceHandle);
    const edgeType = Helpers.GetEdgeType(fromConnector);
    return useOnConnect(params, project, setElements, dispatch, edgeType, library);
  };

  const OnDragOver = (event) => {
    event.preventDefault();
  };

  const OnNodeDragStop = (_event, node) => {
    dispatch(updatePosition(node.id, node.position.x, node.position.y));
  };

  const OnDrop = (event) => {
    return useOnDrop(project, event, dispatch, setElements, reactFlowInstance, reactFlowWrapper, icons, library);
  };

  const OnElementClick = (_event, element) => {
    dispatch(setActiveEdge(null, false));
    dispatch(setActiveNode(element.id, true));
    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));
    dispatch(changeInspectorTab(0));
    const panel = document.getElementById("InspectorModule");
    if (panel.style.height === Size.ModuleClosed + "px") SetPanelHeight(Size.InspectorModuleOpen); // TODO: rewrite
  };

  // Rerender
  useEffect(() => {
    SetDarkModeColor(darkMode);
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance, darkMode]);

  // Get symbols from TypeEditor
  useEffect(() => {
    dispatch(getBlobData());
  }, [dispatch]);

  return (
    <>
      {!IsBlockView() && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}></div>
          <ReactFlow
            elements={elements}
            onConnect={OnConnect}
            onElementsRemove={OnElementsRemove}
            onLoad={OnLoad}
            onDrop={OnDrop}
            onDragOver={OnDragOver}
            onNodeDragStop={OnNodeDragStop}
            onElementClick={OnElementClick}
            nodeTypes={Helpers.GetNodeTypes}
            edgeTypes={Helpers.GetEdgeTypes}
            snapToGrid={true}
            snapGrid={[5, 5]}
            onClick={(e) => Helpers.OnTreeClick(e, dispatch, project)}
          >
            <FullScreenBox />
          </ReactFlow>
        </ReactFlowProvider>
      )}
      {!project && (
        <div>
          <ProjectMainMenu project={project} />
          <OpenProjectMenu projectState={projectState} dispatch={dispatch} />
        </div>
      )}
    </>
  );
};

export default FlowTree;
