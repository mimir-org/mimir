import { FindNodeById } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";

const UpdateConnectNodeSize = (nodeCount: number) => {
  const mainConnectNode = red.store.getState().connectView.mainNode as Node;
  const actualNode = FindNodeById(mainConnectNode?.id);
  const twinId = "BlockFunctionNode-" + mainConnectNode?.id;
  const twinNode = document.getElementById(twinId);
  const yIncrease = 80;
  let newHeight = 0;
  let prevHeight = 0;

  if (nodeCount === 1) newHeight = Size.Node_Length;
  if (nodeCount === 2) newHeight = Size.ConnectView_Length;
  if (nodeCount === 4) newHeight = Size.ConnectView_Length + yIncrease;
  if (nodeCount === 6) newHeight = Size.ConnectView_Length + yIncrease * 2;

  if (twinNode) prevHeight = Number(twinNode.style.cssText.substring(12, 15));

  if (nodeCount === 3) {
    prevHeight === Size.ConnectView_Length
      ? (newHeight = Size.ConnectView_Length + yIncrease)
      : (newHeight = Size.ConnectView_Length);
  }

  if (nodeCount === 5) {
    prevHeight === Size.ConnectView_Length + yIncrease
      ? (newHeight = Size.ConnectView_Length + yIncrease * 2)
      : (newHeight = Size.ConnectView_Length + yIncrease);
  }

  if (twinNode) twinNode.style.minHeight = `${newHeight}px`;
  if (actualNode) actualNode.style.minHeight = `${newHeight}px`;
};

export default UpdateConnectNodeSize;
