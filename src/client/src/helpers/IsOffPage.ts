import { Aspect, Node } from "../models";

const IsOffPage = (node: Node) => {
  return node?.aspect === Aspect.None;
};
export default IsOffPage;
