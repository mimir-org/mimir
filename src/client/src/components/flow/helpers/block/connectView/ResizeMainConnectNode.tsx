import { FindNodeById } from ".";
import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";
import red from "../../../../../redux/store";

const UpdateConnectNodeSize = (
  nodeCount: number,
  mainConnectNodeId: string
) => {
  const mainConnectNode = red.store
    .getState()
    .connectView.mainNodes.find((x) => x.id === mainConnectNodeId) as Node;

  const actualNode = FindNodeById(mainConnectNode?.id);
  const twinId = "BlockFunctionNode-" + mainConnectNode?.id; // TODO: remove/refactor
  const twinNode = document.getElementById(twinId);
  let newHeight = Size.Node_Length;
  let percent = 16;
  let count = 1;

  if (nodeCount !== 2 && nodeCount % 2 === 0) {
    count = Math.ceil(nodeCount - (nodeCount * percent) / 100);
  }

  if (nodeCount !== 1 && nodeCount % 2 !== 0) {
    count = Math.ceil(1 + nodeCount - (1 + nodeCount * percent) / 100);
  }

  if (twinNode) twinNode.style.minHeight = `${newHeight * count}px`;
  if (actualNode) actualNode.style.minHeight = `${newHeight * count}px`;
};

export default UpdateConnectNodeSize;