import { Elements } from "react-flow-renderer";
import { BuildFlowSecondaryChildNode } from "..";
import { IsDirectChild, IsOffPage } from "../../../../../helpers";
import { Edge, Node, Project } from "../../../../../models";
import { GetParent, IsPartOf } from "../../../helpers";

/**
 * Component to draw all secondaryNode children nodes in BlockView.
 * @param project
 * @param primaryNode
 * @param secondaryNode
 * @param elements
 */
const DrawFlowSecondaryChildren = (project: Project, primaryNode: Node, secondaryNode: Node, elements: Elements) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    if (!IsChildOfSecondaryNode(edge, secondaryNode)) return;

    const childMimirNode = nodes.find((n) => n.id === edge.toNodeId);
    if (!childMimirNode) return;

    const childFlowNode = BuildFlowSecondaryChildNode(primaryNode, secondaryNode, childMimirNode);
    let isValid = true;

    if (IsOffPage(childMimirNode)) isValid = ValidateOffPage(childMimirNode, elements);
    if (isValid && childFlowNode) elements.push(childFlowNode);
  });
};

function IsChildOfSecondaryNode(edge: Edge, secondaryNode: Node) {
  if (IsOffPage(edge.toNode)) return IsPartOf(edge.toConnector);
  return IsPartOf(edge.toConnector) && IsDirectChild(edge.toNode, secondaryNode) && edge.fromNodeId === secondaryNode?.id;
}

function ValidateOffPage(offPageNode: Node, elements: Elements) {
  const offPageParent = GetParent(offPageNode);
  return elements?.some((elem) => elem?.id === offPageParent?.id);
}

export default DrawFlowSecondaryChildren;
