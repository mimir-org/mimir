import { Elements } from "react-flow-renderer";
import CreateLocationNode from "./locationNode/CreateLocationNode";
import {
  Project,
  EDGE_TYPE,
  RELATION_TYPE,
  EdgeType,
  Node,
  Edge,
  NODE_TYPE,
} from "../../../models/project";
import {
  CreateElementEdge,
  CreateElementBlockNode,
  CreateElementNode,
  GetReactFlowBoundingRectData,
} from ".";

const CreateElementBlockNodes = (
  project: Project,
  nodeId: string,
  splitViewNode: Node,
  splitView: boolean
): Elements => {
  const initialElements: Elements = [];
  const childrenNodes = [];
  const [width] = GetReactFlowBoundingRectData();
  if (!project) return;

  const actualNode = project.nodes.find((node) => node.id === nodeId);
  const elementNode = CreateElementBlockNode(actualNode, width);
  if (elementNode) initialElements.push(elementNode);

  // Edge from function to location in splitview
  if (splitViewNode && splitView) {
    initialElements.push(CreateLocationNode(splitViewNode));
    const edges = project.edges;
    const toNodeId = splitViewNode.id;
    const edge = edges.find((x) => x.toNode === toNodeId) as Edge;

    if (edge) {
      const elementEdge = CreateElementEdge(edge, EDGE_TYPE.BLOCK as EdgeType);
      initialElements.push(elementEdge);
    }
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

  // Draw new edges created in block view
  project.edges.forEach((edge) => {
    if (
      edge.parentType !== NODE_TYPE.PRODUCT &&
      edge.targetType !== NODE_TYPE.PRODUCT
    ) {
      const elementEdge = CreateElementEdge(edge, EDGE_TYPE.BLOCK as EdgeType);
      if (elementEdge) initialElements.push(elementEdge);
    }
  });

  return initialElements;
};

export default CreateElementBlockNodes;
