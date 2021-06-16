import { Node, LibraryNodeItem, Aspect } from "../../../../models/project";

const IsProductNode = (node: Node | LibraryNodeItem): boolean => {
    return (
        node?.aspect === Aspect.Product
    );
};

export default IsProductNode;
