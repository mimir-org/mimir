import { Size } from "../assets/size/Size";
import { ViewportData } from "../models/project";

/**
 * Component to fit the view to the screen.
 * @param viewportData
 */
const SetFitToScreen = (viewportData: ViewportData) => {
  const x = window.innerWidth / 2 - Size.BLOCK_MARGIN_X;
  const y = window.innerHeight / 2 - Size.BLOCK_MARGIN_Y;
  const zoom = Size.ZOOM_DEFAULT;

  viewportData.setViewport({ x, y, zoom });
  viewportData.setCenter(x, y, { zoom });
};

export default SetFitToScreen;
