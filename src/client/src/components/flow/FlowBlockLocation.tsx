import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { RootState } from "../../redux/store/index";
import { Color } from "../../componentLibrary";
import ReactFlow, {
  ReactFlowProvider,
  Elements,
  Background,
} from "react-flow-renderer";
import { changeActiveNode, get } from "../../redux/store/project/actions";
import { BackgroundVariant, NODE_TYPE, Project } from "../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import {
  GetProjectId,
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

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  if (project) {
    const node = project.nodes.find((node) => node.isSelected);
    if (node.type === NODE_TYPE.LOCATION) {
      nodeId = node ? node.id : "";
    } else {
      nodeId = "";
    }
  }

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(CreateProjectElementBlockNodes(project, nodeId));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [nodeId, project]
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

  const OnElementClick = (event, element) => {
    dispatch(changeActiveNode(element.id));
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

  return (
    <>
      {project && (
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
              defaultZoom={1}
              snapToGrid={true}
            ></ReactFlow>
            <Background
              size={0.5}
              color={Color.Grey}
              variant={BackgroundVariant.Lines}
            />
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

export default FlowBlockLocation;
