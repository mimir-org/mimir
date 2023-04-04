import { Dispatch } from "redux";
// import { SetSiblingIndexOnNodeDrop } from "./SetSiblingRDS";
// import { createEdge } from "../../../redux/store/project/actions";
import { Size } from "../../../assets/size/Size";
import { Position } from "../../../models/project";
// import { IsOutputConnector, IsInputConnector, IsPartOfRelation } from "./Connectors";
import { AspectObject, ConnectionPartOf, ConnectorDirection, Project } from "lib";
import { ConnectorPartOf } from "../../../lib/classes/Connector";

/**
 * Helper function to handle PartOf edges when dropping a Node from the LibraryModule.
 * @param parentNode
 * @param childNode
 * @param project
 * @param dispatch
 */
export function HandleCreatePartOfEdge(parentNode: AspectObject, childNode: AspectObject, project: Project, dispatch: Dispatch) {
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
export function SetTreeNodePosition(parentNode: AspectObject, project: Project) {
  const marginY = 220;
  const x = SetTreeNodeXPosition(parentNode, project);
  const y = parentNode.threePosY + marginY;

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
export function SetTreeNodeXPosition(parentNode: AspectObject, project: Project) {
  const isAspect = parentNode.libraryType == null;
  const siblings = project.getSiblingAspectNodes(parentNode.id);
  const increaseX = siblings.length % 2 === 0;

  const marginX = Size.NODE_WIDTH + 70;
  const aspectMarginX = 35;
  let xPos = parentNode.threePosX;

  if (siblings.length === 0) return isAspect ? xPos - aspectMarginX : xPos;
  if (siblings.length === 2) return isAspect ? xPos + marginX - aspectMarginX : xPos + marginX;

  // Find siblings' highest or lowest X position
  siblings.forEach((s) => {
    if ((increaseX && s?.threePosX > xPos) || (!increaseX && s?.threePosX < xPos)) xPos = s?.threePosX;
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
