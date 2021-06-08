import { FindNodeById } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";

const UpdateConnectNodeSize = (nodeAmount: number) => {
  const mainConnectNode = red.store.getState().connectView.mainNode as Node;
  const actualNode = FindNodeById(mainConnectNode?.id);
  const twinId = "BlockFunctionNode-" + mainConnectNode?.id;
  const twinNode = document.getElementById(twinId);
  const yIncrease = 80;

  if (nodeAmount === 1) {
    if (twinNode !== null && twinNode !== undefined)
      twinNode.style.minHeight = `${Size.Node_Length}px`;
    if (actualNode !== null && actualNode !== undefined)
      actualNode.style.minHeight = `${Size.Node_Length}px`;
  }

  if (nodeAmount === 2) {
    twinNode.style.minHeight = `${Size.ConnectView_Length}px`;
    actualNode.style.minHeight = `${Size.ConnectView_Length}px`;
  }

  if (nodeAmount === 3) {
    const existingLength = Number(twinNode.style.cssText.substring(12, 15));
    if (existingLength === Size.ConnectView_Length) {
      twinNode.style.minHeight = `${Size.ConnectView_Length + yIncrease}px`;
      actualNode.style.minHeight = `${Size.ConnectView_Length + yIncrease}px`;
    } else {
      twinNode.style.minHeight = `${Size.ConnectView_Length}px`;
      actualNode.style.minHeight = `${Size.ConnectView_Length}px`;
    }
  }

  if (nodeAmount === 5) {
    twinNode.style.minHeight = `${Size.ConnectView_Length + yIncrease * 2}px`;
    actualNode.style.minHeight = `${Size.ConnectView_Length + yIncrease * 2}px`;
  }
};

export default UpdateConnectNodeSize;
