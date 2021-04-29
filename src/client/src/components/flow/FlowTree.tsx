import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { ProjectState } from "../../redux/store/project/types";
import { RootState } from "./../../redux/store/index";
import { NodeType, Node, LibNode, Edge, EDGE_TYPE } from "../../models/project";

import { Aspect, Function, Product, Location } from "./nodes";
import { DefaultEdgeType } from "./edges";
import {
  CreateId,
  CreateElementNode,
  CreateProjectElementNodes,
} from "./helpers";
import { MiniMap } from "./";
import { ProjectOptions } from "../project";

const nodeTypes = {
  AspectFunction: Aspect,
  AspectLocation: Aspect,
  AspectProduct: Aspect,
  Function: Function,
  Product: Product,
  Location: Location,
};

const edgeTypes = {
  DefaultEdgeType: DefaultEdgeType,
};

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

  const onElementsRemove = (elementsToRemove) => {
    elementsToRemove.forEach((element) => {
      if (element.type === EDGE_TYPE.DEFAULT) {
        dispatch(removeEdge(element.id));
      } else {
        dispatch(removeNode(element.id));
      }
    });

    return setElements((els) => removeElements(elementsToRemove, els));
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

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    ) as LibNode;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const node = {
      id: CreateId(),
      name: data.name,
      label: data.label ?? data.name,
      type: data.type as NodeType,
      positionX: position.x,
      positionY: position.y,
      connectors: data.connectors,
      attributes: data.attributes,
      icon: data.icon,
    } as Node;

    node.connectors?.forEach((c) => {
      c.id = CreateId();
      c.nodeId = node.id;
    });

    node.attributes?.forEach((a) => {
      a.nodeId = node.id;
    });

    dispatch(addNode(node));
    setElements((es) => es.concat(CreateElementNode(node)));
  };

  const onElementClick = (event, element) => {
    dispatch(changeActiveNode(element.id));
  };

  // Force rerender
  useEffect(() => {
    onLoad(reactFlowInstance);
  }, [onLoad, reactFlowInstance]);

  return (
    <div className="dndflow">
      {projectState.project && (
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeDragStop={onNodeDragStop}
              onElementClick={onElementClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
            >
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      )}
      {!projectState.project && (
        <div>
          <ProjectOptions />
        </div>
      )}
    </div>
  );
};

export default FlowTree;
