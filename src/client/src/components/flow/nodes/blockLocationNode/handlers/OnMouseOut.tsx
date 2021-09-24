import { FindNodeByDataId } from "../../../helpers/block";

const OnMouseOut = (showTerminalButton, id) => {
  showTerminalButton(false);
  const node = FindNodeByDataId(id);
  node.style.border = "none";
};

export default OnMouseOut;
