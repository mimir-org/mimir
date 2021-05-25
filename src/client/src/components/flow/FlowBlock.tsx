import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { RootState } from "./../../redux/store/index";
import FullscreenBox from "../../componentLibrary/controls/FullscreenBox";
import { EDGE_TYPE, EdgeType } from "../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import { changeActiveNode, get } from "../../redux/store/project/actions";
import { Color } from "../../componentLibrary";
import { GetBlockNodeTypes } from "./helpers";
import { BackgroundBox } from "../../componentLibrary/blockView";
import { CreateBlockElements, GetBlockEdgeTypes } from "./helpers/block";
import {
  Project,
  VIEW_TYPE,
  BackgroundVariant,
  Node,
  NODE_TYPE,
  SPLITVIEW_POSITION,
} from "../../models/project";
import {
  GetProjectId,
  HasProject,
  SetProject,
} from "../../redux/store/localStorage";
import ReactFlow, {
  ReactFlowProvider,
  Elements,
  Background,
} from "react-flow-renderer";
import {
  useOnConnect,
  useOnConnectStart,
  useOnConnectStop,
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

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  SetProject(project);
  const node = project?.nodes.find((node) => node.isSelected);

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const isBlockView = useSelector<RootState>(
    (state) => state.flow.view === VIEW_TYPE.BLOCKVIEW
  ) as boolean;

  const isLocationNode =
    splitViewNode?.type === NODE_TYPE.LOCATION ||
    node?.type === NODE_TYPE.LOCATION;

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(
        CreateBlockElements(project, node?.id, splitViewNode, splitView)
      );
      return setReactFlowInstance(_reactFlowInstance);
    },
    [node, project, splitViewNode, splitView]
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

  const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
    return useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e) => {
    return useOnConnectStop(
      e,
      project,
      reactFlowInstance,
      node.id,
      reactFlowWrapper,
      dispatch
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
    return useOnDrop(
      _event,
      dispatch,
      setElements,
      reactFlowInstance,
      reactFlowWrapper,
      splitView
    );
  };

  const OnElementClick = (_event, element) => {
    // dispatch(changeActiveNode(element.id)); // TODO: FIX
  };

  const OnUpdatePosition = () => {
    return useOnUpdatePosition(project, dispatch);
  };

  // Force rerender
  useEffect(() => {
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance]);

  window.onresize = () => {
    OnLoad(reactFlowInstance);
    OnUpdatePosition();
  };

  useEffect(() => {
    if (!project) {
      const projectId = GetProjectId();
      dispatch(get(projectId));
    }
  }, [dispatch, project]);

  const splitViewPosition = () => {
    if (
      splitViewNode?.type === NODE_TYPE.LOCATION &&
      node?.type === NODE_TYPE.FUNCTION
    ) {
      return SPLITVIEW_POSITION.RIGHT;
    }
  };

  return (
    <>
      {isBlockView && (
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
              onConnectEnd={OnConnectStop}
              onConnectStart={OnConnectStart}
              zoomOnScroll={false}
              paneMoveable={false}
            >
              <FullscreenBox />
              <BackgroundBox
                visible={isLocationNode}
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
      {!project && !HasProject() && (
        <div>
          <ProjectMainMenu />
          <OpenProjectMenu />
        </div>
      )}
    </>
  );
};

export default FlowBlock;
