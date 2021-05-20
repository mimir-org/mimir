import { Node, NODE_TYPE } from "../../models/project";

const GetRdsId = (node: Node): string => {
    if (!node || !node.rds)
        return "";
    if (node.type === NODE_TYPE.FUNCTION)
        return "=" + node.rds;
    if (node.type === NODE_TYPE.PRODUCT)
        return "-" + node.rds;
    if (node.type === NODE_TYPE.LOCATION)
        return "++" + node.rds;

    return "";
};

export default GetRdsId;
