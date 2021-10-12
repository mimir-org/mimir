import { ShowBlockViewEdge } from "../block/helpers";
import { Edge, Node } from "../../../models";
import { EdgeType } from "../../../models/project";
import { ConvertEdgeToFlow } from "../converters";
import red from "../../../redux/store";

export const CreateBlockEdge = (nodes: Node[], edge: Edge, edgeType: EdgeType) => {
  const nodez = red.store.getState().projectState.project.nodes as Node[];
  const sourceNode = nodez.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodez.find((node) => node.id === edge.toNodeId);

  if (ShowBlockViewEdge(edge)) {
    return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode);
  }
};

export default CreateBlockEdge;
