import {
  Project,
  EDGE_TYPE,
  RELATION_TYPE,
  EdgeType,
} from "../../../models/project";
import { Elements } from "react-flow-renderer";
import {
  CreateElementEdge,
  CreateElementBlockNode,
  CreateElementNode,
  GetReactFlowBoundingRectData,
} from ".";

const CreateProjectElementBlockNodes = (
  project: Project,
  nodeId: string
): Elements => {
  const initialElements: Elements = [];
  const childrenNodes = [];
  const [width, height] = GetReactFlowBoundingRectData();

  if (!project) return;

  const actualNode = project.nodes.find((node) => node.id === nodeId);
  const elementNode = CreateElementBlockNode(actualNode, width, height);

  if (elementNode) {
    initialElements.push(elementNode);
  }

  project.edges.forEach((edge) => {
    if (edge.fromNode === nodeId) {
      const fromNode = project.nodes.find((x) => x.id === edge.fromNode);

      const currentConnector = fromNode.connectors.find(
        (x) => x.id === edge.fromConnector
      );

      if (
        currentConnector &&
        currentConnector.relationType === RELATION_TYPE.PartOf
      ) {
        const toNode = project.nodes.find((x) => x.id === edge.toNode);
        const elementToNode = CreateElementNode(toNode);
        if (elementNode) {
          initialElements.push(elementToNode);
          childrenNodes.push(toNode);
        }
      }
    }
  });

  project.edges.forEach((edge) => {
    const fromNode = childrenNodes.find((x) => x.id === edge.fromNode);
    const toNode = childrenNodes.find((x) => x.id === edge.toNode);

    if (fromNode && toNode) {
      const fromConnector = fromNode.connectors.find(
        (x) => x.id === edge.fromConnector
      );
      const toConnector = toNode.connectors.find(
        (x) => x.id === edge.toConnector
      );

      if (
        fromConnector &&
        fromConnector.relationType === RELATION_TYPE.Transport &&
        toConnector &&
        toConnector.relationType === RELATION_TYPE.Transport
      ) {
        const elementEdge = CreateElementEdge(
          edge,
          EDGE_TYPE.BLOCK as EdgeType
        );
        if (elementEdge) initialElements.push(elementEdge);
      }
    }
  });

  return initialElements;
};

export default CreateProjectElementBlockNodes;
