import { FindNodeByDataId } from "../../../helpers/block";

const OnMouseOut = (showTerminalButton, showConnectButton, id) => {
  showTerminalButton(false);
  showConnectButton(false);
  const node = FindNodeByDataId(id);
  node.style.border = "none";
};

export default OnMouseOut;
