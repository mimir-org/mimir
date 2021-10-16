import { Size } from "../../../../../compLibrary";
import { Connector, Node } from "../../../../../models";
import { IsInputTerminal } from "../../../helpers";

const ResizeElectroNode = (terminals: Connector[], data: Node) => {
  const maximum = 5;
  let terminalCount = 0;

  terminals.forEach((t) => {
    t.visible && IsInputTerminal(t) && terminalCount++;
  });

  if (terminalCount > maximum) data.width += terminalCount * 10 + Size.Terminals_Interval;
};

export default ResizeElectroNode;
