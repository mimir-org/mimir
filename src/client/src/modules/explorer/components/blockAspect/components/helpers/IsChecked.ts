import { Elements } from "react-flow-renderer";
import { Node } from "../../../../../../models";
import { EDGE_TYPE } from "../../../../../../models/project";

const IsChecked = (elements: Elements, node: Node) => {
  if (!node) return false;

  const edgeTypes = Object.values(EDGE_TYPE);
  let checked = false;

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem?.type?.toString());
    if (!isEdge) {
      if (node.id === elem?.data?.id && !node.isHidden) checked = true;
    }
  });
  return checked;
};

export default IsChecked;
