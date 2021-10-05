import { FindNodeByDataId } from "../../../block/helpers";

const OnMouseOut = (showTerminalButton, showConnectButton, id) => {
  showTerminalButton(false);
  showConnectButton(false);
  const node = FindNodeByDataId(id);
  node.style.border = "none";
};

export default OnMouseOut;
