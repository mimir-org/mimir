import { FindNodeById } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";

const UpdateConnectNodeSize = (nodeAmount: number) => {
  const mainConnectNode = red.store.getState().connectView.mainNode as Node;
  let twinNode = FindNodeById(mainConnectNode?.id);

  const yIncrease = 80;
  const xIncrease = 120;

  if (nodeAmount === 3) {
    mainConnectNode.length = Size.ConnectView_Length + yIncrease;
    twinNode.style.minHeight = `${Size.ConnectView_Length + yIncrease}px`;
  }
};

export default UpdateConnectNodeSize;
