import { useDispatch, useSelector } from "react-redux";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { setModulesVisibility } from "../../redux/store/modules/actions";
import { FullScreenButton } from ".";

const FullScreenComponent = () => {
  const dispatch = useDispatch();
  const lib = MODULE_TYPE.LIBRARY;
  const isOpen = useSelector<RootState>((s) => s.modules.types.find((x) => x.visible)) as boolean;
  const libOpen = useSelector<RootState>((s) => s.modules.types.find((x) => x.type === lib).visible) as boolean;
  const inspectorHeight = useSelector<RootState>((state) => state.inspectorHeight.height) as number;

  const onToggleClick = () => dispatch(setModulesVisibility(!isOpen, true));

  return (
    <FullScreenButton libraryOpen={libOpen} height={inspectorHeight}>
      <img src={isOpen ? ExpandIcon : CloseIcon} alt="fullscreen" onClick={onToggleClick} />
    </FullScreenButton>
  );
};

export default FullScreenComponent;
