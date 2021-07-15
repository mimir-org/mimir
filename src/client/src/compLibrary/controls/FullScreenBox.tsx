import { useDispatch, useSelector } from "react-redux";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { changeAllModulesVisibility } from "../../redux/store/modules/actions";
import { FullScreenButton } from "./";

const FullScreenBox = () => {
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

  const OnClick = () => {
    dispatch(changeAllModulesVisibility(!isOpen, true));
  };

  return (
    <FullScreenButton isExplorer={isExplorer} isInspector={isInspector}>
      <img
        src={isOpen ? ExpandIcon : CloseIcon}
        alt="fullscreen"
        onClick={OnClick}
      />
    </FullScreenButton>
  );
};

export default FullScreenBox;
