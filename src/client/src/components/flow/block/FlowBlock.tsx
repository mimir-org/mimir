import ReactFlow, { ReactFlowProvider, Elements, Background } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../../project";
import { RootState } from "../../../redux/store/index";
import { FullScreenBox } from "../../../compLibrary/controls";
import { OpenProjectMenu } from "../../project/openProject";
import { Color, Size } from "../../../compLibrary";
import { BackgroundBox } from "./styled";
import { changeInspectorTab } from "../../../modules/inspector/redux/tabs/actions";
import { Node, BlobData } from "../../../models";
import { ProjectState } from "../../../redux/store/project/types";
import { LibraryState } from "../../../redux/store/library/types";
import { GetBlockEdgeTypes, IsBlockView, OnBlockClick } from "../block/helpers";
import { CreateBlockElements } from "../creators";
import { useOnConnect, useOnDrop, useOnRemove, useOnDragStop } from "../hooks";
import { setModuleVisibility } from "../../../redux/store/modules/actions";
import { setActiveBlockNode, setActiveEdge } from "../../../redux/store/project/actions";
import { GetSelectedNode, GetBlockNodeTypes, IsFunction, IsLocation, SetDarkModeColor } from "../helpers";
import { EDGE_TYPE, EdgeType, BackgroundVariant, SPLITVIEW_POSITION, MODULE_TYPE } from "../../../models/project";
import { changeInspectorHeight } from "../../../modules/inspector/redux/height/actions";

/**
 * Component for the Flow library in BlockView
 * @returns a scene with Flow elements and Mimir nodes, transports and edges.
 */
const FlowBlock = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = useSelector<RootState>((s) => s.darkMode.active) as boolean;
  const projectState = useSelector<RootState>((s) => s.projectState) as ProjectState;
  const splitView = useSelector<RootState>((s) => s.splitView.visible) as boolean;
  const splitViewNode = useSelector<RootState>((s) => s.splitView.node) as Node;
  const mainConnectNodes = useSelector<RootState>((s) => s.connectView.mainNodes) as Node[];
  const icons = useSelector<RootState>((s) => s.typeEditor.icons) as BlobData[];
  const library = useSelector<RootState>((s) => s.library) as LibraryState;
  const inspectorOpen = useSelector<RootState>((s) => s.modules.types[0].visible) as boolean;
  const node = GetSelectedNode();
  const showBackground = IsLocation(splitViewNode) || IsLocation(node);
  const project = projectState?.project;

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(CreateBlockElements(project, node, splitView, splitViewNode, mainConnectNodes));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [project, node, splitView, splitViewNode, mainConnectNodes]
  );

  const OnElementsRemove = (elementsToRemove) => {
    const nodeToRemove = elementsToRemove[0];
    project.edges?.forEach((edge) => {
      if (edge.fromNodeId === nodeToRemove.id || edge.toNodeId === nodeToRemove.id) elementsToRemove.push(edge);
    });

    return useOnRemove(elementsToRemove, setElements, dispatch);
  };

  const OnConnect = (params) => {
    return useOnConnect(params, project, setElements, dispatch, EDGE_TYPE.BLOCK as EdgeType, library);
  };

  const OnDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event, activeNode) => {
    return useOnDragStop(_event, activeNode, dispatch);
  };

  const OnDrop = (event) => {
    return useOnDrop(project, event, dispatch, setElements, reactFlowInstance, reactFlowWrapper, icons, library);
  };

  const OnElementClick = (_event, element) => {
    if (!splitView) {
      dispatch(setActiveEdge(null, false));
    }
    dispatch(setActiveBlockNode(element.id));
    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));
    dispatch(changeInspectorTab(0));
    if (inspectorOpen) dispatch(changeInspectorHeight(Size.ModuleClosed));
    else dispatch(changeInspectorHeight(Size.ModuleOpen));
  };

  // Rerender
  useEffect(() => {
    SetDarkModeColor(darkMode);
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance, darkMode]);

  const splitViewPosition = () => {
    if (IsLocation(splitViewNode) && IsFunction(node)) {
      return SPLITVIEW_POSITION.RIGHT;
    }
  };

  return (
    <>
      {IsBlockView() && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              nodeTypes={GetBlockNodeTypes}
              edgeTypes={GetBlockEdgeTypes}
              onConnect={OnConnect}
              onElementsRemove={OnElementsRemove}
              onLoad={OnLoad}
              onDrop={OnDrop}
              onDragOver={OnDragOver}
              onNodeDragStop={OnNodeDragStop}
              onElementClick={OnElementClick}
              zoomOnScroll={false}
              paneMoveable={false}
              onClick={(e) => OnBlockClick(e, dispatch, project)}
            >
              <FullScreenBox />
              <BackgroundBox visible={showBackground} isSplitView={splitView} right={splitViewPosition()}>
                <Background size={0.5} color={Color.Grey} variant={BackgroundVariant.Lines} />
              </BackgroundBox>
            </ReactFlow>
          </div>
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

export default FlowBlock;
