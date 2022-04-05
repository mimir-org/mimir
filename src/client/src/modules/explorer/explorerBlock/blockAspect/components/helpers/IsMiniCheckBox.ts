import { IsProduct } from "../../../../../../helpers/Aspects";
import { Node } from "../../../../../../models";

const IsMiniCheckBox = (nodeId: string, secondaryNodeId: string, selectedNode: Node) => {
  return nodeId !== selectedNode?.id && nodeId !== secondaryNodeId && !IsProduct(selectedNode);
};

export default IsMiniCheckBox;
