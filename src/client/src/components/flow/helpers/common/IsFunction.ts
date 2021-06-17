import { Node, LibraryNodeItem, Aspect } from "../../../../models";

const IsFunction = (node: Node | LibraryNodeItem) => {
  return (
    node?.aspect === Aspect.Function || node?.aspect.toString() === "Function"
  );
};

export default IsFunction;
