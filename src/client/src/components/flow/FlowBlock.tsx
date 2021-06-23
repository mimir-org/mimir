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
import { setSplitView, setNode } from "../../redux/store/splitView/actions";
import { Project, Node } from "../../models";
import { changeActiveBlockNode } from "../../redux/store/project/actions";
import { IsConnectView } from "./helpers/block/connectView";
import { removeMainNodes } from "../../redux/store/connectView/actions";
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

  // Flush ConnectView
  useEffect(() => {
    dispatch(removeMainNodes());
  }, [dispatch]);

  const project = useSelector<RootState>(
    (state) => state.projectState?.project
  ) as Project;

  const node = project?.nodes?.find((node) => node.isSelected);

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const selectedBlockNodeId = useSelector<RootState>(
    (state) =>
      state.projectState.project?.nodes.find((x) => x.isBlockSelected)?.id
  ) as string;

  const mainConnectNodes = useSelector<RootState>(
    (state) => state.connectView.mainNodes
  ) as Node[];
  const mainNode = mainConnectNodes.find((x) => x?.id === selectedBlockNodeId);
  const connectNodes = mainNode?.connectNodes as Node[];

  const showBackground = IsLocation(splitViewNode) || IsLocation(node);

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(
        CreateBlockElements(
          project,
          node,
          splitView,
          splitViewNode,
          mainNode,
          connectNodes
        )
      );
      return setReactFlowInstance(_reactFlowInstance);
    },
    [project, node, splitView, splitViewNode, mainNode, connectNodes]
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
    if (!IsConnectView()) {
      dispatch(changeActiveBlockNode(element.id));
      dispatch(changeInspectorTab(0));
    }
  };

  // Force rerender
  useEffect(() => {
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance]);

  // Flush SplitView
  useEffect(() => {
    dispatch(setSplitView(false));
    dispatch(setNode(null));
  }, [dispatch]);

  useEffect(() => {
    const darkMode = red.store.getState().darkMode.active as boolean;
    SetDarkModeColor(darkMode);
  }, []);

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
