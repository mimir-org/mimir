import React, { FC, useState } from 'react';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { PortType, Workspace, Node } from '../../store/workspace/types';
import { MbNodeFactory, MbPortFactory, MbNodeModel, MbLinkFactory, MbLabelFactory } from '../../store/models';


const WorkspaceComponent : FC<Workspace> = ({id, name, nodes }: Workspace) => {

  useState(() => {
    console.log('this will run the first time the component renders!');
  });

  const engine = createEngine();
  engine.getPortFactories().registerFactory(new MbPortFactory());
	engine.getNodeFactories().registerFactory(new MbNodeFactory());
  engine.getLinkFactories().registerFactory(new MbLinkFactory());
  engine.getLabelFactories().registerFactory(new MbLabelFactory());

  const model = new DiagramModel();

  if(nodes) {
    nodes.forEach(node => {

    const n = new MbNodeModel({rdfType: node.name, rdfId: node.id });
    n.setPosition(node.x, node.y);
      node.ports.forEach(port => {
        if(port.type === PortType.In) {
          n.addInPort(port.name, true);
        } else {
          n.addOutPort(port.name, true);
        }
      });

      n.setLocked(false);

      n.registerListener({
        // selectionChanged: () => { console.log(n.getOptions()) },
        positionChanged: () => { console.log(n.getPosition()) }
     });

     

            // these are never triggered
        // zoomUpdated: e => console.log("zoomUpdated", e),
        // gridUpdated: e => console.log("gridUpdated", e),
        // offsetUpdated: e => console.log("offsetUpdated", e),
        // entityRemoved: e => console.log("entityRemoved", e),
        // n.registerListener({
        //   eventDidFire: (event) => {console.log("", event)})
        // });
      


    model.addNode(n);
    model.setLocked(false);




  


  });
}


 

// model.registerListener({
//   // nodesUpdated: (event) => {console.log(event)},
//   // linksUpdated: (event) => {console.log(event)},
//   // entityRemoved: (event) => {console.log(event)}
//   eventDidFire: (event) => {console.log(event)}      
// });
model.registerListener({
  nodesUpdated: () => { console.log("Event nodesUpdated") },
  offsetUpdated: () => { console.log("Event offsetUpdated") }
});

  engine.setModel(model);
  



  // // link them and add a label to the link
// const link = port1.link<DefaultLinkModel>(port2);
// link.addLabel('Hello World!');



  return (
    <React.Fragment>
      {/* <button onClick={() => dispatch(getWorkspace({ id: 1, name: 'jsv', nodes: [] }))}>Hent graf</button> */}
      <br /><br />
      <div id="canvas" className='graph' onDrop={ e => { 
          // let nodeType = JSON.parse(e.dataTransfer.getData("node_type"));
          
          const node: Node = {
             id: '123',
             name: 'Heisann',
             x: 200,
             y: 200,
             ports: [],
             nodeType: null
          };

          

          const n = new MbNodeModel({rdfType: node.name, rdfId: node.id});
          n.addInPort('In', true);
          n.addInPort('In 2', true);
          n.addOutPort('Out', true);

          // let newNode = new FamNode();
          // newNode.id = '';

    //       id: string,
    // name: string,
    // x: number,
    // y: number,
    // ports: Port[],
    // nodeType: Nodetype



          var pos = engine.getRelativeMousePoint(e);
          n.setPosition(pos.x, pos.y);
          model.addNode(n);
          engine.setModel(model);
          
          // var nodes = model.getNodes();
          // console.log(nodes);

          
          
        }}  
        onDragOver={ e => { e.preventDefault(); } }>
      <CanvasWidget engine={engine} className='canvas'  />
      </div>
      {/* <NodeTypeOverview /> */}
    </React.Fragment>
  );
}

  export default WorkspaceComponent;
