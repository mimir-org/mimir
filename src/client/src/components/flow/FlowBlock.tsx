import React, { useState, useRef, useEffect, useCallback } from "react";
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
import {
  NodeType,
  Node,
  LibNode,
  Edge,
  EDGE_TYPE,
  EdgeEvent,
  NODE_TYPE,
} from "../../models/project";

import {
  Aspect,
  Function,
  Product,
  Location,
  FunctionBlock,
  OffPage,
} from "./nodes";
import { DefaultEdgeType, BlockEdgeType } from "./edges";
import { MiniMap } from "./";
import { CreateElementNode, CreateProjectBlockViewNodes } from "./utils";
import { ProjectOptions } from "../project";
import {
  loadEventDataFromStorage,
  saveEventDataToStorage,
} from "../../redux/store/localStorage/localStorage";
import {
  CreateOffPageNode,
  CreateOffPageData,
  GetReactFlowBoundingRectData,
  CreateId,
} from "./helpers";

interface FlowBlockProps {
  nodeId: string;
}

const nodeTypes = {
  AspectFunction: Aspect,
  AspectLocation: Aspect,
  AspectProduct: Aspect,
  Function: Function,
  Product: Product,
  Location: Location,
  Functionblock: FunctionBlock,
  Offpage: OffPage,
};

const edgeTypes = {
  DefaultEdgeType: DefaultEdgeType,
  BlockEdgeType: BlockEdgeType,
};

const FlowBlock: React.FC<FlowBlockProps> = ({ nodeId }: FlowBlockProps) => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const onConnectStop = (e) => {
    e.preventDefault();
    const edgeEvent = loadEventDataFromStorage("edgeEvent") as EdgeEvent;

    if (edgeEvent) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance.project({
        x: e.clientX - reactFlowBounds.left,
        y: e.clientY - reactFlowBounds.top,
      });

      const createOffPageData = {
        parentNodeId: nodeId,
        fromNodeId: edgeEvent.nodeId,
        fromConnectorId: edgeEvent.sourceId,
        x: position.x,
        y: position.y,
      } as CreateOffPageData;

      const node = CreateOffPageNode(projectState, createOffPageData);

      dispatch(addNode(node.node));
      dispatch(createEdge(node.partOfEdge));
      dispatch(createEdge(node.transportEdge));

      saveEventDataToStorage(null, "edgeEvent");
    }
  };

  const onConnectStart = (e, { nodeId, handleType, handleId }) => {
    e.preventDefault();

    const eventdata = {
      nodeId: nodeId,
      handleType: handleType,
      sourceId: handleId,
    } as EdgeEvent;

    saveEventDataToStorage(eventdata, "edgeEvent");
  };

  const onConnect = (params) => {
    saveEventDataToStorage(null, "edgeEvent");

    const createdId = CreateId();
    const sourceNode = projectState.project.nodes.find(
      (x) => x.id === params.source
    ) as Node;
    const targetNode = projectState.project.nodes.find(
      (x) => x.id === params.target
    ) as Node;

    let currentEdge = null;

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
      currentEdge = edge;
      dispatch(createEdge(edge));
    } else {
      currentEdge = existingEdge;
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
            edge: currentEdge,
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
      const [width, height] = GetReactFlowBoundingRectData();

      setElements(
        CreateProjectBlockViewNodes(projectState.project, nodeId, width, height)
      );
      return setReactFlowInstance(_reactFlowInstance);
    },
    [nodeId, projectState.project]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeDragStop = (_event, node) => {
    const [width] = GetReactFlowBoundingRectData();
    const x = node.type === NODE_TYPE.OFF_PAGE ? width - 120 : node.position.x;
    dispatch(updatePosition(node.id, x, node.position.y));
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

  window.onresize = () => {
    onLoad(reactFlowInstance);
  };

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
              onConnectEnd={onConnectStop}
              onConnectStart={onConnectStart}
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

export default FlowBlock;
