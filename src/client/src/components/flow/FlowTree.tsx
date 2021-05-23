import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../redux/store/project/actions";
import { MiniMap } from "./";
import { ProjectMainMenu } from "../project";
import { RootState } from "./../../redux/store/index";
import { useOnConnect, useOnDrop, useOnElementsRemove } from "./hooks";
import FullscreenBox from "../../componentLibrary/controls/FullscreenBox";
import {
  GetProjectId,
  HasProject,
  SetProject,
} from "../../redux/store/localStorage";
import { OpenProjectMenu } from "../project/openProject/OpenProjectMenu";
import { EdgeType, EDGE_TYPE, Project, VIEW_TYPE } from "../../models/project";
import {
  updatePosition,
  changeActiveNode,
} from "../../redux/store/project/actions";
import {
  CreateProjectElementNodes,
  GetTreeNodeTypes,
  GetTreeEdgeTypes,
} from "./helpers";
import ReactFlow, {
  ReactFlowProvider,
  Elements,
  Controls,
} from "react-flow-renderer";

const FlowTree = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  SetProject(project);

  const OnElementsRemove = (elementsToRemove) => {
    return useOnElementsRemove(elementsToRemove, setElements, dispatch);
  };

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(
        CreateProjectElementNodes(project, EDGE_TYPE.PART as EdgeType)
      );
      return setReactFlowInstance(_reactFlowInstance);
    },
    [project]
  );

  const OnConnect = (params) => {
    return useOnConnect(
      params,
      project,
      setElements,
      dispatch,
      EDGE_TYPE.PART as EdgeType
    );
  };

  const OnDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event, node) => {
    dispatch(updatePosition(node.id, node.position.x, node.position.y));
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

  // Force rerender
  useEffect(() => {
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance]);

  // Handling of project loading
  useEffect(() => {
    if (project === null) {
      const projectId = GetProjectId();
      if (projectId) dispatch(get(projectId));
    }
  }, [dispatch, project]);

  const visible = useSelector<RootState>(
    (state) => state.flow.view === VIEW_TYPE.TREEVIEW
  ) as boolean;

  return (
    <>
      {project && visible && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              onConnect={OnConnect}
              onElementsRemove={OnElementsRemove}
              onLoad={OnLoad}
              onDrop={OnDrop}
              onDragOver={OnDragOver}
              onNodeDragStop={OnNodeDragStop}
              onElementClick={OnElementClick}
              nodeTypes={GetTreeNodeTypes}
              edgeTypes={GetTreeEdgeTypes}
            >
              <Controls />
              <MiniMap />
              <FullscreenBox />
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

export default FlowTree;
