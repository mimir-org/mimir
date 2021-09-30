import red from "../../../../../redux/store";

/**
 * Function to check if a node is a Main node in ConnectView.
 * @param id
 * @returns a boolean value.
 */
const IsMainConnectNode = (id: string): boolean => {
  const mainConnectNodes = red.store.getState().connectView.mainNodes ?? [];
  return mainConnectNodes.find((node) => node.id === id) !== undefined;
};

export default IsMainConnectNode;
