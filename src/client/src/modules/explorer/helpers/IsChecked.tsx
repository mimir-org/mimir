import { Node, EDGE_KIND } from "../../../models";
import { EDGE_TYPE } from "../../../models/project";

const IsChecked = (elements: any[], node: Node) => {
  const edgeTypes = Object.values(EDGE_TYPE);
  let checked = false;

  elements?.forEach((elem) => {
    const isEdge = edgeTypes.some((x) => x === elem.type?.toString() || elem.kind === EDGE_KIND);
    if (!isEdge) if (node.id === elem.data.id) checked = true;
  });
  return checked;
};

export default IsChecked;
