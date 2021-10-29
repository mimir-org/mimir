import { Connector, Node } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

/**
 * Component to resize a Node based on the amount of visual terminals.
 * @param terminals
 * @param data
 * @returns the new value for Node length
 */
const SetNodeLength = (terminals: Connector[], data: Node) => {
  const maximum = 5;
  let inTerminals = 0;
  let outTerminals = 0;

  terminals.forEach((t) => {
    t.visible && IsInputTerminal(t) && inTerminals++;
    t.visible && !IsInputTerminal(t) && outTerminals++;
  });

  if (inTerminals > maximum) data.length += inTerminals * 12;
  else if (outTerminals > maximum) data.length += outTerminals * 12;
};

export default SetNodeLength;
