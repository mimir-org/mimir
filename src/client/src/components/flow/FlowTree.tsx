import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../redux/store/project/actions";
import { MiniMap } from "./";
import { ProjectMainMenu } from "../project";
import { ProjectState } from "../../redux/store/project/types";
import { RootState } from "./../../redux/store/index";
import { useOnConnect, useOnDrop, useOnElementsRemove } from "./hooks";
import FullscreenBox from "../../componentLibrary/controls/FullscreenBox";
import {
  GetProject,
  HasProject,
} from "../../redux/store/localStorage/localStorage";
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
import { OpenProjectMenu } from "../project/openProject/OpenProjectMenu";

const FlowTree = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const OnElementsRemove = (elementsToRemove) => {
    return useOnElementsRemove(elementsToRemove, setElements, dispatch);
  };

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(CreateProjectElementNodes(projectState.project));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [projectState.project]
  );

  const OnConnect = (params) => {
    return useOnConnect(params, projectState, setElements, dispatch);
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
    if (projectState.project === null) {
      const projectId = GetProject();
      if (projectId) dispatch(get(projectId));
    }
  }, [dispatch, projectState.project]);

  const visible = useSelector<RootState>(
    (state) => state.flow.view[0].visible
  ) as boolean;

  return (
    <>
      {projectState.project && visible && (
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
      {!projectState.project && !HasProject() && (
        <div>
          <ProjectMainMenu />
          <OpenProjectMenu />
        </div>
      )}
    </>
  );
};

export default FlowTree;
