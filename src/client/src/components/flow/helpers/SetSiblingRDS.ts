import { Dispatch } from "redux";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { changeNodeValue } from "../../../redux/store/project/actions";
import { IsPartOfRelation } from "./Connectors";
import { MimirNode } from "../../../lib/types/Node";

/**
 * Updates the sibling index of nodes affected by an Edge being connected.
 * @param edge Edge to be connected.
 * @param nodes
 * @param edges
 * @param dispatch Dispatch function for redux store.
 */
export const UpdateSiblingIndexOnEdgeConnect = (edge: Edge, nodes: MimirNode[], edges: Edge[], dispatch: Dispatch) => {
  const parentId = edge.fromNodeId;
  const children = [...GetChildren(parentId, nodes, edges), edge.toNode];

  children.forEach((child, i) => ResetRDS(child, i, dispatch));
};

/**
 * Updates the sibling index of nodes affected by an Edge being deleted.
 * @param edge Edge to be deleted.
 * @param nodes
 * @param edges
 * @param dispatch Dispatch function for redux store.
 */
export const UpdateSiblingIndexOnEdgeDelete = (edge: Edge, nodes: MimirNode[], edges: Edge[], dispatch: Dispatch) => {
  ClearRDS(edge.toNode, dispatch);
  HandleSiblingDeleted(edge.toNodeId, nodes, edges, dispatch);
};

/**
 * Updates the sibling index of nodes affected by a Node being deleted.
 * @param nodeId Node to be deleted.
 * @param nodes
 * @param edges
 * @param dispatch Dispatch function for redux store.
 */
export const UpdateSiblingIndexOnNodeDelete = (nodeId: string, nodes: MimirNode[], edges: Edge[], dispatch: Dispatch) => {
  HandleParentDeleted(nodeId, nodes, edges, dispatch);
  HandleSiblingDeleted(nodeId, nodes, edges, dispatch);
};

/**
 * Sets the sibling index of node being dropped into project.
 * @param node Node being dropped.
 * @param nodes
 * @param edges
 * @param parentId Parent Node of node.
 */
export const SetSiblingIndexOnNodeDrop = (node: Node, nodes: Node[], edges: Edge[], parentId: string) => {
  if (!parentId) return null;

  const siblings = GetChildren(parentId, nodes, edges);
  node.rds += siblings.length;
};

const HandleParentDeleted = (nodeId: string, nodes: MimirNode[], edges: Edge[], dispatch: Dispatch) => {
  const children = GetChildren(nodeId, nodes, edges).filter((n) => n.id !== nodeId);
  if (!children || !children.length) return;

  children.forEach((child) => ClearRDS(child, dispatch));
};

const HandleSiblingDeleted = (nodeId: string, nodes: MimirNode[], edges: Edge[], dispatch: Dispatch) => {
  const parent = nodes.find((node) => node.id === nodeId).findParentEdge(nodeId, edges)?.fromNode;
  if (!parent) return;

  const siblings = GetChildren(parent.id, nodes, edges).filter((n) => n.id !== nodeId);
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

const GetChildren = (nodeId: string, nodes: Node[], edges: Edge[]) =>
  nodes?.filter((otherNode) =>
    edges?.find((edge) => edge.fromNodeId === nodeId && edge.toNodeId === otherNode?.id && IsPartOfRelation(edge.fromConnector))
  );
