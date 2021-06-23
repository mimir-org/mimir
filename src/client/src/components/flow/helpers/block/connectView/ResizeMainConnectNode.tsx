import { FindNodeById } from ".";
import { Size } from "../../../../../compLibrary";

const UpdateConnectNodeSize = (nodeCount: number, mainNodeId: string) => {
  const mainNode = FindNodeById(mainNodeId);
  let newHeight = Size.Node_Length;
  let percent = 16;
  let count = 1;

  if (nodeCount !== 2 && nodeCount % 2 === 0) {
    count = Math.ceil(nodeCount - (nodeCount * percent) / 100);
  }

  if (nodeCount !== 1 && nodeCount % 2 !== 0) {
    count = Math.ceil(1 + nodeCount - (1 + nodeCount * percent) / 100);
  }

  if (mainNode) mainNode.style.minHeight = `${newHeight * count}px`;
};

export default UpdateConnectNodeSize;
