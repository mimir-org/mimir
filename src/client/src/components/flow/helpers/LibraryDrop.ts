import { CreateId } from "./";
import { Connector, ConnectorVisibility, Node, Edge, Project } from "../../../models";
import { IsAspectNode, IsLocation, IsProduct } from "../../../helpers/Aspects";
import { LibraryState } from "../../../redux/store/library/types";
import { Dispatch } from "redux";
import { ConvertDataToEdge } from "../converters";
import { SetSiblingIndexOnNodeDrop } from "./SetSiblingRDS";
import { createEdge } from "../../../redux/store/project/actions";
import { Size } from "../../../assets/size/Size";
import { Position } from "../../../models/project";
import { IsProductTerminal, IsLocationTerminal, IsOutputTerminal, IsInputTerminal, IsPartOfTerminal } from "./Connectors";

/**
 * Helper function to handle PartOfEdges when dropping a Node from the LibraryModule.
 * @param sourceNode
 * @param targetNode
 * @param project
 * @param library
 * @param dispatch
 */
export function HandleCreatePartOfEdge(
  sourceNode: Node,
  targetNode: Node,
  project: Project,
  library: LibraryState,
  dispatch: Dispatch
) {
  targetNode.level = sourceNode.level + 1;
  const sourceConn = sourceNode.connectors?.find((c) => IsPartOfTerminal(c) && IsOutputTerminal(c));
  const targetConn = targetNode.connectors?.find((c) => IsPartOfTerminal(c) && IsInputTerminal(c));
  const partofEdge = ConvertDataToEdge(CreateId(), sourceConn, targetConn, sourceNode, targetNode, project.id, library);

  SetSiblingIndexOnNodeDrop(targetNode, project.nodes, project.edges, sourceNode.id);
  dispatch(createEdge(partofEdge));
}

/**
 * Helper function to initialize the correct visibility status for a Connector.
 * @param connector
 * @param targetNode
 * @returns the ConnectorVisibility status.
 */
export function InitConnectorVisibility(connector: Connector, targetNode: Node) {
  const isLocation = IsLocation(targetNode) && IsLocationTerminal(connector);
  const isProduct = IsProduct(targetNode) && IsProductTerminal(connector);

  if (!isLocation && !isProduct) return ConnectorVisibility.None;
  if (IsInputTerminal(connector)) return ConnectorVisibility.InputVisible;
  if (IsOutputTerminal(connector)) return ConnectorVisibility.OutputVisible;
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
