export const GetFlowNodeByDataId = (nodeId: string): HTMLElement => {
  return document.querySelector(`[data-id="${nodeId}"]`);
};
