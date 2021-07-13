import red from "../../../../redux/store";
import { Node } from "../../../../models";

const FindSelectedNode = () => {
  const nodes = red.store.getState().projectState?.project?.nodes as Node[];
  return nodes?.find((node) => node?.isSelected);
};

export default FindSelectedNode;
