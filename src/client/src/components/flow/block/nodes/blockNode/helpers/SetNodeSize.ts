import { Size } from "../../../../../../compLibrary/size/Size";
import { IsConnectorVisible } from "../../../../../../helpers";
import { Connector } from "../../../../../../models";
import { IsInputTerminal } from "../../../../helpers";

/**
 * Component to resize a Node based on the amount of active terminals.
 * @param terminals
 * @param electro
 */
export const SetNodeSize = (terminals: Connector[], electro: boolean) => {
  const maximum = 5;
  const increaseY = 25;
  const increaseX = 30;

  let inTerminals = 0;
  let outTerminals = 0;
  let height = Size.BLOCK_CHILD_NODE_HEIGHT;
  let width = Size.BLOCK_CHILD_NODE_WIDTH;

  terminals?.forEach((t) => {
    IsConnectorVisible(t) && IsInputTerminal(t) && inTerminals++;
    IsConnectorVisible(t) && !IsInputTerminal(t) && outTerminals++;
  });

  if (electro) {
    if (inTerminals > maximum) width = inTerminals * increaseX;
    if (outTerminals > maximum) width = outTerminals * increaseX;
  } else {
    if (inTerminals > maximum) height = inTerminals * increaseY;
    if (outTerminals > maximum) height = outTerminals * increaseY;
  }

  return { width: width, height: height };
};
