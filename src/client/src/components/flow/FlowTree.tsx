import red from "../../redux/store";
import ReactFlow, { ReactFlowProvider, Elements } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { RootState } from "../../redux/store/index";
import { useOnConnect, useOnDrop, useOnElementsRemove } from "./hooks";
import { FullScreenBox } from "../../compLibrary/controls";
import { OpenProjectMenu } from "../project/openProject/OpenProjectMenu";
import { BlobData, Project } from "../../models";
import { GetTreeEdgeType } from "./helpers/tree";
import { IsBlockView } from "./helpers/block";
import { changeInspectorTab } from "../../redux/store/inspector/actions";
import { FindSelectedNode, SetDarkModeColor } from "./helpers/common";
import {
  updatePosition,
  changeActiveNode,
  changeActiveEdge,
} from "../../redux/store/project/actions";
import {
  GetTreeNodeTypes,
  GetTreeEdgeTypes,
  CreateTreeElements,
} from "./helpers/tree";

const FlowTree = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = red.store.getState().darkMode.active as boolean;

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const icons = useSelector<RootState>(
    (state) => state.typeEditor.icons
  ) as BlobData[];

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
    const selectedNode = FindSelectedNode();

    return useOnDrop(
      _event,
      dispatch,
      setElements,
      reactFlowInstance,
      reactFlowWrapper,
      project.id,
      icons,
      false,
      selectedNode
    );
  };

  const OnElementClick = (_event, element) => {
    dispatch(changeActiveEdge(null, false));
    dispatch(changeActiveNode(element.id, true));
    dispatch(changeInspectorTab(0));
  };

  const OnClick = (e) => {
    if (!project) return;

    // Handle select Edge
    if (e.target.classList.contains("react-flow__edge-path")) {
      const edge = project.edges.find((x) => x.id === e.target.id);
      dispatch(changeActiveEdge(edge.id, true));
      dispatch(changeActiveNode(null, false));
      dispatch(changeInspectorTab(0));
      return;
    }

    if (e.target.classList.contains("react-flow__pane")) {
      const selectedNode = FindSelectedNode();
      if (selectedNode) {
        dispatch(changeActiveEdge(null, false));
        dispatch(changeActiveNode(selectedNode.id, false));
        dispatch(changeInspectorTab(0));
        return;
      }
    }
    dispatch(changeActiveEdge(null, false));
  };

  // Rerender
  useEffect(() => {
    SetDarkModeColor(darkMode);
    OnLoad(reactFlowInstance);
  }, [OnLoad, reactFlowInstance, darkMode]);

  return (
    <>
      {!IsBlockView() && (
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
            <FullScreenBox />
          </ReactFlow>
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

export default FlowTree;
