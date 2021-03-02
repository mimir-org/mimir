/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState, MouseEvent, ChangeEvent  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Node,
  FlowElement,
  OnLoadParams,
  Elements,
  Position,
  SnapGrid,
  Connection,
  Edge,
  ArrowHeadType,
} from 'react-flow-renderer';

import DefaultSelectorNode from './DefaultSelectorNode';
import ConnectSelectorNode from './ConnectSelectorNode';
import { Workspace, } from '../../models/workspace';
import { RootState } from "../../store/index";
import { WorkspaceState } from "../../store/workspace/types";

import { WorkspaceService } from './../../services/workspaceService';

let clickTimeout = null;

// const onLoad = (reactFlowInstance: OnLoadParams) => console.log('flow loaded:', reactFlowInstance);
// const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node);
const onElementClick = (e: MouseEvent, element: FlowElement) => {
  if (clickTimeout !== null) {
    console.log('DOUBLE: ', element)
    clearTimeout(clickTimeout)
    clickTimeout = null
  } else {
    console.log('SINGLE: ', element)  
    clickTimeout = setTimeout(()=>{    
    clearTimeout(clickTimeout)
      clickTimeout = null
    }, 2000)
  }
};

// const initBgColor = '#1A192B';
const connectionLineStyle = { stroke: '#888' };
const snapGrid: SnapGrid = [16, 16];
const nodeTypes = {
  selectorNode: DefaultSelectorNode,
  connectorNode: ConnectSelectorNode
};



const DiagramComponent: FC<Workspace> = ({ root, aspects, aspectDescriptors }: Workspace) => {

  const currentState = (useSelector<RootState>((state) => state.workspace)) as WorkspaceState;
  const [elements, setElements] = useState<Elements>([]);
  const service = new WorkspaceService({ root, aspects, aspectDescriptors });

  

  
  
  
  
  // const [bgColor, setBgColor] = useState<string>(initBgColor);

  useEffect(() => {
    setElements((els) =>
        els.map((e) => {
          return e;
        })
      ); 
      
  const initialElements: Elements = [];
  const inputConnectorsElemement: Elements = [];

  
  const rootEdges = service.getRootEdges("root");
      rootEdges.forEach(edge => {

        // Find connectors
        const connectorEdges = service.getConnectorEdges(edge.from);

        const connectors = connectorEdges.map(connector => {
          var node = service.functionalNodeMap.get(connector.from);
          return {
            id: connector.id,
            type: node.type.toLowerCase().includes('input') ? 'target' : 'source',
            label: node.type
          };          
        });

        // Create the node with connectors
        initialElements.push({
          id: edge.from,
          type: 'selectorNode',
          data: { label: service.getProductLabel(edge.from), id: edge.from, connectors: connectors },
          position: { x: 300, y: 50 },
        });

        // Create connections
        const connections = service.getConnectionEdges(edge.from);
        // console.log(connections);

        connections.forEach(con => {

          initialElements.push(
            {
              id: con.id,
              source: con.from,
              target: con.to,
              sourceHandle: con.connector,
              animated: true,
              style: { stroke: '#888' },
              label: con.type,
              arrowHeadType: ArrowHeadType.ArrowClosed
            }
          );
        });



        

        // initialElements.push({
        //   id: 'e1-2', 
        //   type: 'step', 
        //   source: '1', 
        //   target: '2', 
        //   animated: true, 
        //   label: 'Gas', 
        //   arrowHeadType: ArrowHeadType.ArrowClosed
        // });

        
  });

    setElements(initialElements);
  }, []);

  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) => setElements((els) => {
    const node = service.functionalNodeMap.get(service.functionalEdgeMap.get(params.sourceHandle).from);
    return addEdge({ ...params, animated: true, arrowHeadType: ArrowHeadType.ArrowClosed, label: node.type, style: { stroke: '#888' } }, els);
  });

  return (
    <div className='wrapper'>
      <div className='col'>
        Left
      </div>
      <div className='col'>
        <ReactFlow
          elements={elements}
          onElementClick={onElementClick}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          // onNodeDragStop={onNodeDragStop}
          // style={{ background: initBgColor }}
          // onLoad={onLoad}
          nodeTypes={nodeTypes}
          connectionLineStyle={connectionLineStyle}
          snapToGrid={true}
          snapGrid={snapGrid}
          defaultZoom={1.5}      
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
          <Controls />
        </ReactFlow>
      </div>
      <div className='col'>Right</div>
    </div>
  );
};
  


  


export default DiagramComponent;
