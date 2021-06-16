import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { RootState } from "../../redux/store/index";
import { FullScreenBox } from "../../compLibrary/controls";
import { EDGE_TYPE, EdgeType } from "../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import { changeActiveBlockNode } from "../../redux/store/project/actions";
import { Color } from "../../compLibrary";
import { BackgroundBox } from "../../compLibrary/blockView";
import { changeInspectorTab } from "../../redux/store/inspector/actions";
import { setSplitView, setNode } from "../../redux/store/splitView/actions";
import red from "../../redux/store";
import {
  addMainConnectNode,
  removeConnectNodes,
} from "../../redux/store/connectView/actions";
import {
  GetBlockNodeTypes,
  IsFunctionNode,
  IsLocationNode,
  SetDarkModeColor,
} from "./helpers/common";
import {
  CreateBlockElements,
  GetBlockEdgeTypes,
  IsBlockView,
} from "./helpers/block";
import {
  Project,
  BackgroundVariant,
  Node,
  SPLITVIEW_POSITION,
} from "../../models/project";
import ReactFlow, {
  ReactFlowProvider,
  Elements,
  Background,
} from "react-flow-renderer";
import {
  useOnConnect,
  useOnDrop,
  useOnElementsRemove,
  useOnNodeDragStop,
  useOnUpdatePosition,
} from "./hooks";

const FlowBlock = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();

  // Flush ConnectView
  useEffect(() => {
    dispatch(addMainConnectNode(null));
    dispatch(removeConnectNodes());
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

  const mainConnectNode = useSelector<RootState>(
    (state) => state.connectView.mainNode
  ) as Node;

  const connectViewNodes = useSelector<RootState>(
    (state) => state.connectView.connectNodes
  ) as Node[];

  const selectedBlockNodeId = useSelector<RootState>(
    (state) =>
      state.projectState.project?.nodes.find((x) => x.isBlockSelected)?.id
  ) as string;

  const showBackground = IsLocationNode(splitViewNode) || IsLocationNode(node);

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(
        CreateBlockElements(
          project,
          node?.id,
          mainConnectNode,
          connectViewNodes,
          selectedBlockNodeId,
          splitView,
          splitViewNode
        )
      );
      return setReactFlowInstance(_reactFlowInstance);
    },
    [
      connectViewNodes,
      mainConnectNode,
      node?.id,
      project,
      selectedBlockNodeId,
      splitView,
      splitViewNode,
    ]
  );

  const OnElementsRemove = (elementsToRemove) => {
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
    return useOnNodeDragStop(_event, node, dispatch, true);
  };

  const OnDrop = (_event) => {
    const selectedNode = project.nodes.find((x) => x.isSelected);

    return useOnDrop(
      _event,
      dispatch,
      setElements,
      reactFlowInstance,
      reactFlowWrapper,
      splitView,
      selectedNode
    );
  };

  const OnElementClick = (_event, element) => {
    if (!mainConnectNode) {
      dispatch(changeActiveBlockNode(element.id));
      dispatch(changeInspectorTab(0));
    }
  };

  const OnUpdatePosition = () => {
    return useOnUpdatePosition(project, dispatch);
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

  window.onresize = () => {
    OnLoad(reactFlowInstance);
    OnUpdatePosition();
  };

  const splitViewPosition = () => {
    if (IsLocationNode(splitViewNode) && IsFunctionNode(node)) {
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
