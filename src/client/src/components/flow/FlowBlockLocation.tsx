import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { ProjectState } from "../../redux/store/project/types";
import { RootState } from "../../redux/store/index";
import ReactFlow, { ReactFlowProvider, Elements } from "react-flow-renderer";
import { changeActiveNode, get } from "../../redux/store/project/actions";
import { NODE_TYPE } from "../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import {
  GetProject,
  HasProject,
} from "../../redux/store/localStorage/localStorage";
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

const FlowBlockLocation = () => {
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
    if (node.type === NODE_TYPE.LOCATION) {
      nodeId = node ? node.id : "";
    } else {
      nodeId = "";
    }
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

  const OnElementClick = (event, element) => {
    dispatch(changeActiveNode(element.id));
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

  return (
    <>
      {projectState.project && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              onConnect={OnConnect}
              onElementsRemove={OnElementsRemove}
              onLoad={OnLoad}
              onDrop={OnDrop}
              onNodeDragStop={OnNodeDragStop}
              onElementClick={OnElementClick}
              nodeTypes={GetBlockNodeTypes}
              edgeTypes={GetBlockEdgeTypes}
              onConnectEnd={OnConnectStop}
              onConnectStart={OnConnectStart}
            ></ReactFlow>
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

export default FlowBlockLocation;
