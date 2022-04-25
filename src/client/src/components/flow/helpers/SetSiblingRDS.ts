import { Dispatch } from "redux";
import { Edge, Node, Project } from "../../../models";
import { FindParentEdge } from "../../../helpers/ParentNode";
import { changeNodeValue } from "../../../redux/store/project/actions";
import { IsPartOfTerminal } from "./Connectors";

/**
 * Updates the sibling index of nodes affected by an Edge being connected.
 * @param edge Edge to be connected.
 * @param project Project edge is part of.
 * @param dispatch Dispatch function for redux store.
 */
export const UpdateSiblingIndexOnEdgeConnect = (edge: Edge, project: Project, dispatch: Dispatch) => {
  const parentId = edge.fromNodeId;
  const children = [...GetChildren(parentId, project), edge.toNode];

  children.forEach((child, i) => ResetRDS(child, i, dispatch));
};

/**
 * Updates the sibling index of nodes affected by an Edge being deleted.
 * @param edge Edge to be deleted.
 * @param project Project edge is part of.
 * @param dispatch Dispatch function for redux store.
 */
export const UpdateSiblingIndexOnEdgeDelete = (edge: Edge, project: Project, dispatch: Dispatch) => {
  ClearRDS(edge.toNode, dispatch);
  HandleSiblingDeleted(edge.toNodeId, project, dispatch);
};

/**
 * Updates the sibling index of nodes affected by a Node being deleted.
 * @param nodeId Node to be deleted.
 * @param project Project node is part of.
 * @param dispatch Dispatch function for redux store.
 */
export const UpdateSiblingIndexOnNodeDelete = (nodeId: string, project: Project, dispatch: Dispatch) => {
  HandleParentDeleted(nodeId, project, dispatch);
  HandleSiblingDeleted(nodeId, project, dispatch);
};

/**
 * Sets the sibling index of node being dropped into project.
 * @param node Node being dropped.
 * @param project Project node is part of.
 * @param parentId Parent Node of node.
 */
export const SetSiblingIndexOnNodeDrop = (node: Node, project: Project, parentId: string) => {
  if (!parentId) return null;

  const siblings = GetChildren(parentId, project);
  node.rds += siblings.length;
};

const HandleParentDeleted = (nodeId: string, project: Project, dispatch: Dispatch) => {
  const children = GetChildren(nodeId, project).filter((n) => n.id !== nodeId);
  if (!children || !children.length) return;

  children.forEach((child) => ClearRDS(child, dispatch));
};

const HandleSiblingDeleted = (nodeId: string, project: Project, dispatch: Dispatch) => {
  const parent = FindParentEdge(nodeId, project?.edges)?.fromNode;
  if (!parent) return;

  const siblings = GetChildren(parent.id, project).filter((n) => n.id !== nodeId);
  if (!siblings || !siblings.length) return;

  siblings.forEach((sibling, i) => ResetRDS(sibling, i, dispatch));
};

/**
 * Method to strip sibling index from RDS string, using string.replace regex expression to remove trailing digits.
 * @param rds RDS string to strip sibling index.
 * @returns Updated RDS string, without sibling index.
 */
const StripSiblingIndex = (rds: string): string => rds?.replace(/\d+$/, "");

const ClearRDS = (node: Node, dispatch: Dispatch) => {
  const newRDS = StripSiblingIndex(node.rds);
  dispatch(changeNodeValue(node.id, "rds", newRDS));
};

const ResetRDS = (node: Node, index: number, dispatch: Dispatch) => {
  const newRDS = StripSiblingIndex(node.rds) + index;
  dispatch(changeNodeValue(node.id, "rds", newRDS));
};

const GetChildren = (nodeId: string, project: Project) =>
  project?.nodes?.filter((otherNode) =>
    project?.edges?.find(
      (edge) => edge.fromNodeId === nodeId && edge.toNodeId === otherNode?.id && IsPartOfTerminal(edge.fromConnector)
    )
  );
