import { Size } from "../../../../../../compLibrary";
import { Connector, Node } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

/**
 * Component to resize a Node in Electro view based on the amount of visual terminals.
 * @param terminals
 * @param node
 */
const SetNodeWidth = (terminals: Connector[], node: Node) => {
  const maximum = 5;
  const increaseX = 30;
  let inTerminals = 0;
  let outTerminals = 0;

  terminals.forEach((t) => {
    t.visible && IsInputTerminal(t) && inTerminals++;
    t.visible && !IsInputTerminal(t) && outTerminals++;
  });

  if (inTerminals > maximum) node.width = inTerminals * increaseX;
  if (outTerminals > maximum) node.width = outTerminals * increaseX;
  if (inTerminals === 0 && outTerminals === 0) node.width = Size.Node_Width;
  node.length = Size.Node_Length;
};

export default SetNodeWidth;
