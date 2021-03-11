/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Elements,
  SnapGrid,
  Connection,
  Edge,
  ArrowHeadType,
} from "react-flow-renderer";

import DefaultSelectorNode from "./selectorNodes/defaultSelectors/DefaultSelectorNode";
import ConnectSelectorNode from "./selectorNodes/connectSelectors/ConnectSelectorNode";
import { WorkspaceService } from "./../../services/workspaceService";
import DrawMiniMap from "./DrawMiniMap";

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
          {DrawMiniMap()}
          <Controls />
        </ReactFlow>
      </div>
      <div className="col">Right</div>
    </div>
  );
};

export default DiagramSelectorComponent;
