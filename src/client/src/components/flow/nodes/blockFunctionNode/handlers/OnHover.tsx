import { FindNodeById } from "../../../helpers/block";

const OnHover = (showTerminalButton, showConnectButton, id) => {
  showTerminalButton(true);
  showConnectButton(true);
  const node = FindNodeById(id);
  node.style.border = "3px solid #fbc913";
};

export default OnHover;
