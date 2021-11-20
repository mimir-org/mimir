import { Node, Aspect } from "../models";

const IsOffPage = (node: Node) => {
  return node?.aspect === Aspect.None;
};
export default IsOffPage;
