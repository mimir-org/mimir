import { FindNodeById } from "../../../helpers/block";

const OnMouseOut = (showTerminalButton, id) => {
  showTerminalButton(false);
  const node = FindNodeById(id);
  node.style.border = "none";
};

export default OnMouseOut;
