import { useDispatch, useSelector } from "react-redux";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { VIEW_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { CheckView, SaveAllModules } from "../../redux/store/localStorage";
import { changeAllModulesVisibility } from "../../redux/store/modules/actions";
import FullscreenButton from "./FullscreenButton";

const FullscreenBox = () => {
  const dispatch = useDispatch();
  const isBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);
  const isOpen = useSelector<RootState>((state) =>
    state.modules.types.find((x) => x.visible)
  ) as boolean;

  const handleOnClick = () => {
    dispatch(changeAllModulesVisibility(!isOpen, true));
    SaveAllModules(!isOpen);
  };

  return (
    <FullscreenButton isOpen={isOpen} isBlockView={isBlockView}>
      <img
        src={isOpen ? ExpandIcon : CloseIcon}
        alt="fullscreen"
        onClick={handleOnClick}
      />
    </FullscreenButton>
  );
};

export default FullscreenBox;
