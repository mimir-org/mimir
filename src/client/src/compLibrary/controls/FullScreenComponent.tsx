import { useDispatch, useSelector } from "react-redux";
import { Size } from "..";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { OnToggleClick } from "./handlers";
import { FullScreenButton } from "./styled";

const FullScreenComponent = () => {
  const dispatch = useDispatch();
  const lib = MODULE_TYPE.LIBRARY;
  const type = MODULE_TYPE.INSPECTOR;

  const isOpen = useSelector<RootState>((s) => s.modules.types.find((m) => m.visible)) as boolean;
  const libOpen = useSelector<RootState>((s) => s.modules.types.find((m) => m.type === lib).visible) as boolean;
  const inspectorOpen = useSelector<RootState>((s) => s.modules.types.find((m) => m.type === type).visible) as boolean;

  let height = useSelector<RootState>((state) => state.inspectorHeight.height) as number;
  if (height === undefined) height = inspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <FullScreenButton libraryOpen={libOpen} height={height}>
      <img src={isOpen ? ExpandIcon : CloseIcon} alt="fullscreen" onClick={() => OnToggleClick(dispatch, isOpen)} />
    </FullScreenButton>
  );
};

export default FullScreenComponent;
