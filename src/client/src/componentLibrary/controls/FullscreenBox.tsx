import { useDispatch, useSelector } from "react-redux";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { SaveAllModules } from "../../redux/store/localStorage";
import { changeAllModulesVisibility } from "../../redux/store/modules/actions";
import FullscreenButton from "./FullscreenButton";

const FullscreenBox = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector<RootState>((state) =>
    state.modules.types.find((x) => x.visible)
  ) as boolean;

  const isExplorer = useSelector<RootState>(
    (state) =>
      state.modules.types.find((x) => x.type === MODULE_TYPE.EXPLORER).visible
  ) as boolean;

  const isInspector = useSelector<RootState>(
    (state) =>
      state.modules.types.find((x) => x.type === MODULE_TYPE.INSPECTOR).visible
  ) as boolean;

  const handleOnClick = () => {
    dispatch(changeAllModulesVisibility(!isOpen, true));
    SaveAllModules(!isOpen);
  };

  return (
    <FullscreenButton isExplorer={isExplorer} isInspector={isInspector}>
      <img
        src={isOpen ? ExpandIcon : CloseIcon}
        alt="fullscreen"
        onClick={handleOnClick}
      />
    </FullscreenButton>
  );
};

export default FullscreenBox;
