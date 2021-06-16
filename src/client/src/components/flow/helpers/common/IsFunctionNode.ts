import { NODE_TYPE, Node, LibraryNodeItem } from "../../../../models/project";

const IsFunctionNode = (node: Node | LibraryNodeItem): boolean => {
    return (true
        // node?.aspect === NODE_TYPE.FUNCTION ||
        // node?.type === NODE_TYPE.ASPECT_FUNCTION 
        // TODO: Fiks denne
    );
};

export default IsFunctionNode;
