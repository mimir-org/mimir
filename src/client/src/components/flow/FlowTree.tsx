import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../redux/store/project/actions";
import { ProjectMainMenu } from "../project";
import { RootState } from "./../../redux/store/index";
import { useOnConnect, useOnDrop, useOnElementsRemove } from "./hooks";
import FullscreenBox from "../../componentLibrary/controls/FullscreenBox";
import { OpenProjectMenu } from "../project/openProject/OpenProjectMenu";
import { ATTRIBUTE_TAB, Project, VIEW_TYPE } from "../../models/project";
import { GetTreeEdgeType } from "./helpers/tree";
import { changeInspectorTab } from "../../redux/store/inspector/actions";
import ReactFlow, { ReactFlowProvider, Elements } from "react-flow-renderer";
import {
  updatePosition,
  changeActiveNode,
} from "../../redux/store/project/actions";
import {
  GetTreeNodeTypes,
  GetTreeEdgeTypes,
  CreateTreeElements,
} from "./helpers/tree";
import {
  GetProjectId,
  HasProject,
  SetProject,
} from "../../redux/store/localStorage";

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
      setElements(CreateTreeElements(project));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [project]
  );

  const OnConnect = (params) => {
    const fromNode = project.nodes.find((x) => x.id === params.source);
    const fromConnector = fromNode.connectors.find(
      (x) => x.id === params.sourceHandle
    );

    const edgeType = GetTreeEdgeType(fromConnector);
    return useOnConnect(params, project, setElements, dispatch, edgeType);
  };

  const OnDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const OnNodeDragStop = (_event, node) => {
    dispatch(updatePosition(node.id, node.position.x, node.position.y));
  };

  const OnDrop = (_event) => {
    const selectedNode = project?.nodes?.find((x) => x.isSelected);

    return useOnDrop(
      _event,
      dispatch,
      setElements,
      reactFlowInstance,
      reactFlowWrapper,
      false,
      selectedNode
    );
  };

  const OnElementClick = (_event, element) => {
    dispatch(changeActiveNode(element.id, true));
    dispatch(changeInspectorTab(ATTRIBUTE_TAB.TECH_INFO));
  };

  const OnClick = (e) => {
    if (e.target.classList.contains("react-flow__pane")) {
      const selectedNode = project?.nodes?.find((x) => x.isSelected);
      if (selectedNode) {
        dispatch(changeActiveNode(selectedNode.id, false));
      }
    }
  };

  // Force rerender
  useEffect(() => {
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance]);

  useEffect(() => {
    if (!project) {
      const projectId = GetProjectId();
      if (projectId) dispatch(get(projectId));
    }
  }, [dispatch, project]);

  const isTreeView = useSelector<RootState>(
    (state) => state.flow.view === VIEW_TYPE.TREEVIEW
  ) as boolean;

  return (
    <>
      {isTreeView && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}></div>
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
            snapToGrid={true}
            snapGrid={[5, 5]}
            onClick={(e) => OnClick(e)}
          >
            <FullscreenBox />
          </ReactFlow>
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
