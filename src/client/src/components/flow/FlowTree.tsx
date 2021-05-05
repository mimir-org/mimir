import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "../../redux/store/project/actions";
import { MiniMap } from "./";
import { ProjectOptions } from "../project";
import { ProjectState } from "../../redux/store/project/types";
import { RootState } from "./../../redux/store/index";
import { NodeType, Node, LibNode, Edge, EDGE_TYPE } from "../../models/project";

import {
  GetProject,
  HasProject,
} from "../../redux/store/localStorage/localStorage";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  ArrowHeadType,
  Elements,
} from "react-flow-renderer";

import {
  addNode,
  removeNode,
  createEdge,
  removeEdge,
  updatePosition,
  changeActiveNode,
} from "../../redux/store/project/actions";

import {
  CreateId,
  CreateElementNode,
  CreateProjectElementNodes,
  GetTreeNodeTypes,
  GetTreeEdgeTypes,
} from "./helpers";
import { useOnDrop, useOnElementsRemove } from "./hooks";

const FlowTree = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const onConnect = (params) => {
    const createdId = CreateId();
    const sourceNode = projectState.project.nodes.find(
      (x) => x.id === params.source
    ) as Node;
    const targetNode = projectState.project.nodes.find(
      (x) => x.id === params.target
    ) as Node;
    const existingEdge = projectState.project.edges.find(
      (x) =>
        x.fromConnector === params.sourceHandle &&
        x.toConnector === params.targetHandle &&
        x.fromNode === sourceNode.id &&
        x.toNode === targetNode.id &&
        x.isHidden === targetNode.isHidden
    );

    if (!existingEdge) {
      const edge: Edge = {
        id: createdId,
        fromConnector: params.sourceHandle,
        toConnector: params.targetHandle,
        fromNode: sourceNode.id,
        toNode: targetNode.id,
        isHidden: sourceNode.isHidden,
        parentType: sourceNode.type,
        targetType: targetNode.type,
      };

      dispatch(createEdge(edge));
    }

    return setElements((els) => {
      return addEdge(
        {
          ...params,
          id: createdId,
          type: EDGE_TYPE.DEFAULT,
          arrowHeadType: ArrowHeadType.ArrowClosed,
          label: "",
          data: {
            source: sourceNode,
            target: targetNode,
          },
        },
        els
      );
    });
  };

  const OnElementsRemove = (elementsToRemove) => {
    return useOnElementsRemove(elementsToRemove, setElements, dispatch);
  };

  const onLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(CreateProjectElementNodes(projectState.project));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [projectState.project]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeDragStop = (_event, node) => {
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

  const onElementClick = (event, element) => {
    dispatch(changeActiveNode(element.id));
  };

  // Force rerender
  useEffect(() => {
    onLoad(reactFlowInstance);
  }, [onLoad, reactFlowInstance]);

  // Handling of project loading
  useEffect(() => {
    if (projectState.project === null) {
      const projectId = GetProject();
      if (projectId) dispatch(get(projectId));
    }
  }, [dispatch, projectState.project]);

  return (
    <div className="dndflow">
      {projectState.project && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementsRemove={OnElementsRemove}
              onLoad={onLoad}
              onDrop={OnDrop}
              onDragOver={onDragOver}
              onNodeDragStop={onNodeDragStop}
              onElementClick={onElementClick}
              nodeTypes={GetTreeNodeTypes}
              edgeTypes={GetTreeEdgeTypes}
            >
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      )}
      {!projectState.project && !HasProject() && (
        <div>
          <ProjectOptions />
        </div>
      )}
    </div>
  );
};

export default FlowTree;
