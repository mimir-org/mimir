import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { RootState } from "./../../redux/store/index";
import FullscreenBox from "../../componentLibrary/controls/FullscreenBox";
import {
  Project,
  VIEW_TYPE,
  BackgroundVariant,
  Node,
} from "../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import { changeActiveNode, get } from "../../redux/store/project/actions";
import { Color } from "../../componentLibrary";
import {
  GetProjectId,
  HasProject,
  SetProject,
} from "../../redux/store/localStorage";
import ReactFlow, {
  ReactFlowProvider,
  Elements,
  Controls,
  Background,
} from "react-flow-renderer";
import {
  CreateProjectElementBlockNodes,
  GetBlockNodeTypes,
  GetBlockEdgeTypes,
} from "./helpers";
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
  let nodeId: string;

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  SetProject(project);

  if (project) {
    const node = project.nodes.find((node) => node.isSelected);
    nodeId = node ? node.id : "";
  }

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(
        CreateProjectElementBlockNodes(project, nodeId, splitViewNode)
      );
      return setReactFlowInstance(_reactFlowInstance);
    },
    [nodeId, project, splitViewNode]
  );

  const OnElementsRemove = (elementsToRemove) => {
    return useOnElementsRemove(elementsToRemove, setElements, dispatch);
  };

  const OnConnect = (params) => {
    return useOnConnect(params, project, setElements, dispatch);
  };

  const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
    return useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e) => {
    return useOnConnectStop(
      e,
      project,
      reactFlowInstance,
      nodeId,
      reactFlowWrapper,
      dispatch
    );
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
      reactFlowWrapper
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

  // Handling of project loading
  useEffect(() => {
    if (project === null) {
      const projectId = GetProjectId();
      dispatch(get(projectId));
    }
  }, [dispatch, project]);

  const visible = useSelector<RootState>(
    (state) => state.flow.view === VIEW_TYPE.BLOCKVIEW
  ) as boolean;

  const splitView = useSelector<RootState>((state) => state.splitView.visible);
  const hasSplitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as boolean;

  return (
    <>
      {project && visible && (
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
              onNodeDragStop={OnNodeDragStop}
              onElementClick={OnElementClick}
              onConnectEnd={OnConnectStop}
              onConnectStart={OnConnectStart}
              zoomOnScroll={false}
              paneMoveable={false}
            >
              <FullscreenBox />
              {splitView && hasSplitViewNode && (
                <Background
                  size={0.5}
                  color={Color.Grey}
                  variant={BackgroundVariant.Lines}
                />
              )}
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
