import { Size } from "../../../../../compLibrary";
import { Connector, Node } from "../../../../../models";
import { IsInputTerminal } from "../../../helpers";

const SetNodeLength = (terminals: Connector[], data: Node) => {
  const maximum = 5;
  let inTerminals = 0;
  let outTerminals = 0;

  terminals.forEach((t) => {
    t.visible && IsInputTerminal(t) && inTerminals++;
    t.visible && !IsInputTerminal(t) && outTerminals++;
  });

  if (inTerminals > maximum) data.length += inTerminals * 10 + Size.Terminals_Interval;
  else if (outTerminals > maximum) data.length += outTerminals * 10 + Size.Terminals_Interval;
};

export default SetNodeLength;
