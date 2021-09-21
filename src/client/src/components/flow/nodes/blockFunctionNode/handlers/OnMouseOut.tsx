import { FindNodeById } from "../../../helpers/block";

const OnMouseOut = (showTerminalButton, showConnectButton, id) => {
  showTerminalButton(false);
  showConnectButton(false);
  const node = FindNodeById(id);
  node.style.border = "none";
};

export default OnMouseOut;
