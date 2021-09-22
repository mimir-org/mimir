import { FindNodeByDataId } from "../../../helpers/block";

const OnHover = (showTerminalButton, id) => {
  showTerminalButton(true);
  const node = FindNodeByDataId(id);
  node.style.border = "3px solid #a300a7";
};

export default OnHover;
