import { FindNodeById } from ".";
import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const SetConnectNodeSize = (mainConnectNode: Node, connectNodes?: Node[]) => {
  let twinNode = FindNodeById(mainConnectNode?.id);

  // Resize MainConnectNode to large block
  if (connectNodes?.length > 0 && twinNode) {
    twinNode.style.width = `${Size.ConnectView_Width}px`;
    twinNode.style.height = `${Size.ConnectView_Length}px`;
    twinNode.style.zIndex = "1";
  } else {
    // Reset MainConnectNode to normal
    if (twinNode) {
      twinNode.style.width = `${Size.Node_Width}px`;
      twinNode.style.height = `${Size.Node_Length}px`;
    }
  }
};

export default SetConnectNodeSize;
