import { useDispatch, useSelector } from "react-redux";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { setModulesVisibility } from "../../redux/store/modules/actions";
import { FullScreenButton } from "./";

const FullScreenBox = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector<RootState>((state) =>
    state.modules.types.find((x) => x.visible)
  ) as boolean;

  const isLibraryOpen = useSelector<RootState>(
    (state) =>
      state.modules.types.find((x) => x.type === MODULE_TYPE.LIBRARY).visible
  ) as boolean;

  const isInspectorOpen = useSelector<RootState>(
    (state) =>
      state.modules.types.find((x) => x.type === MODULE_TYPE.INSPECTOR).visible
  ) as boolean;

  const onToggleClick = () => {
    dispatch(setModulesVisibility(!isOpen, true));
  };

  return (
    <FullScreenButton
      isLibraryOpen={isLibraryOpen}
      isInspectorOpen={isInspectorOpen}
    >
      <img
        src={isOpen ? ExpandIcon : CloseIcon}
        alt="fullscreen"
        onClick={onToggleClick}
      />
    </FullScreenButton>
  );
};

export default FullScreenBox;
