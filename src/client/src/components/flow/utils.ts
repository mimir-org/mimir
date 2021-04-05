import { Project, Node } from '../../models/project';
import { Elements, FlowElement } from "react-flow-renderer";
export interface GetCenterParams {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
  }
  
export const getCenter = ({
    sourceX,
    sourceY,
    targetX,
    targetY,
  }: GetCenterParams): [number, number, number, number] => {
    const xOffset = Math.abs(targetX - sourceX) / 2;
    const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
  
    const yOffset = Math.abs(targetY - sourceY) / 2;
    const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
  
    return [centerX, centerY, xOffset, yOffset];
  };

  export const createId = () => {
    function _p8(s: boolean) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
}

export const CreateElementNode = (node: Node): FlowElement => {
    let elementNode = null;

    if (!node)
        return elementNode;

    elementNode = {
        id: node.id,
        type: node.type.charAt(0).toUpperCase() + node.type.substring(1).toLowerCase(),
        data: node,
        position: node.position
    }

    return elementNode;
}

export const CreateProjectNodes = (project: Project ) :Elements => {

    const initialElements: Elements = [];

    if (!project)
        return;

    project.nodes.forEach(node => {
        const elementNode = CreateElementNode(node);
        if (elementNode)
            initialElements.push(elementNode);
    });
    return initialElements;
};
  