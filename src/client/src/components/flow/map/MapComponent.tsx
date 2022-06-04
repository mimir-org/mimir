import { MiniMap, Node as FlowNode } from "react-flow-renderer";
import { MapWrapper } from "./MapComponent.styled";
import { Size } from "../../../assets/size/Size";
import { heightSelector, inspectorSelector, libOpenSelector, useAppSelector } from "../../../redux/store";
import { GetAspectColor } from "../../../helpers";
import { AspectColorType, Node } from "../../../models";

export const MiniMapComponent = () => {
  const libOpen = useAppSelector(libOpenSelector);
  const inspectorOpen = useAppSelector(inspectorSelector);
  let height = useAppSelector(heightSelector);
  if (!height) height = inspectorOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED;

  return (
    <MapWrapper height={height} libOpen={libOpen}>
      <MiniMap
        nodeStrokeColor={(node: FlowNode<Node>) => {
          return GetAspectColor(node.data, AspectColorType.Selected);
        }}
        nodeColor={(node: FlowNode<Node>) => {
          return GetAspectColor(node.data, AspectColorType.Header);
        }}
        nodeStrokeWidth={20}
      />
    </MapWrapper>
  );
};
