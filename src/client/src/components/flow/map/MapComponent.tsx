import { MiniMap } from "react-flow-renderer";
import { MapWrapper } from "./styled";
import { GetMapColor, GetStrokeColor } from "./helpers";
import { Size } from "../../../compLibrary";
import {
  heightSelector,
  inspectorSelector,
  isOpenSelector,
  libOpenSelector,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

const MiniMapComponent = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isOpenSelector);
  const libOpen = useAppSelector(libOpenSelector);
  const inspectorOpen = useAppSelector(inspectorSelector);
  let height = useAppSelector(heightSelector);
  if (height === undefined) height = inspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <MapWrapper height={height} libOpen={libOpen}>
      <MiniMap
        nodeStrokeColor={(node: any) => {
          return GetStrokeColor(node);
        }}
        nodeColor={(node: any) => {
          return GetMapColor(node);
        }}
        nodeStrokeWidth={20}
      />
    </MapWrapper>
  );
};

export default MiniMapComponent;
