import { Node } from "../../../../../models";
import red from "../../../../../redux/store";

const IsMainConnectNode = (id: string): boolean => {
  const mainConnectNodes = red.store.getState().connectView.mainNodes as Node[];
  return mainConnectNodes.find((node) => node.id === id) !== undefined;
};

export default IsMainConnectNode;
