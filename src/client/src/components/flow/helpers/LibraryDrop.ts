import CreateId from "./CreateId";
import { Connector, ConnectorVisibility, Node, Project } from "../../../models";
import { IsAspectNode, IsLocation, IsProduct } from "../../../helpers";
import { IsProductTerminal, IsLocationTerminal, IsOutputTerminal, IsInputTerminal } from ".";
import { LibraryState } from "../../../redux/store/library/types";
import { Dispatch } from "redux";
import { IsPartOf } from "./IsPartOf";
import { ConvertToEdge } from "../converters";
import { SetSiblingIndexOnNodeDrop } from "./SetSiblingRDS";
import { createEdge } from "../../../redux/store/project/actions";
import { Size } from "../../../compLibrary/size/Size";
import { Position } from "../../../models/project";

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
  const sourceConn = sourceNode.connectors?.find((x) => IsPartOf(x) && IsOutputTerminal(x));
  const targetConn = targetNode.connectors?.find((x) => IsPartOf(x) && IsInputTerminal(x));
  const partofEdge = ConvertToEdge(CreateId(), sourceConn, targetConn, sourceNode, targetNode, project.id, library);

  SetSiblingIndexOnNodeDrop(targetNode, project, sourceNode.id);
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
 * @param project
 * @returns a Position object.
 */
export function SetTreeNodePosition(parentNode: Node, project: Project) {
  const marginY = 220;
  const x = SetTreeNodeXPosition(parentNode, project);
  return { x, y: parentNode.positionY + marginY } as Position;
}

/**
 * Function to position a node in the TreeView canvas when a node is dropped from the LibraryModule.
 * This function will position the node middle-out relative to existing sibling nodes.
 * @param parentNode
 * @param project
 * @returns a value for the X position.
 */
export function SetTreeNodeXPosition(parentNode: Node, project: Project) {
  const isAspect = IsAspectNode(parentNode);
  const siblings = FindSiblingNodes(parentNode, project);
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
 * @param project
 * @returns a list of nodes.
 */
export function FindSiblingNodes(parentNode: Node, project: Project) {
  if (!parentNode) return [];
  const siblings: Node[] = [];

  project.edges?.forEach((edge) => {
    if (edge.fromNodeId === parentNode.id) {
      const sibling = project.nodes?.find((n) => n.id === edge.toNodeId && n.level === parentNode.level + 1);
      siblings.push(sibling);
    }
  });

  return siblings;
}
