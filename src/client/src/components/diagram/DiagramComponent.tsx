/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, MouseEvent  } from 'react';

import ReactFlow, {  
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Node,
  FlowElement,  
  Elements,  
  SnapGrid,
  Connection,
  Edge,
  ArrowHeadType,
} from 'react-flow-renderer';

import DefaultSelectorNode from './DefaultSelectorNode';
import ConnectSelectorNode from './ConnectSelectorNode';
import { Workspace, } from '../../models/workspace';
import { WorkspaceService } from './../../services/workspaceService';

let clickTimeout = null;

// const onLoad = (reactFlowInstance: OnLoadParams) => console.log('flow loaded:', reactFlowInstance);
// const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);

const onElementClick = (e: MouseEvent, element: FlowElement) => {
  if (clickTimeout !== null) {
    clearTimeout(clickTimeout)
    clickTimeout = null
  } else {
    clickTimeout = setTimeout(()=>{    
    clearTimeout(clickTimeout)
      clickTimeout = null
    }, 2000)
  }
};

const connectionLineStyle = { stroke: '#888' };
const snapGrid: SnapGrid = [16, 16];
const nodeTypes = {
  selectorNode: DefaultSelectorNode,
  connectorNode: ConnectSelectorNode
};

const DiagramComponent: FC<Workspace> = ({ root, aspects, aspectDescriptors }: Workspace) => {

  const defaultZoomFactor = 1.5;
  const [elements, setElements] = useState<Elements>([]);
  const service = new WorkspaceService({ root, aspects, aspectDescriptors });
  

  useEffect(() => {
    setElements((els) =>
        els.map((e) => {
          return e;
        })
      );
    
    const initialElements: Elements = [];
    const diagram = service.getDiagram("root");

    diagram.nodes.forEach(x => {

      // Map connectors
          const connectors = x.connectors.map(connector => {
          return {
            id: connector.id,
            type: connector.type,
            label: connector.label
          };          
        });

      // Create the node with connectors
        initialElements.push({
          id: x.id,
          type: 'selectorNode',
          data: { label: x.label, id: x.id, connectors: connectors },
          position: { x: 300, y: 50 },
        });
    });

    // Create connections
    diagram.connections.forEach(con => {

      initialElements.push(
        {
          id: con.id,
          source: con.source,
          sourceHandle: con.sourceHandle,
          target: con.target,
          targetHandle: con.targetHandle,
          animated: true,
          style: { stroke: '#888' },
          label: con.label,
          arrowHeadType: ArrowHeadType.ArrowClosed
        }
      );

  });
    setElements(initialElements);
  }, []);

  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) => setElements((els) => { 
    const node = service.functionalNodeMap.get(service.functionalEdgeMap.get(params.sourceHandle)?.from);
    return addEdge({ ...params, animated: true, arrowHeadType: ArrowHeadType.ArrowClosed, label: node.label, style: { stroke: '#888' } }, els);
  });

  return (
    <>      
        <ReactFlow
          elements={elements}
          onElementClick={onElementClick}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineStyle={connectionLineStyle}
          snapToGrid={true}
          snapGrid={snapGrid}
          defaultZoom={defaultZoomFactor}             
        >
          <MiniMap
            nodeStrokeColor={(n: Node): string => {
              if (n.type === 'input') return '#0041d0';
              if (n.type === 'selectorNode') return '#ccc';
              if (n.type === 'output') return '#ff0072';

              return '#eee';
            }}
            nodeColor={(n: Node): string => {
              if (n.type === 'selectorNode') return '#ccc';

              return '#fff';
            }}
          />
          <hr className='divider divider--left' />
          <hr className='divider divider--right' />
          <Controls />
        </ReactFlow>
    </>
  );
};
  


  


export default DiagramComponent;
