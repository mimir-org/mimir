import { FlowTransform } from "react-flow-renderer";
import { Size } from "../../../../../../compLibrary/size";

/**
 * Component to set the canvas' zoom level and position to center.
 * @param splitView
 * @returns a FlowTransform object containing data for position and zoom.
 */
export const SetZoomCenterLevel = (splitView: boolean) => {
  let zoom = Size.DEFAULT_ZOOM_LEVEL;
  let x = window.innerWidth / 2 - Size.BLOCK_MARGIN_X;
  let y = window.innerHeight / 2 - Size.BLOCK_MARGIN_Y;

  if (splitView) {
    zoom = Size.BLOCK_SPLITVIEW_ZOOM;
    x = Size.BLOCK_NODE_WIDTH;
    y = window.innerHeight / Size.BLOCK_SPLITVIEW_DIVISOR;
  }

  return { x, y, zoom } as FlowTransform;
};
