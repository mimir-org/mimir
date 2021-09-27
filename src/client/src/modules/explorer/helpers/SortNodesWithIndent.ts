import { SetIndentLevel } from "../../../assets/helpers";
import { IsParentOf } from "../../../components/flow/helpers/common";
import { Node } from "../../../models";

const SortNodesWithIndent = (nodes: Node[]): [Node, number][] => {
  // Group nodes according to indent level

  const buckets: Map<number, Node[]> = new Map();

  for (let node of nodes) {
    let indent = SetIndentLevel(node, 0);

    if (!buckets.has(indent)) {
      buckets.set(indent, []);
    }
    buckets.get(indent).push(node);
  }

  // Sort nodes. Insert nodes from buckets by indent level,
  // making sure to insert childNode one place deeper than parent.
  // Start with root nodes (level === 0)

  let sortedNodedWithIndent: [Node, number][] = [];

  for (let indent of Array.from(buckets.keys())) {
    let bucket = buckets.get(indent);

    if (indent === 0) {
      sortedNodedWithIndent = bucket.map((node) => [node, indent]);
      continue;
    }

    for (let node of bucket) {
      AddNodeFromBucket(node, indent, sortedNodedWithIndent);
    }
  }

  return sortedNodedWithIndent;
};

// Scan through sortedNodes, looking for parent node of *node*. Insert node at index of parent + 1.
const AddNodeFromBucket = (
  node: Node,
  indent: number,
  sortedNodedWithIndent: [Node, number][]
) => {
  for (let i = 0; i < sortedNodedWithIndent.length; i++) {
    let [otherNode] = sortedNodedWithIndent[i];

    if (IsParentOf(otherNode, node)) {
      sortedNodedWithIndent.splice(i + 1, 0, [node, indent]);
      return;
    }
  }
};

export { SortNodesWithIndent };
