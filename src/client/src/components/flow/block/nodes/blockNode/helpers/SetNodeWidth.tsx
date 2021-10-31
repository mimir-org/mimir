import { Connector, Node } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

/**
 * Component to resize a Node in Electro view based on the amount of visual terminals.
 * @param terminals
 * @param node
 * @returns the new value for Node width
 */
const SetNodeWidth = (terminals: Connector[], node: Node) => {
  const maximum = 5;
  const increaseX = 25;
  let inTerminals = 0;
  let outTerminals = 0;

  terminals.forEach((t) => {
    t.visible && IsInputTerminal(t) && inTerminals++;
    t.visible && !IsInputTerminal(t) && outTerminals++;
  });

  if (inTerminals > maximum) node.width = inTerminals * increaseX;
  else if (outTerminals > maximum) node.width = outTerminals * increaseX;
};

export default SetNodeWidth;
