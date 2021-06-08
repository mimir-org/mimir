import { FindNodeById } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";

const ChangeConnectNodeSize = (
  mainConnectNode: Node,
  connectNodes?: Node[]
) => {
  let twinNode = FindNodeById(mainConnectNode?.id);

  if (connectNodes?.length > 0 && twinNode) {
    twinNode.style.width = `${Size.ConnectionView_Width}px`;
    twinNode.style.height = `${Size.ConnectionView_Length}px`;
    twinNode.style.zIndex = "1";
  } else {
    if (twinNode) {
      twinNode.style.width = `${Size.Node_Width}px`;
      twinNode.style.height = `${Size.Node_Length}px`;
    }
    const id = "BlockFunctionNode-" + mainConnectNode?.id;
    const nextShit = document.getElementById(id);
    if (nextShit) {
      nextShit.style.width = `${Size.Node_Width}px`;
      nextShit.style.height = `${Size.Node_Length}px`;
    }
  }
};

export default ChangeConnectNodeSize;
