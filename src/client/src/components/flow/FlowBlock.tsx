import red from "../../redux/store";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { RootState } from "../../redux/store/index";
import { FullScreenBox } from "../../compLibrary/controls";
import { OpenProjectMenu } from "../project/openProject";
import { Color } from "../../compLibrary";
import { BackgroundBox } from "../../compLibrary/blockView";
import { changeInspectorTab } from "../../redux/store/inspector/actions";
import { Project, Node } from "../../models";
import {
  changeActiveBlockNode,
  changeActiveEdge,
} from "../../redux/store/project/actions";
import {
  useOnConnect,
  useOnDrop,
  useOnElementsRemove,
  useOnNodeDragStop,
} from "./hooks";
import {
  FindSelectedNode,
  GetBlockNodeTypes,
  IsFunction,
  IsLocation,
  SetDarkModeColor,
} from "./helpers/common";
import {
  CreateBlockElements,
  GetBlockEdgeTypes,
  IsBlockView,
} from "./helpers/block";
import ReactFlow, {
  ReactFlowProvider,
  Elements,
  Background,
} from "react-flow-renderer";
import {
  EDGE_TYPE,
  EdgeType,
  BackgroundVariant,
  SPLITVIEW_POSITION,
} from "../../models/project";

const FlowBlock = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = red.store.getState().darkMode.active as boolean;
  const node = FindSelectedNode();

  const project = useSelector<RootState>(
    (state) => state.projectState?.project
  ) as Project;

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const mainConnectNodes = useSelector<RootState>(
    (state) => state.connectView.mainNodes
  ) as Node[];

  const showBackground = IsLocation(splitViewNode) || IsLocation(node);

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(
        CreateBlockElements(
          project,
          node,
          splitView,
          splitViewNode,
          mainConnectNodes
        )
      );
      return setReactFlowInstance(_reactFlowInstance);
    },
    [project, node, splitView, splitViewNode, mainConnectNodes]
  );

  const OnElementsRemove = (elementsToRemove) => {
    const node = elementsToRemove[0];
    const fromEdge = project.edges.find((x) => x.fromNodeId === node.id);
    const toEdge = project.edges.find((x) => x.toNodeId === node.id);
    if (fromEdge) elementsToRemove.push(fromEdge);
    if (toEdge) elementsToRemove.push(toEdge);
    return useOnElementsRemove(elementsToRemove, setElements, dispatch);
  };

  const OnConnect = (params) => {
    return useOnConnect(
      params,
      project,
      setElements,
      dispatch,
      EDGE_TYPE.BLOCK as EdgeType
    );
  };

  const OnDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event, node) => {
    return useOnNodeDragStop(_event, node, dispatch);
  };

  const OnDrop = (_event) => {
    const selectedNode = FindSelectedNode();
    return useOnDrop(
      _event,
      dispatch,
      setElements,
      reactFlowInstance,
      reactFlowWrapper,
      project.id,
      splitView,
      selectedNode
    );
  };

  const OnElementClick = (_event, element) => {
    dispatch(changeActiveEdge(null, false));
    dispatch(changeActiveBlockNode(element.id));
    dispatch(changeInspectorTab(0));
  };

  const OnClick = (e) => {
    // Handle select Edge
    if (e.target.classList.contains("react-flow__edge-path")) {
      const edge = project.edges.find((x) => x.id === e.target.id);
      dispatch(changeActiveEdge(edge.id, true));
      dispatch(changeActiveBlockNode(null));
      dispatch(changeInspectorTab(0));
      return;
    }

    if (e.target.classList.contains("react-flow__pane")) {
      const selectedNode = FindSelectedNode();
      if (selectedNode) {
        dispatch(changeActiveEdge(null, false));
        dispatch(changeActiveBlockNode(selectedNode.id));
        dispatch(changeInspectorTab(0));
        return;
      }
    }
    dispatch(changeActiveEdge(null, false));
  };

  // Force rerender
  useEffect(() => {
    // dispatch(setSplitView(false));
    // dispatch(setNode(null));
    SetDarkModeColor(darkMode);
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance, dispatch, darkMode]);

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
              onClick={(e) => OnClick(e)}
            >
              <FullScreenBox />
              <BackgroundBox
                visible={showBackground}
                isSplitView={splitView}
                right={splitViewPosition()}
              >
                <Background
                  size={0.5}
                  color={Color.Grey}
                  variant={BackgroundVariant.Lines}
                />
              </BackgroundBox>
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      )}
      {!project && (
        <div>
          <ProjectMainMenu />
          <OpenProjectMenu />
        </div>
      )}
    </>
  );
};

export default FlowBlock;
