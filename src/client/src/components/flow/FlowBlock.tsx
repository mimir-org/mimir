import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { ProjectState } from "../../redux/store/project/types";
import { RootState } from "./../../redux/store/index";
import FullscreenBox from "../../componentLibrary/controls/FullscreenBox";
import { VIEW_TYPE } from "../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import { get } from "../../redux/store/project/actions";
import { GetProject, HasProject } from "../../redux/store/localStorage";
import ReactFlow, {
  ReactFlowProvider,
  Elements,
  Controls,
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

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  if (projectState.project) {
    const node = projectState.project.nodes.find((node) => node.isSelected);
    nodeId = node ? node.id : "";
  }

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(CreateProjectElementBlockNodes(projectState.project, nodeId));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [nodeId, projectState.project]
  );

  const OnElementsRemove = (elementsToRemove) => {
    return useOnElementsRemove(elementsToRemove, setElements, dispatch);
  };

  const OnConnect = (params) => {
    return useOnConnect(params, projectState, setElements, dispatch);
  };

  const OnConnectStart = (e, { nodeId, handleType, handleId }) => {
    return useOnConnectStart(e, { nodeId, handleType, handleId });
  };

  const OnConnectStop = (e) => {
    return useOnConnectStop(
      e,
      projectState,
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
    return useOnUpdatePosition(projectState, dispatch);
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
    if (projectState.project === null) {
      const projectId = GetProject();
      dispatch(get(projectId));
    }
  }, [dispatch, projectState.project]);

  const visible = useSelector<RootState>(
    (state) => state.flow.view === VIEW_TYPE.BLOCKVIEW
  ) as boolean;

  return (
    <>
      {projectState.project && visible && (
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
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      )}
      {!projectState.project && !HasProject() && (
        <div>
          <ProjectMainMenu />
          <OpenProjectMenu />
        </div>
      )}
    </>
  );
};

export default FlowBlock;
