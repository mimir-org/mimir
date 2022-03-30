import { useReactFlow } from "react-flow-renderer";
import { Size } from "../../../../../../compLibrary/size/Size";

/**
 * Component to center the canvas' zoom level and position.
 * @param splitView
 */
export const SetZoomCenterLevel = (splitView: boolean) => {
  const { setViewport, setCenter } = useReactFlow();

  let x = window.innerWidth / 2 - Size.BLOCK_MARGIN_X;
  let y = window.innerHeight / 2 - Size.BLOCK_MARGIN_Y;
  let zoom = Size.ZOOM_DEFAULT;

  if (splitView) {
    x = Size.BLOCK_NODE_WIDTH;
    y = window.innerHeight / Size.SPLITVIEW_DIVISOR;
    zoom = Size.ZOOM_SPLITVIEW;
  }

  setViewport({ x, y, zoom });
  setCenter(x, y, { zoom });
};
