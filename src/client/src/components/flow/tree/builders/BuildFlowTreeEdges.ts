import { Edge as FlowEdge } from "react-flow-renderer";
import { VisualFilterData } from "../../../../models/application/VisualFilter";
import {MimirNode} from "../../../../lib/types/MimirNode";
import {MimirEdge} from "../../../../lib/types/MimirEdge";

const BuildFlowTreeEdges = (
  nodes: MimirNode[],
  edges: MimirEdge[],
  filter: VisualFilterData,
  onEdgeSplitClick: (id: string, x: number, y: number) => void
) => {
  const flowEdges: FlowEdge[] = [];

  edges.forEach((edge) => {
    const edgeType = edge.getTreeEdgeType(edge.fromConnector);
    const treeEdge = edge.buildTreeEdge(edgeType, nodes, filter, onEdgeSplitClick);
    if (treeEdge) flowEdges.push(treeEdge);
  });

  return flowEdges;
};

export default BuildFlowTreeEdges;
