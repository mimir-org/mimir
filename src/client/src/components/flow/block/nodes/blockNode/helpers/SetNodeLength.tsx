import { Size } from "../../../../../../compLibrary";
import { Connector, Node } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

/**
 * Component to resize a Node based on the amount of visual terminals.
 * @param terminals
 * @param node
 */
const SetNodeLength = (terminals: Connector[], node: Node) => {
  const maximum = 5;
  const increaseY = 25;
  let inTerminals = 0;
  let outTerminals = 0;

  terminals.forEach((t) => {
    t.visible && IsInputTerminal(t) && inTerminals++;
    t.visible && !IsInputTerminal(t) && outTerminals++;
  });

  if (inTerminals > maximum) node.length = inTerminals * increaseY;
  if (outTerminals > maximum) node.length = outTerminals * increaseY;
  if (inTerminals === 0 && outTerminals === 0) node.length = Size.Node_Length;
  node.width = Size.Node_Width;
};

export default SetNodeLength;
