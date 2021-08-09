import red from "../../redux/store";
import ReactFlow, { ReactFlowProvider, Elements } from "react-flow-renderer";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectMainMenu } from "../project";
import { RootState } from "../../redux/store/index";
import { useOnConnect, useOnDrop, useOnRemove } from "./hooks";
import { FullScreenBox } from "../../compLibrary/controls";
import { OpenProjectMenu } from "../project/openProject/";
import { BlobData } from "../../models";
import { ProjectState } from "../../redux/store/project/types";
import { IsBlockView } from "./helpers/block";
import { changeInspectorTab } from "../../redux/store/inspector/actions";
import { FindSelectedNode, SetDarkModeColor } from "./helpers/common";
import { CreateTreeElements } from "./creators";
import { getBlobData } from "../../redux/store/typeEditor/actions";
import { GetNodeTypes, GetEdgeTypes, GetEdgeType } from "./helpers/tree";
import { LibraryState } from "../../redux/store/library/types";
import {
  updatePosition,
  changeActiveNode,
  changeActiveEdge,
} from "../../redux/store/project/actions";

const FlowTree = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();
  const darkMode = red.store.getState().darkMode.active;

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const project = projectState?.project;

  const icons = useSelector<RootState>(
    (state) => state.typeEditor.icons
  ) as BlobData[];

  const library = useSelector<RootState>(
    (state) => state.library
  ) as LibraryState;

  const OnElementsRemove = (elementsToRemove) => {
    return useOnRemove(elementsToRemove, setElements, dispatch);
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
    const edgeType = GetEdgeType(fromConnector);
    return useOnConnect(
      params,
      project,
      setElements,
      dispatch,
      edgeType,
      library
    );
  };

  const OnDragOver = (event) => {
    event.preventDefault();
  };

  const OnNodeDragStop = (_event, node) => {
    dispatch(updatePosition(node.id, node.position.x, node.position.y));
  };

  const OnDrop = (event) => {
    return useOnDrop(
      project,
      event,
      dispatch,
      setElements,
      reactFlowInstance,
      reactFlowWrapper,
      icons,
      library
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

  // Get symbols from TypeEditor
  useEffect(() => {
    dispatch(getBlobData());
  }, [dispatch]);

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
            nodeTypes={GetNodeTypes}
            edgeTypes={GetEdgeTypes}
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
          <ProjectMainMenu project={project} />
          <OpenProjectMenu projectState={projectState} />
        </div>
      )}
    </>
  );
};

export default FlowTree;
