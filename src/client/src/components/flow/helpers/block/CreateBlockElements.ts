import { Elements } from "react-flow-renderer";
import { CreateBlockEdge, CreateBlockNode, CreateParentBlockNode } from ".";
import { CreateElementNode, GetFlowRectData } from "../";
import {
  Project,
  EDGE_TYPE,
  RELATION_TYPE,
  EdgeType,
  Node,
} from "../../../../models/project";

const CreateBlockElements = (
  project: Project,
  nodeId: string,
  splitViewNode: Node,
  splitView: boolean
): Elements => {
  const initialElements: Elements = [];
  const childrenNodes = [];
  const [width] = GetFlowRectData();
  if (!project) return;

  const actualNode = project.nodes.find((node) => node.id === nodeId);
  const elementNode = CreateParentBlockNode(actualNode, width);
  if (elementNode) initialElements.push(elementNode);

  if (splitViewNode && splitView) {
    initialElements.push(CreateBlockNode(splitViewNode));
  }

  // Draw nodes
  project.edges.forEach((edge) => {
    if (edge.fromNode === nodeId) {
      const fromNode = project.nodes.find((x) => x.id === edge.fromNode);
      const currentConnector = fromNode.connectors.find(
        (x) => x.id === edge.fromConnector
      );

      if (currentConnector?.relationType === RELATION_TYPE.PartOf) {
        const toNode = project.nodes.find((x) => x.id === edge.toNode);
        const elementToNode = CreateElementNode(toNode, true);
        if (elementNode) {
          initialElements.push(elementToNode);
          childrenNodes.push(toNode);
        }
      }
    }
  });

  // Draw edges
  project.edges.forEach((edge) => {
    const elementEdge = CreateBlockEdge(edge, EDGE_TYPE.BLOCK as EdgeType);
    if (elementEdge) initialElements.push(elementEdge);
  });

  return initialElements;
};

export default CreateBlockElements;
