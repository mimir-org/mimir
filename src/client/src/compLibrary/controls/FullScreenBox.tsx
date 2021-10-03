import { useDispatch, useSelector } from "react-redux";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { setModulesVisibility } from "../../redux/store/modules/actions";
import { FullScreenButton } from "./";

const FullScreenBox = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector<RootState>((s) => s.modules.types.find((x) => x.visible)) as boolean;

  const libraryOpen = useSelector<RootState>(
    (s) => s.modules.types.find((x) => x.type === MODULE_TYPE.LIBRARY).visible
  ) as boolean;

  const inspectorOpen = useSelector<RootState>(
    (s) => s.modules.types.find((x) => x.type === MODULE_TYPE.INSPECTOR).visible
  ) as boolean;

  const onToggleClick = () => {
    dispatch(setModulesVisibility(!isOpen, true));
  };

  return (
    <FullScreenButton libraryOpen={libraryOpen} inspectorOpen={inspectorOpen}>
      <img src={isOpen ? ExpandIcon : CloseIcon} alt="fullscreen" onClick={onToggleClick} />
    </FullScreenButton>
  );
};

export default FullScreenBox;
