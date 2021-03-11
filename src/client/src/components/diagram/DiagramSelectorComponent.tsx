/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Node,
  Elements,
  SnapGrid,
  Connection,
  Edge,
  ArrowHeadType,
} from "react-flow-renderer";

import DefaultSelectorNode from "./DefaultSelectorNode";
import ConnectSelectorNode from "./ConnectSelectorNode";
import { WorkspaceService } from "./../../services/workspaceService";

interface Props {
  workspaceService: WorkspaceService;
  edgeId: string;
  nodeId: string;
}

const connectionLineStyle = { stroke: "#888" };
const snapGrid: SnapGrid = [16, 16];
const nodeTypes = {
  selectorNode: DefaultSelectorNode,
  connectorNode: ConnectSelectorNode,
};

const DiagramSelectorComponent: FC<Props> = ({
  workspaceService,
  edgeId,
  nodeId,
}) => {
  const [elements, setElements] = useState<Elements>([]);

  useEffect(() => {
    setElements((els) =>
      els.map((e) => {
        return e;
      })
    );

    const initialElements: Elements = [];
    setElements(initialElements);
  }, []);

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) =>
    setElements((els) => {
      const node = workspaceService.functionalNodeMap.get(
        workspaceService.functionalEdgeMap.get(params.sourceHandle).from
      );
      return addEdge(
        {
          ...params,
          animated: true,
          arrowHeadType: ArrowHeadType.ArrowClosed,
          label: node.type,
          style: { stroke: "#888" },
        },
        els
      );
    });

  return (
    <div className="wrapper">
      <div className="col">Left</div>
      <div className="col">
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineStyle={connectionLineStyle}
          snapToGrid={true}
          snapGrid={snapGrid}
          defaultZoom={1.5}
        >
          <MiniMap
            nodeStrokeColor={(n: Node): string => {
              if (n.type === "input") return "#0041d0";
              if (n.type === "selectorNode") return "#ccc";
              if (n.type === "output") return "#ff0072";

              return "#eee";
            }}
            nodeColor={(n: Node): string => {
              if (n.type === "selectorNode") return "#ccc";

              return "#fff";
            }}
          />
          <Controls />
        </ReactFlow>
      </div>
      <div className="col">Right</div>
    </div>
  );
};

export default DiagramSelectorComponent;
