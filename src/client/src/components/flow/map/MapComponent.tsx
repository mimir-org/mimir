import { MiniMap } from "react-flow-renderer";
import { MapWrapper } from "./styled";
import { Size } from "../../../compLibrary/size";
import { heightSelector, inspectorSelector, libOpenSelector, useAppSelector } from "../../../redux/store";
import { GetAspectColor } from "../../../helpers";
import { AspectColorType } from "../../../models";

const MiniMapComponent = () => {
  const libOpen = useAppSelector(libOpenSelector);
  const inspectorOpen = useAppSelector(inspectorSelector);
  let height = useAppSelector(heightSelector) as number;
  if (!height) height = inspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <MapWrapper height={height} libOpen={libOpen}>
      <MiniMap
        nodeStrokeColor={(node: any) => {
          return GetAspectColor(node, AspectColorType.Selected);
        }}
        nodeColor={(node: any) => {
          return GetAspectColor(node, AspectColorType.Header);
        }}
        nodeStrokeWidth={20}
      />
    </MapWrapper>
  );
};

export default MiniMapComponent;
