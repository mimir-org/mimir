import { Node, VIEW_TYPE } from "../../../models/project";
import { IsLocationNode } from "../../../components/flow/helpers";

const ValidateView = (target: any, selectedNode: Node): boolean => {
  return (
    target === VIEW_TYPE.BLOCKVIEW &&
    (!selectedNode || IsLocationNode(selectedNode))
  );
};

export default ValidateView;
