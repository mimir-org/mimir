import { Edge, Node, ConnectorDirection, RelationType, NodeType } from "@mimirorg/modelbuilder-types";
import { Dispatch } from "redux";
import { removeSelectedNode, setSelectedNode } from "../redux/store/project/actions";
import { getParentNodeIdRecursive } from "./node/getParentNodeId";
import { isDirectChildRecursive } from "./node/isDirectChild";
import { IsRelation, IsTerminal } from "./typeService";
import { resolveTerminalHandleFromNodes, resolveTerminalHandleToNodes } from "./node/resolveHandleNodes";

export const nodeService = {
  /**
   * Change selected node. This is the parent node in block view and the selected node in treeview.
   * @param nodeId The new selected node
   * @param dispatch Redux dispatcher
   */
  setSelectedkNode(nodeId: string, dispatch: Dispatch) {
    dispatch(removeSelectedNode());
    dispatch(setSelectedNode(nodeId));
  },

  /**
   * Check if a node is child of a parent
   * @param child The child node
   * @param parentId The parent node id
   * @param edges All project edges
   */
  isDirectChild(child: Node, parentId: string, edges: Edge[]): boolean {
    if (child == null || parentId == null || edges == null) return false;
    const inputConnector = child.connectors.find(
      (c) => c.type === ConnectorDirection.Input && IsRelation(c) && c.relationType === RelationType.PartOf
    );
    if (inputConnector == null) return false;
    const edge = edges?.find((e) => e.toConnectorId === inputConnector.id);
    return isDirectChildRecursive(edge, parentId, edges);
  },

  /**
   * Get parent node id from node based on partof relation
   * @param child The child node
   * @param edges All project edges
   */
  getParentNodeId(child: Node, edges: Edge[]): string {
    if (child == null || edges == null) return "";
    const inputConnector = child.connectors.find(
      (c) => c.type === ConnectorDirection.Input && IsRelation(c) && c.relationType === RelationType.PartOf
    );
    if (inputConnector == null) return "";
    const edge = edges?.find((e) => e.toConnectorId === inputConnector.id);
    return getParentNodeIdRecursive(edge, edges);
  },

  /**
   * Get child nodes from parent exclusive handler nodes
   * @param parentId The parent node
   * @param nodes All project nodes
   * @param edges All project edges
   */
  getChildrenNodes(parentId: string, nodes: Node[], edges: Edge[]): Node[] {
    return nodes.filter((n) => n.nodeType !== NodeType.Handler && nodeService.isDirectChild(n, parentId, edges));
  },

  getTransportHandlerNodes(nodes: Node[], edges: Edge[]): Node[] {
    const handlerNodes = [] as Node[];
    const outputTransportEdges = edges.filter((e) => nodes.some((n) => n.id === e.fromNodeId) && IsTerminal(e.fromConnector));
    const inputTransportEdges = edges.filter((e) => nodes.some((n) => n.id === e.toNodeId) && IsTerminal(e.toConnector));

    outputTransportEdges.forEach((e) => {
      const outputs = [] as Node[];
      resolveTerminalHandleFromNodes(e, edges, outputs);
      handlerNodes.push(...outputs);
    });

    inputTransportEdges.forEach((e) => {
      const inputs = [] as Node[];
      resolveTerminalHandleToNodes(e, edges, inputs);
      handlerNodes.push(...inputs);
    });
    const unique = [...new Map(handlerNodes.map((item) => [item.id, item])).values()];
    return unique;
  },
};
