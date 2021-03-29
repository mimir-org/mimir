import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../treeview/flow/dragAndDrop/Sidebar';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  ArrowHeadType,
} from "react-flow-renderer";

import { addNode, create } from '../../redux/store/project/actions';
import { ProjectState } from '../../redux/store/project/types';
import RootState from "./../../redux/store/index";

import { AspectNode } from './nodes';
import{ DefaultEdgeType } from './edges';
import { createId } from './utils';

const nodeTypes = {
  aspectNode: AspectNode  
};

const edgeTypes = {
  defaultEdgeType: DefaultEdgeType,
};

const DnDFlow = () => {
  
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const project = useSelector<RootState>((state) => state.project);
  const [elements, setElements] = useState(project);

  useEffect(() => {
    // setElements(project);    
  }, []);

  // On connect
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
  
    // On element remove
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  
  // On load
  const onLoad = (_reactFlowInstance) =>  setReactFlowInstance(_reactFlowInstance);
    
  // On drag over
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // On drop
  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: createId(),
      type,
      position,
      data: { label: `${type}` },
    };

    setElements((es) => es.concat(newNode));
    dispatch(addNode(newNode, "23"));
  };

  return (
    <div className="dndflow">
      {project &&
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
      }
      {!project &&
      <div>
        <input type='button' value='Hello' onClick={() => dispatch(create())}></input>
        </div>
      }
    </div>
  );
};

export default DnDFlow;
