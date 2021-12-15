import { BlockNodeSize } from "../../../../../models/project";

/**
 * Method to set the terminal menu's X position.
 * @param isParent
 * @param electro
 * @param hasActiveTerminals
 * @param size
 * @returns a numeric value.
 */
const SetMenuXPos = (isParent: boolean, electro: boolean, hasActiveTerminals: boolean, size: BlockNodeSize) => {
  const marginSmall = 22;
  const marginLarge = 200;

  if (electro) {
    if (!isParent) return size.width;
  }

  if (isParent) return size.width - marginLarge;
  if (hasActiveTerminals) return size.width + marginSmall;
  return size.width;
};

export default SetMenuXPos;
