import red from "../../../redux/store";
import { Node } from "../../../models";

const GetSelectedBlockNode = () => {
  const nodes = red.store.getState().projectState?.project?.nodes as Node[];
  return nodes?.find((node) => node?.isBlockSelected);
};

export default GetSelectedBlockNode;
