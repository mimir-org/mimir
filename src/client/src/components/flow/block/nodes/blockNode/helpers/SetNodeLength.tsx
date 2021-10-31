import { Size } from "../../../../../../compLibrary";
import { Connector, Node } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

/**
 * Component to resize a Node based on the amount of visual terminals.
 * @param terminals
 * @param node
 * @returns the new value for Node length
 */
const SetNodeLength = (terminals: Connector[], node: Node) => {
  const maximum = 5;
  const increaseY = 20;
  let inTerminals = 0;
  let outTerminals = 0;

  terminals.forEach((t) => {
    t.visible && IsInputTerminal(t) && inTerminals++;
    t.visible && !IsInputTerminal(t) && outTerminals++;
  });

  if (inTerminals > maximum) node.length = inTerminals * increaseY;
  else if (outTerminals > maximum) node.length = outTerminals * increaseY;
  node.width = Size.Node_Width;
};

export default SetNodeLength;
