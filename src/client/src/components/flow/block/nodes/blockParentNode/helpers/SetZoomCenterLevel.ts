import { FlowTransform } from "react-flow-renderer";
import { Size } from "../../../../../../compLibrary/size/Size";

/**
 * Component to center the canvas' zoom level and position.
 * @param splitView
 * @returns a FlowTransform object containing data for position and zoom.
 */
export const SetZoomCenterLevel = (splitView: boolean) => {
  if (splitView) {
    return {
      x: Size.BLOCK_NODE_WIDTH,
      y: window.innerHeight / Size.SPLITVIEW_DIVISOR,
      zoom: Size.ZOOM_SPLITVIEW,
    } as FlowTransform;
  }

  return {
    x: window.innerWidth / 2 - Size.BLOCK_MARGIN_X,
    y: window.innerHeight / 2 - Size.BLOCK_MARGIN_Y,
    zoom: Size.ZOOM_DEFAULT,
  } as FlowTransform;
};
