import { Node } from "../../../../models";
import red from "../../../../redux/store";

const GetSelectedBlockNode = () => {
  const nodes = red.store.getState().projectState.project?.nodes as Node[];
  return nodes?.find((node) => node.isBlockSelected);
};

export default GetSelectedBlockNode;
