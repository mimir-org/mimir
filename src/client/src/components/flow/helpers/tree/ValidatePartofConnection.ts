import { Node, NodeType, NODE_TYPE } from "../../../../models/project";


export const ValidatePartofConnection = (fromNode: Node, toNode: Node): boolean => {
    if (!fromNode || !toNode)
        return false;

    switch (fromNode.type) {
        case NODE_TYPE.FUNCTION:
        case NODE_TYPE.ASPECT_FUNCTION:
            return toNode.type === NODE_TYPE.ASPECT_FUNCTION || toNode.type === NODE_TYPE.FUNCTION;
        case NODE_TYPE.PRODUCT:
        case NODE_TYPE.ASPECT_PRODUCT:
            return toNode.type === NODE_TYPE.ASPECT_PRODUCT || toNode.type === NODE_TYPE.PRODUCT;
        case NODE_TYPE.LOCATION:
        case NODE_TYPE.ASPECT_LOCATION:
            return toNode.type === NODE_TYPE.ASPECT_LOCATION || toNode.type === NODE_TYPE.LOCATION;
        default:
            return false;
    }

};

export default ValidatePartofConnection;
