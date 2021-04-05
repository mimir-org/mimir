import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  ArrowHeadType,
  Elements
} from "react-flow-renderer";

import { addNode, create, removeNode } from '../../redux/store/project/actions';
import { ProjectState } from '../../redux/store/project/types';
import { RootState } from './../../redux/store/index';
import { NodeType, Node, LibNode } from '../../models/project';

import { Aspect, Function, Product, Location } from './nodes';
import{ DefaultEdgeType } from './edges';
import { createId } from './utils';
import { MiniMap } from './';
import { CreateProjectNodes, CreateElementNode } from './utils';

const nodeTypes = {
    Aspect: Aspect,
    Function: Function,  
    Product: Product,  
    Location: Location 
};

const edgeTypes = {
  defaultEdgeType: DefaultEdgeType,
};

const DnDFlow = () => { 
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const projectState = useSelector<RootState>((state) => state.project) as ProjectState;
  const [elements, setElements] = useState<Elements>();
    
  // On connect
  const onConnect = (params) => {
    return setElements((els) => {

        const source = els.find(x => x.id === params.source)?.data as Node;
        const target = els.find(x => x.id === params.target)?.data as Node;
    
        return addEdge({
            ...params,
            type: 'defaultEdgeType',
            arrowHeadType: ArrowHeadType.ArrowClosed,
            label: '',
            data: {
                source: source,
                target: target
            }
            },
            els
        );
    }); 
} 
  
    // On element remove
  const onElementsRemove = (elementsToRemove) => { 
    elementsToRemove.forEach(element => {
        dispatch(removeNode(element.id));        
    });
    
    return setElements((els) => removeElements(elementsToRemove, els));
  }
  
  // On load
  const onLoad = (_reactFlowInstance) =>  {
      setElements(CreateProjectNodes(projectState.project));
      return setReactFlowInstance(_reactFlowInstance);
  }
    
  // On drag over
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // On drop
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const data = JSON.parse(event.dataTransfer.getData("application/reactflow")) as LibNode;
        
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    

    // TODO:: Implement data from type register
    const node = { id: createId(), name: data.name, label: data.label ?? data.name, type: data.type as NodeType, position: position, connectors: data.connectors, icon: data.icon} as Node;
    dispatch(addNode(node));
    setElements((es) => es.concat(CreateElementNode(node)));    
  };

  return (
    <div className="dndflow">
      {projectState.project &&
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
              <MiniMap />
            </ReactFlow>
          </div>         
        </ReactFlowProvider>
      }
      {!projectState.project &&
      <div>
        <input type='button' value='Opprett nytt prosjekt' onClick={() => dispatch(create())}></input>
        </div>
      }
    </div>
  );
};

export default DnDFlow;
