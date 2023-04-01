import red from "../../../../redux/store";
import { IsFamily, IsParentOf } from "../../../../helpers/Family";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { AspectObject } from "lib";

const SortNodesWithIndent = (nodes: AspectObject[]) => {
  InitialSortNodes(nodes);
  const buckets = GroupNodesByIndentLevel(nodes);
  return SortNodesByIndent(buckets);
};

/**
 * Ensures nodes are sorted according to aspect. On a tie, aspect nodes are placed before non-aspect nodes.
 * @param nodes Nodes to sort.
 */
export const InitialSortNodes = (nodes: AspectObject[]) => {
  return nodes?.sort((a, b) => (IsFamily(a, b) ? IsAspectNodeNum(b) - IsAspectNodeNum(a) : b.aspect - a.aspect));
};

/**
 * Groups nodes according to indent level.
 * @param nodes Nodes to group.
 * @returns Map of indent levels and nodes with the corresponding indent level.
 */
const GroupNodesByIndentLevel = (nodes: AspectObject[]): Map<number, AspectObject[]> => {
  const buckets: Map<number, AspectObject[]> = new Map();

  for (const node of nodes) {
    const indent = SetIndentLevel(node, 0);

    if (!buckets.has(indent)) buckets.set(indent, []);
    buckets.get(indent).push(node);
  }

  return buckets;
};

/**
 * Create array of nodes, adhering to node hierarcy: Parent node is placed before children node.
 * Nodes are inserted into array according to indent level, making sure to insert childNode one place deeper than parent.
 * @param buckets Mapping between indent level and array of nodes with corresponding indent level.
 * @returns Array of Node and indent level, to be rendered by explorer module.
 */
const SortNodesByIndent = (buckets: Map<number, AspectObject[]>) => {
  let sortedNodedWithIndent: [AspectObject, number][] = [];

  for (const indent of Array.from(buckets.keys())) {
    const bucket = buckets.get(indent);

    if (indent === 0) {
      sortedNodedWithIndent = bucket.map((node) => [node, indent]);
      continue;
    }

    for (const node of bucket) {
      AddNodeFromBucket(node, indent, sortedNodedWithIndent);
    }
  }

  return sortedNodedWithIndent;
};

/**
 * Scan through sortedNodes, looking for parent node of *node*. Insert node at index of parent + 1.
 * @param node Node to find parent of
 * @param indent Indent level of node
 * @param sortedNodedWithIndent Current (partial) array of nodes with indent.
 */
const AddNodeFromBucket = (node: AspectObject, indent: number, sortedNodedWithIndent: [AspectObject, number][]) => {
  // for (let i = 0; i < sortedNodedWithIndent.length; i++) {
  //   const [otherNode] = sortedNodedWithIndent[i];
  //   if (IsParentOf(otherNode?.id, node?.id)) {
  //     sortedNodedWithIndent.splice(i + 1, 0, [node, indent]);
  //     return;
  //   }
  // }
};

const IsAspectNodeNum = (node: AspectObject) => (IsAspectNode(node) ? 1 : 0);

/**
 * Recursive function to give each node the correct level based on it's family tree.
 * @param node
 * @param count
 * @returns a number that defines the indent in the Explorer Module.
 */
const SetIndentLevel = (node: AspectObject, count: number): number => {
  // TODO: Fix this
  return 1;

  // const edges = red.store.getState().projectState.project.connections;
  // const nodes = red.store.getState().projectState.project.aspectObjects as Node[];

  // const edge = edges.find((e) => e.toNode.id === node.id && IsPartOfRelation(e.toConnector));
  // if (!edge) return count;

  // count++;

  // const nextNode = nodes?.find((n) => n.id === edge.fromNode?.id);
  // if (!nextNode) return count;

  // return SetIndentLevel(nextNode, count);
};

export { SortNodesWithIndent };
