import { useDispatch, useSelector } from "react-redux";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { setModulesVisibility } from "../../redux/store/modules/actions";
import { FullScreenButton } from ".";

const FullScreenComponent = () => {
  const dispatch = useDispatch();
  const lib = MODULE_TYPE.LIBRARY;
  const inspector = MODULE_TYPE.INSPECTOR;

  const isOpen = useSelector<RootState>((s) => s.modules.types.find((x) => x.visible)) as boolean;
  const libOpen = useSelector<RootState>((s) => s.modules.types.find((x) => x.type === lib).visible) as boolean;
  const inspectorOpen = useSelector<RootState>(
    (s) => s.modules.types.find((x) => x.type === inspector).visible
  ) as boolean;

  const onToggleClick = () => {
    dispatch(setModulesVisibility(!isOpen, true));
  };

  return (
    <FullScreenButton libraryOpen={libOpen} inspectorOpen={inspectorOpen}>
      <img src={isOpen ? ExpandIcon : CloseIcon} alt="fullscreen" onClick={onToggleClick} />
    </FullScreenButton>
  );
};

export default FullScreenComponent;
