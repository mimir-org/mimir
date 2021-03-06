import { Size } from "../../../../../../compLibrary/size/Size";
import { IsInputTerminal, IsConnectorVisible, IsOutputTerminal } from "../../../../helpers/Connectors";
import { Terminals } from "../../blockParentNode/BlockParentNode";

/**
 * Component to resize a child BlockNode based on the amount of active terminals.
 * @param terminals
 * @param electro
 * @returns a size object with data for width and height.
 */
export const SetChildNodeSize = (terminals: Terminals, electro: boolean) => {
  const maximum = 5;
  const increaseX = 30;
  const increaseY = 25;

  let inTerminals = 0;
  let outTerminals = 0;
  let width = Size.NODE_WIDTH;
  let height = Size.NODE_HEIGHT;

  terminals.inputs.forEach((t) => {
    IsConnectorVisible(t) && IsInputTerminal(t) && inTerminals++;
  });

  terminals.outputs.forEach((t) => {
    IsConnectorVisible(t) && IsOutputTerminal(t) && outTerminals++;
  });

  if (electro) {
    if (inTerminals > maximum) width = inTerminals * increaseX;
    if (outTerminals > maximum) width = outTerminals * increaseX;
    return { width, height };
  }

  if (inTerminals > maximum) height = inTerminals * increaseY;
  if (outTerminals > maximum) height = outTerminals * increaseY;
  return { width, height };
};
