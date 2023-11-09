import { Dispatch } from "redux";
// import { SetSiblingIndexOnNodeDrop } from "./SetSiblingRDS";
// import { createEdge } from "../../../redux/store/project/actions";
import { Size } from "../../../assets/size/Size";
// import { IsOutputConnector, IsInputConnector, IsPartOfRelation } from "./Connectors";
import { Block, ConnectionPartOf, ConnectorDirection, Position, Project } from "lib";
import { ConnectorPartOf } from "../../../lib/classes/Connector";

/**
 * Helper function to handle PartOf edges when dropping a Node from the LibraryModule.
 * @param parentNode
 * @param childNode
 * @param project
 * @param dispatch
 */
export function HandleCreatePartOfEdge(parentNode: Block, childNode: Block, project: Project, dispatch: Dispatch) {
  const parentConnector = parentNode.connectors?.find(
    (c) => c instanceof ConnectorPartOf && c.direction === ConnectorDirection.Output
  );
  const childConnector = childNode.connectors?.find(
    (c) => c instanceof ConnectorPartOf && c.direction === ConnectorDirection.Input
  );

  const partofEdge = new ConnectionPartOf(null, parentConnector.id, childConnector.id, project.id);

  // TODO: Resolve this
  // SetSiblingIndexOnNodeDrop(childNode, project.nodes, project.edges, parentNode.id);
  // dispatch(createEdge(partofEdge));
}

/**
 * Function to calculate the TreeView position of a dropped Node.
 * @param parentNode
 * @param nodes
 * @param edges
 * @returns a Position object.
 */
export function SetTreeNodePosition(parentNode: Block, project: Project) {
  const marginY = 220;
  const x = SetTreeNodeXPosition(parentNode, project);
  const y = parentNode.positionTree.posX + marginY;

  return new Position(x, y);
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
export function SetTreeNodeXPosition(parentNode: Block, project: Project) {
  const isAspect = parentNode.libraryType == null;
  const siblings = project.getSiblingAspectNodes(parentNode.id);
  const increaseX = siblings.length % 2 === 0;

  const marginX = Size.NODE_WIDTH + 70;
  const aspectMarginX = 35;
  let xPos = parentNode.positionTree.posX;

  if (siblings.length === 0) return isAspect ? xPos - aspectMarginX : xPos;
  if (siblings.length === 2) return isAspect ? xPos + marginX - aspectMarginX : xPos + marginX;

  // Find siblings' highest or lowest X position
  siblings.forEach((s) => {
    if ((increaseX && s?.positionTree.posX > xPos) || (!increaseX && s?.positionTree.posX < xPos)) xPos = s?.positionTree.posX;
  });

  return increaseX ? xPos + marginX : xPos - marginX;
}

// /**
//  * Function to find a dropped Node's sibling nodes.
//  * @param parentNode
//  * @param nodes
//  * @param edges
//  * @returns a list of nodes.
//  */
// export function FindSiblingNodes(parentNode: AspectObject, nodes: AspectObject[], edges: Connection[]) {
//   if (!parentNode) return [];
//   const siblings: AspectObject[] = [];

//   edges?.forEach((edge) => {
//     if (edge.fromNodeId !== parentNode.id) return;

//     const sibling = nodes?.find((n) => n.id === edge.toNodeId && n.level === parentNode.level + 1);
//     if (sibling) siblings.push(sibling);
//   });

//   return siblings;
// }
