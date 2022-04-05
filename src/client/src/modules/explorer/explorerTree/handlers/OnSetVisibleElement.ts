export const OnSetVisibleElement = (
  _visible: boolean,
  nodeId: string,
  invisibleNodes: Set<string>,
  setInvisibleNodes: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
  _visible ? invisibleNodes.delete(nodeId) : invisibleNodes.add(nodeId);
  setInvisibleNodes((_) => new Set(invisibleNodes));
};
