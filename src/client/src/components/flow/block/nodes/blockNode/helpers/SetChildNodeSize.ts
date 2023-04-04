import { ConnectorDirection } from "lib";
import { Size } from "../../../../../../assets/size/Size";
import { BlockNodeSize } from "../../../../../../models/project";
import { Connectors } from "../../blockParentNode/BlockParentNode";

/**
 * Component to resize a child BlockNode based on the amount of active terminals.
 * @param terminals
 * @param electro
 * @returns a BlockNodeSize object with data for width and height.
 */
export const SetChildNodeSize = (terminals: Connectors, electro: boolean): BlockNodeSize => {
  const maximum = 5;
  const increaseX = 30;
  const increaseY = 25;

  let inTerminals = 0;
  let outTerminals = 0;
  let width = Size.NODE_WIDTH;
  let height = Size.NODE_HEIGHT;

  terminals.inputs.forEach((t) => {
    !t.hidden && t.direction === ConnectorDirection.Input && inTerminals++;
  });

  terminals.outputs.forEach((t) => {
    !t.hidden && t.direction === ConnectorDirection.Output && outTerminals++;
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
