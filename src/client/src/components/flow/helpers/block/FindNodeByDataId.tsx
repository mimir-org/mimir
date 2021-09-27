const FindNodeByDataId = (nodeId: string): HTMLElement => {
  return document.querySelector(`[data-id="${nodeId}"]`) as HTMLElement;
};

export default FindNodeByDataId;
