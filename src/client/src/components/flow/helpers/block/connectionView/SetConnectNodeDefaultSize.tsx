import { FindNodeById } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";

const SetConnectNodeDefaultSize = (
  mainConnectNode: Node,
  connectNodes?: Node[]
) => {
  let twinNode = FindNodeById(mainConnectNode?.id);

  if (connectNodes?.length > 0 && twinNode) {
    twinNode.style.width = `${Size.ConnectView_Width}px`;
    twinNode.style.height = `${Size.ConnectView_Length}px`;
    twinNode.style.zIndex = "1";
  } else {
    if (twinNode) {
      twinNode.style.width = `${Size.Node_Width}px`;
      twinNode.style.height = `${Size.Node_Length}px`;
    }
    const id = "BlockFunctionNode-" + mainConnectNode?.id;
    const nextTwin = document.getElementById(id);
    if (nextTwin) {
      nextTwin.style.width = `${Size.Node_Width}px`;
      nextTwin.style.height = `${Size.Node_Length}px`;
    }
  }
};

export default SetConnectNodeDefaultSize;
