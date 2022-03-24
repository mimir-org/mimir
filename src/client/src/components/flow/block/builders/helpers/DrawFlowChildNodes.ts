import { Elements } from "react-flow-renderer";
import { BuildFlowChildNode } from "..";
import { IsDirectChild, IsFamily, IsOffPage } from "../../../../../helpers";
import { Edge, Node, Project } from "../../../../../models";
import { GetParent, IsPartOf } from "../../../helpers";

/**
 * Component to draw all children FlowNodes in BlockView.
 * @param project
 * @param parentNode
 * @param elements
 */
const DrawFlowChildNodes = (project: Project, parentNode: Node, elements: Elements) => {
  const nodes = project.nodes;
  const edges = project.edges;

  edges?.forEach((edge) => {
    if (!IsChildOfParentNode(edge, parentNode)) return;

    const targetNode = nodes.find((n) => n.id === edge.toNode.id);
    if (!targetNode) return;

    const childNode = BuildFlowChildNode(targetNode, parentNode);
    let isValid = true;

    if (IsOffPage(targetNode)) isValid = ValidateOffPage(targetNode, parentNode, elements);
    if (isValid && childNode) elements.push(childNode);
  });
};

function IsChildOfParentNode(edge: Edge, selectedNode: Node) {
  if (IsOffPage(edge.toNode) && IsDirectChild(edge.fromNode, selectedNode)) return IsPartOf(edge.toConnector);
  return IsPartOf(edge.toConnector) && IsFamily(selectedNode, edge.toNode) && edge.fromNodeId === selectedNode?.id;
}

function ValidateOffPage(offPageNode: Node, selectedNode: Node, elements: Elements) {
  const offPageParent = GetParent(offPageNode);
  return elements?.some((elem) => elem?.id === offPageParent?.id && IsDirectChild(offPageParent, selectedNode));
}

export default DrawFlowChildNodes;
