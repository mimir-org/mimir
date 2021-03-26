import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import "./dnd.scss";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  ArrowHeadType,
} from "react-flow-renderer";

import { addNode } from '../../../../redux/store/project/actions';
import AspectNode from '../../../flow/nodes/AspectNode';
import DefaultEdgeType from '../../../flow/edges/DefaultEdgeType';

const nodeTypes = {
  aspectNode: AspectNode  
};

const edgeTypes = {
  defaultEdgeType: DefaultEdgeType,
};

const initialElements = [
  {
    id: "1",
    type: "aspectNode",
    data: { label: "Function" },
    position: { x: 200, y: 5 },
  },
  {
    id: "2",
    type: "aspectNode",
    data: { label: "Product" },
    position: { x: 450, y: 5 },
  },
  {
    id: "3",
    type: "aspectNode",
    data: { label: "Location" },
    position: { x: 700, y: 5 },
  }
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) =>
    setElements((els) => {
      
      return addEdge(
        {
          ...params,
          type: 'defaultEdgeType',
          arrowHeadType: ArrowHeadType.ArrowClosed,
          label: 'label',
          data: {
            text: 'Hei',
            connectorType: ''
          }
        },
        els
      );
    });
  
  
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);
  const onDragOver = (event) => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type}` },
    };

    setElements((es) => es.concat(newNode));
    dispatch(addNode(newNode, "23"));

  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
