import { Size } from "../../../../../../compLibrary";
import { Connector } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

/**
 * Component to resize a Node based on the amount of active terminals.
 * @param terminals
 * @param electro
 */
const SetNodeSize = (terminals: Connector[], electro: boolean) => {
  const maximum = 5;
  const increaseY = 25;
  const increaseX = 30;

  let inTerminals = 0;
  let outTerminals = 0;
  let length = Size.Node_Length;
  let width = Size.Node_Width;

  terminals.forEach((t) => {
    t.visible && IsInputTerminal(t) && inTerminals++;
    t.visible && !IsInputTerminal(t) && outTerminals++;
  });

  if (electro) {
    if (inTerminals > maximum) width = inTerminals * increaseX;
    if (outTerminals > maximum) width = outTerminals * increaseX;
  } else {
    if (inTerminals > maximum) length = inTerminals * increaseY;
    if (outTerminals > maximum) length = outTerminals * increaseY;
  }

  return { width: width, length: length };
};

export default SetNodeSize;
