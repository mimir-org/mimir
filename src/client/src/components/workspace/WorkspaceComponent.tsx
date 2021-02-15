import React, { FC, useState } from 'react';
import { NodeTypeOverview } from '..';
import createEngine, { DefaultNodeModel, DiagramModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { PortType, Workspace } from '../../store/workspace/types';
import { MdNodeFactory, MbPortFactory, MbPortModel, MbNodeModel } from '../../store/models';


const WorkspaceComponent : FC<Workspace> = ({id, name, nodes }: Workspace) => {

  useState(() => {
    console.log('this will run the first time the component renders!');
  });

  const engine = createEngine();
  engine
    .getPortFactories()
		.registerFactory(new MbPortFactory());
	engine.getNodeFactories().registerFactory(new MdNodeFactory());

  const model = new DiagramModel();

  if(nodes) {
    nodes.forEach(node => {
    const n = new DefaultNodeModel({ name: node.name, color: node.nodeType.color});
    n.setPosition(node.x, node.y);
      node.ports.forEach(port => {
        if(port.type === PortType.In) {
          n.addInPort(port.name);
        } else {
          n.addOutPort(port.name);
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
          let nodeType = JSON.parse(e.dataTransfer.getData("node_type"));
          

          const n = new MbNodeModel({name: "Krafla", title: "Dette er en lang"});
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
      <CanvasWidget engine={engine} className='canvas' />
      </div>
      <NodeTypeOverview />
    </React.Fragment>
  );
}

  export default WorkspaceComponent;
