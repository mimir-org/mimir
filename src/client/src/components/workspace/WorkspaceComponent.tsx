import React, { FC, useState } from "react";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { Workspace, Node, Edge } from "../../models/workspace";
import {
  MbNodeFactory,
  MbPortFactory,
  MbNodeModel,
  MbLinkFactory,
  MbLabelFactory,
  // MbLinkModel,
  // MbPortModel
} from "../../store/models";
import { ToolboxComponent } from "..";

const WorkspaceComponent: FC<Workspace> = ({ root, aspects }: Workspace) => {
  useState(() => {
    console.log("this will run the first time the component renders!");
  });

  const engine = createEngine();
  engine.getPortFactories().registerFactory(new MbPortFactory());
  engine.getNodeFactories().registerFactory(new MbNodeFactory());
  engine.getLinkFactories().registerFactory(new MbLinkFactory());
  engine.getLabelFactories().registerFactory(new MbLabelFactory());

  const model = new DiagramModel();
  const mainAspect = aspects.filter(x => x.aspect === "1" && x.category === "1")[0];
  

  // if(mainAspect) {
  //   var nodeMap = new Map(mainAspect.graph.nodes.map(obj => [obj.id, obj] as [string, Node]));
  //   var edgeMap = new Map(mainAspect.graph.edges.map(obj => [obj.id, obj] as [string, Edge]));

  //   var rootNodes = mainAspect.graph.edges.filter(x => x.to === 'root' && x.type === 'imfo:partOf');

  //   console.log(nodeMap);
  //   console.log(edgeMap);
  //   console.log(rootNodes);
  // }


  // const map = Object.assign({}, ...workspace2.nodes.map(s => ({[s.id]: s.value})));

  // var nodeMap = new Map(workspace2.nodes.map(obj => [obj.id, obj] as [string, Node2]));
  // var links = workspace2.edges.filter(x => x.type === "consumedBy");

  // var map = new Map(workspace2.nodes.map(i => [i.id, {i}]));

  // interface LinkMap {
  //   from: MbPortModel,
  //   to: MbPortModel
  //   label: string
  // };



//  let linkMap: LinkMap[] = [];  

//   workspace2.nodes.forEach(node => {
//     var connections = workspace2.edges.filter(x => x.to === node.id && x.type === "hasParent");
//     if(connections.length > 0) {
//       var m = new MbNodeModel({ rdfType: node.label, rdfId: node.id });

//       if(node && node.label && node.label.toLowerCase().includes('reservoir')) {
//         m.getOptions().svg = true;
//       }

//       connections.forEach(c => {
//         var mapNode = nodeMap.get(c.from);
//         if(mapNode && mapNode.label && mapNode.label.toLowerCase().includes('out')) {
//           m.addOutPort(mapNode.label);
          

//         } else {
//           m.addInPort(mapNode.label);
//         }        
//       });
//       m.setLocked(false);
//       m.registerListener({
//         // selectionChanged: () => { console.log(n.getOptions()) },
//         positionChanged: () => {
//           // console.log(m.getPosition());
//         },
//       });      
//       model.addNode(m);
//     }    
//   });

  

  // links.forEach(x => {
  //   // model.getNode
  // })

        // link them and add a label to the link
        // const link = port1.link<MbLinkModel>(port2);
        // link.addLabel('Hello World!');


  
      model.setLocked(false);


  // const xxx = workspace2.nodes.map(node => {
  //   let m = new MbNodeModel({ rdfType: node.label, rdfId: node.id });
  //   let connections = workspace2.edges.filter(edge => edge.type === "hasParent" && edge.to === node.id).map(e => {
      
  //   });
    

  //   return m;
  // });





  // if (nodes) {
  //   nodes.forEach((node) => {
  //     const n = new MbNodeModel({ rdfType: node.name, rdfId: node.id });
  //     n.setPosition(node.x, node.y);
  //     node.ports.forEach((port) => {
  //       if (port.type === PortType.In) {
  //         n.addInPort(port.name, true);
  //       } else {
  //         n.addOutPort(port.name, true);
  //       }

  //       // // link them and add a label to the link
  //       // const link = n.link<DefaultLinkModel>(port2);
  //       // link.addLabel('Hello World!');

  //     });

  //     n.setLocked(false);

  //     n.registerListener({
  //       // selectionChanged: () => { console.log(n.getOptions()) },
  //       positionChanged: () => {
  //         console.log(n.getPosition());
  //       },
  //     });

  //     // these are never triggered
  //     // zoomUpdated: e => console.log("zoomUpdated", e),
  //     // gridUpdated: e => console.log("gridUpdated", e),
  //     // offsetUpdated: e => console.log("offsetUpdated", e),
  //     // entityRemoved: e => console.log("entityRemoved", e),
  //     // n.registerListener({
  //     //   eventDidFire: (event) => {console.log("", event)})
  //     // });

  //     model.addNode(n);
  //     model.setLocked(false);
  //   });
  // }

  // model.registerListener({
  //   // nodesUpdated: (event) => {console.log(event)},
  //   // linksUpdated: (event) => {console.log(event)},
  //   // entityRemoved: (event) => {console.log(event)}
  //   eventDidFire: (event) => {console.log(event)}
  // });
  model.registerListener({
    nodesUpdated: () => {
      console.log("Event nodesUpdated");
    },
    offsetUpdated: () => {
      console.log("Event offsetUpdated");
    },
  });

  engine.setModel(model);

  // // link them and add a label to the link
  // const link = port1.link<DefaultLinkModel>(port2);
  // link.addLabel('Hello World!');

  return (
    <React.Fragment>
      <div className="workspace">
        <div className="workspace__left-area">
          <ToolboxComponent />
        </div>

        <div className="workspace__right-area">
          <h1>{root.title}</h1>
          <div
            id="canvas"
            className="graph"
            onDrop={(e) => {
              // let nodeType = JSON.parse(e.dataTransfer.getData("node_type"));

              // const node: Node = {
              //   id: "123",
              //   // name: "Reservoir",
              //   // x: 200,
              //   // y: 200,
              //   // ports: [],
              //   // nodeType: null,
              // };

              const n = new MbNodeModel({
                rdfType: '',
                rdfId: '',
                svg: true,
              });
              
              n.addOutPort("Well fluid", true);
              n.addOutPort("Gas", true);

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
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            <CanvasWidget engine={engine} className="canvas" />
          </div>
        </div>
      </div>

      {/* <button onClick={() => dispatch(getWorkspace({ id: 1, name: 'jsv', nodes: [] }))}>Hent graf</button> */}

      {/* <NodeTypeOverview /> */}
    </React.Fragment>
  );
};

export default WorkspaceComponent;
