export const OnExpandElement = (
  _expanded: boolean,
  nodeId: string,
  closedNodes: Set<string>,
  setClosedNodes: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
  _expanded ? closedNodes.delete(nodeId) : closedNodes.add(nodeId);
  setClosedNodes((_) => new Set(closedNodes));
};
