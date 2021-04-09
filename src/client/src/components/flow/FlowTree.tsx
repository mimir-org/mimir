import { useState, useRef, useEffect } from "react";
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
  create,
  removeNode,
  createEdge,
  removeEdge,
  get,
  updatePosition,
} from "../../redux/store/project/actions";
import { ProjectState } from "../../redux/store/project/types";
import { RootState } from "./../../redux/store/index";
import { NodeType, Node, LibNode, Edge, EDGE_TYPE } from "../../models/project";

import { Aspect, FunctionFacet, ProductFacet, LocationFacet } from "./nodes";
import { DefaultEdgeType } from "./edges";
import { createId } from "./utils";
import { MiniMap } from "./";
import {
  CreateProjectNodes,
  CreateElementNode,
  UpdateProjectNodes,
} from "./utils";

const nodeTypes = {
  Aspect: Aspect,
  Function: FunctionFacet,
  Product: ProductFacet,
  Location: LocationFacet,
};

const edgeTypes = {
  DefaultEdgeType: DefaultEdgeType,
};

const FlowTree = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;
  const [elements, setElements] = useState<Elements>();

  //On connect
  const onConnect = (params) => {
    const createdId = createId();
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

  // On element remove
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

  // On load
  const onLoad = (_reactFlowInstance) => {
    setElements(CreateProjectNodes(projectState.project));
    return setReactFlowInstance(_reactFlowInstance);
  };

  // On drag over
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeDragStop = (_event, node) => {
    dispatch(updatePosition(node.id, node.position.x, node.position.y));
  };

  // On drop
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
      id: createId(),
      name: data.name,
      label: data.label ?? data.name,
      type: data.type as NodeType,
      position: position,
      connectors: data.connectors,
      icon: data.icon,
    } as Node;
    dispatch(addNode(node));
    setElements((es) => es.concat(CreateElementNode(node)));
  };

  const nodes: any = useSelector<RootState>(
    (state) => state.projectState.project?.nodes
  );

  useEffect(() => {
    setElements(UpdateProjectNodes(projectState.project));
  }, [projectState, nodes]);

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
          <input
            type="button"
            value="Opprett nytt prosjekt"
            onClick={() => dispatch(create())}
          ></input>
          <input
            type="button"
            value="Hent prosjekt"
            onClick={() =>
              dispatch(get("95C10DAB-0DAD-4CBB-B33E-CA0A3CBC500C"))
            }
          ></input>
        </div>
      )}
    </div>
  );
};

export default FlowTree;
