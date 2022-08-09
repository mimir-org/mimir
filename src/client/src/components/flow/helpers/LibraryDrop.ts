import { CreateId } from "./";
import { IsAspectNode, IsLocation, IsProduct } from "../../../helpers/Aspects";
import { Dispatch } from "redux";
import { SetSiblingIndexOnNodeDrop } from "./SetSiblingRDS";
import { createEdge } from "../../../redux/store/project/actions";
import { Size } from "../../../assets/size/Size";
import { Position } from "../../../models/project";
import { IsOutputConnector, IsInputConnector, IsPartOfRelation, IsLocationRelation, IsProductRelation } from "./Connectors";
import { Node, Edge, ConnectorVisibility, Connector, Project } from "@mimirorg/modelbuilder-types";
import { ConvertEdgeDataToMimirPartOfEdge } from "../converters";

/**
 * Helper function to handle PartOf edges when dropping a Node from the LibraryModule.
 * @param parentNode
 * @param childNode
 * @param project
 * @param dispatch
 */
export function HandleCreatePartOfEdge(parentNode: Node, childNode: Node, project: Project, dispatch: Dispatch) {
  childNode.level = parentNode.level + 1;
  const parentConnector = parentNode.connectors?.find((c) => IsPartOfRelation(c) && IsOutputConnector(c));
  const childConnector = childNode.connectors?.find((c) => IsPartOfRelation(c) && IsInputConnector(c));

  const partofEdge = ConvertEdgeDataToMimirPartOfEdge(
    CreateId(),
    parentConnector,
    childConnector,
    parentNode,
    childNode,
    project.id
  );

  SetSiblingIndexOnNodeDrop(childNode, project.nodes, project.edges, parentNode.id);
  dispatch(createEdge(partofEdge));
}

/**
 * Helper function to initialize the correct visibility status for a Connector.
 * @param connector
 * @param targetNode
 * @returns the ConnectorVisibility status.
 */
export function InitConnectorVisibility(connector: Connector, targetNode: Node) {
  const isLocation = IsLocation(targetNode) && IsLocationRelation(connector);
  const isProduct = IsProduct(targetNode) && IsProductRelation(connector);

  if (!isLocation && !isProduct) return ConnectorVisibility.None;
  if (IsInputConnector(connector)) return ConnectorVisibility.InputVisible;
  if (IsOutputConnector(connector)) return ConnectorVisibility.OutputVisible;
}

/**
 * Function to calculate the TreeView position of a dropped Node.
 * @param parentNode
 * @param nodes
 * @param edges
 * @returns a Position object.
 */
export function SetTreeNodePosition(parentNode: Node, nodes: Node[], edges: Edge[]) {
  const marginY = 220;
  const x = SetTreeNodeXPosition(parentNode, nodes, edges);
  const y = parentNode.positionY + marginY;

  return { x, y } as Position;
}

/**
 * Function to position a node in the TreeView canvas when a node is dropped from the LibraryModule.
 * This function will position the node middle-out relative to existing sibling nodes.
 * Note: This is a simple version of node positioning, and should be extended to a more viable solution.
 * @param parentNode
 * @param nodes
 * @param edges
 * @returns a value for the X position.
 */
export function SetTreeNodeXPosition(parentNode: Node, nodes: Node[], edges: Edge[]) {
  const isAspect = IsAspectNode(parentNode);
  const siblings = FindSiblingNodes(parentNode, nodes, edges);
  const increaseX = siblings.length % 2 === 0;

  const marginX = Size.NODE_WIDTH + 70;
  const aspectMarginX = 35;
  let xPos = parentNode.positionX;

  if (siblings.length === 0) return isAspect ? xPos - aspectMarginX : xPos;
  if (siblings.length === 2) return isAspect ? xPos + marginX - aspectMarginX : xPos + marginX;

  // Find siblings' highest or lowest X position
  siblings.forEach((s) => {
    if ((increaseX && s?.positionX > xPos) || (!increaseX && s?.positionX < xPos)) xPos = s?.positionX;
  });

  return increaseX ? xPos + marginX : xPos - marginX;
}

/**
 * Function to find a dropped Node's sibling nodes.
 * @param parentNode
 * @param nodes
 * @param edges
 * @returns a list of nodes.
 */
export function FindSiblingNodes(parentNode: Node, nodes: Node[], edges: Edge[]) {
  if (!parentNode) return [];
  const siblings: Node[] = [];

  edges?.forEach((edge) => {
    if (edge.fromNodeId !== parentNode.id) return;

    const sibling = nodes?.find((n) => n.id === edge.toNodeId && n.level === parentNode.level + 1);
    if (sibling) siblings.push(sibling);
  });

  return siblings;
}
