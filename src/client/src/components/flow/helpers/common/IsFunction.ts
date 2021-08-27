import { Node, LibItem, Aspect } from "../../../../models";

const IsFunction = (node: Node | LibItem) => {
    return node?.aspect === Aspect.Function;
};

export default IsFunction;
