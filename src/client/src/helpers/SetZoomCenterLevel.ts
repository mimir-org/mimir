import { Size } from "../compLibrary/size/Size";
import { ViewportData } from "../models/project";

/**
 * Component to center the canvas' zoom level and position.
 * @param viewportData
 * @param splitView
 */
const SetZoomCenterLevel = (viewportData: ViewportData, splitView: boolean) => {
  let x = window.innerWidth / 2 - Size.BLOCK_MARGIN_X;
  let y = window.innerHeight / 2 - Size.BLOCK_MARGIN_Y;
  let zoom = Size.ZOOM_DEFAULT;

  if (splitView) {
    x = Size.BLOCK_NODE_WIDTH;
    y = window.innerHeight / Size.SPLITVIEW_DIVISOR;
    zoom = Size.ZOOM_SPLITVIEW;
  }

  viewportData.setViewport({ x, y, zoom });
  viewportData.setCenter(x, y, { zoom });
};

export default SetZoomCenterLevel;
