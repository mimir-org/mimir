import { Node } from "../../../../models";
import red from "../../../../redux/store";

const FindSelectedBlockNode = () => {
  const nodes = red.store.getState().projectState.project?.nodes as Node[];
  const selectedBlockNode = nodes?.find((node) => node.isBlockSelected);

  return selectedBlockNode;
};

export default FindSelectedBlockNode;
