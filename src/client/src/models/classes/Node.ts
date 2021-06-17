import { EnumBase, Attribute, Aspect } from "..";
import Connector from "./Connector";
import { FlowElement } from "react-flow-renderer";
class Node {
    id: string;
    rds: string;
    contractor: string;
    semanticReference: string;
    tagNumber: string;
    description: string;
    name: string;
    label: string;
    positionX: number;
    positionY: number;
    isLocked: boolean | false;
    isSelected: boolean | false;
    isBlockSelected: boolean | false;
    isHidden: boolean | false;
    positionBlockX: number;
    positionBlockY: number;
    level: number;
    order: number;
    statusId: string;
    status: EnumBase;
    updatedBy: string;
    updated: Date;
    version: string;
    attributes: Attribute[];
    connectors: Connector[];
    area: number;
    aspect: Aspect;
    isRoot: boolean | false;

    // Only for location aspect
    length: number;
    width: number;
    height: number;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() { }

    GetNodeType(): string {
        let typeName = this.isRoot ? "Aspect" : "";
        typeName += Aspect[this.aspect];
        return typeName;
    }

    CreateTreeNode(): FlowElement {
        const position = { x: this.positionX, y: this.positionY };
        const treeNode = {
            id: this.id,
            aspect: this.aspect,
            data: this,
            position: position,
            isHidden: this.isHidden,
            isSelected: this.isSelected,
            draggable: true,
            selectable: true,
            connectable: true,
            type: this.GetNodeType()
        } as FlowElement;

        return treeNode;
    }
}

export default Node;
