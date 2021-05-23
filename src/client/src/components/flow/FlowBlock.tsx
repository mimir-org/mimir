import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { RootState } from "./../../redux/store/index";
import FullscreenBox from "../../componentLibrary/controls/FullscreenBox";
import { EDGE_TYPE, Project, VIEW_TYPE, EdgeType } from "../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import { get } from "../../redux/store/project/actions";
import {
  GetProjectId,
  HasProject,
  SetProject,
} from "../../redux/store/localStorage";
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

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  SetProject(project);

  if (project) {
    const node = project.nodes.find((node) => node.isSelected);
    nodeId = node ? node.id : "";
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
    return useOnConnect(
      params,
      project,
      setElements,
      dispatch,
      EDGE_TYPE.DEFAULT as EdgeType
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
              zoomOnScroll={true}
              paneMoveable={true}
            >
              <FullscreenBox />
              <Controls />
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
