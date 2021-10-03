import red from "../../../redux/store";
import { Node } from "../../../models";

const GetSelectedNode = () => {
  const nodes = red.store.getState().projectState?.project?.nodes as Node[];
  return nodes?.find((node) => node?.isSelected);
};

export default GetSelectedNode;
