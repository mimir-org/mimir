import { FindNodeById } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";

const UpdateConnectNodeSize = (nodeAmount: number) => {
  const mainConnectNode = red.store.getState().connectView.mainNode as Node;
  let twinNode = FindNodeById(mainConnectNode?.id);
  const id = "BlockFunctionNode-" + mainConnectNode?.id;
  const twinBox = document.getElementById(id);

  const yIncrease = 80;

  if (nodeAmount === 2) {
    twinBox.style.minHeight = `${Size.ConnectView_Length}px`;
    twinNode.style.minHeight = `${Size.ConnectView_Length}px`;
  }

  if (nodeAmount === 3) {
    const existingLength = Number(twinBox.style.cssText.substring(12, 15));
    if (existingLength === Size.ConnectView_Length) {
      twinBox.style.minHeight = `${Size.ConnectView_Length + yIncrease}px`;
      twinNode.style.minHeight = `${Size.ConnectView_Length + yIncrease}px`;
    } else {
      twinBox.style.minHeight = `${Size.ConnectView_Length}px`;
      twinNode.style.minHeight = `${Size.ConnectView_Length}px`;
    }
  }
};

export default UpdateConnectNodeSize;
