import { SetCenter, SetViewport } from "react-flow-renderer";
import { SetZoomCenterLevel } from "../../../helpers";
import { Node } from "../../../models";

const OnResetZoom = (isTreeView: boolean, setViewport: SetViewport, setCenter: SetCenter, secondaryNode: Node) => {
  if (isTreeView) return;
  SetZoomCenterLevel(setViewport, setCenter, secondaryNode !== null);
};

export default OnResetZoom;
