const FindNodeById = (nodeId: string): HTMLElement => {
  return document.querySelector(`[data-id="${nodeId}"]`) as HTMLElement;
};

export default FindNodeById;
