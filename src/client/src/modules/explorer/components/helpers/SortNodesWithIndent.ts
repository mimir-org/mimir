import { IsParentOf } from "../../../../helpers/Family";
import { SetIndentLevel } from "../../../../helpers/SetIndentLevel";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { Node } from "../../../../models";

const SortNodesWithIndent = (nodes: Node[]): [Node, number][] => {
  // InitialSortNodes(nodes);
  console.log("initialsort");
  const buckets = GroupNodesByIndentLevel(nodes);
  console.log({ buckets });

  return SortNodesByIndent(buckets);
};

/**
 * Ensures nodes are sorted according to aspect. On a tie, aspect nodes are placed before non-aspect nodes.
 * @param nodes Nodes to sort.
 */
const InitialSortNodes = (nodes: Node[]): void => {
  nodes?.sort((a, b) => (a.aspect === b.aspect ? IsAspectNodeNum(b) - IsAspectNodeNum(a) : b.aspect - a.aspect));
};

/**
 * Groups nodes according to indent level.
 * @param nodes Nodes to group.
 * @returns Map of indent levels and nodes with the corresponding indent level.
 */
const GroupNodesByIndentLevel = (nodes: Node[]): Map<number, Node[]> => {
  const buckets: Map<number, Node[]> = new Map();

  for (const node of nodes) {
    const indent = SetIndentLevel(node, 0);

    if (!buckets.has(indent)) buckets.set(indent, []);
    buckets.get(indent).push(node);
  }

  return buckets;
};

/**
 * Create array of nodes, adhering to node hierarcy: Parent node is placed before children node. Nodes are inserted into array according to indent level, making sure to insert childNode one place deeper than parent.
 * @param buckets Mapping between indent level and array of nodes with corresponding indent level.
 * @returns Array of Node and indent level, to be rendered by explorer module.
 */
const SortNodesByIndent = (buckets: Map<number, Node[]>) => {
  let sortedNodedWithIndent: [Node, number][] = [];

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
  console.log({ sortedNodedWithIndent });
  return sortedNodedWithIndent;
};

/**
 * Scan through sortedNodes, looking for parent node of *node*. Insert node at index of parent + 1.
 * @param node Node to find parent of
 * @param indent Indent level of node
 * @param sortedNodedWithIndent Current (partial) array of nodes with indent.
 * @returns
 */
const AddNodeFromBucket = (node: Node, indent: number, sortedNodedWithIndent: [Node, number][]) => {
  for (let i = 0; i < sortedNodedWithIndent.length; i++) {
    const [otherNode] = sortedNodedWithIndent[i];

    if (IsParentOf(otherNode?.id, node?.id)) {
      sortedNodedWithIndent.splice(i + 1, 0, [node, indent]);
      return;
    }
  }
};

const IsAspectNodeNum = (node: Node) => (IsAspectNode(node) ? 1 : 0);

export { SortNodesWithIndent };
