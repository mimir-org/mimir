import {
  Project,
  EDGE_TYPE,
  RELATION_TYPE,
  EdgeType,
  NODE_TYPE,
  Node,
  Edge,
} from "../../../models/project";
import { Elements } from "react-flow-renderer";
import {
  CreateElementEdge,
  CreateElementBlockNode,
  CreateElementNode,
  GetReactFlowBoundingRectData,
} from ".";
import CreateLocationNodes from "./locationNode/CreateLocationNodes";
import CreateLocationNode from "./locationNode/CreateLocationNode";
import store from "../../../redux/store";

const CreateProjectElementBlockNodes = (
  project: Project,
  nodeId: string,
  splitViewNode: Node
): Elements => {
  const initialElements: Elements = [];
  const childrenNodes = [];
  const [width] = GetReactFlowBoundingRectData();
  if (!project) return;

  const actualNode = project.nodes.find((node) => node.id === nodeId);
  const elementNode = CreateElementBlockNode(actualNode, width);
  if (splitViewNode) {
    initialElements.push(CreateLocationNode(splitViewNode));
    const edges = store.getState().projectState.project.edges;
    const edge = edges.find(
      (x) => x.id === "747e4985-6b21-f847-dc26-ef868de93075"
    ) as Edge;
    const elementEdge = CreateElementEdge(edge, EDGE_TYPE.BLOCK as EdgeType);
    initialElements.push(elementEdge);
  }

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
        const elementToNode = CreateElementNode(toNode, true);
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

      //   if (
      //     fromConnector &&
      //     fromConnector.relationType === RELATION_TYPE.Transport &&
      //     toConnector &&
      //     toConnector.relationType === RELATION_TYPE.Transport
      //   ) {
      //     const elementEdge = CreateElementEdge(
      //       edge,
      //       EDGE_TYPE.BLOCK as EdgeType
      //     );
      //     if (elementEdge) initialElements.push(elementEdge);
      //   }
      const elementEdge = CreateElementEdge(edge, EDGE_TYPE.BLOCK as EdgeType);
      if (elementEdge) initialElements.push(elementEdge);
    }
  });

  return initialElements;
};

export default CreateProjectElementBlockNodes;
