import { Node } from "../../../../models";
import red from "../../../../redux/store";

const FindSelectedNode = () => {
  const nodes = red.store.getState().projectState.project?.nodes as Node[];
  const selectedNode = nodes?.find((node) => node?.isSelected);

  return selectedNode;
};

export default FindSelectedNode;
