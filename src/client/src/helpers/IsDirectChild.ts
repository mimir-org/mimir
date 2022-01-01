import { GetParent } from "../components/flow/helpers";
import { Node } from "../models";

const IsDirectChild = (child: Node, parent: Node) => {
  return GetParent(child)?.id === parent?.id;
};

export default IsDirectChild;
