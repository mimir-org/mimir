import { useDispatch, useSelector } from "react-redux";
import { FullScreenIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { RootState } from "../../redux/store";
import { SaveState } from "../../redux/store/localStorage/localStorage";
import { changeModuleVisibility } from "../../redux/store/modules/actions";
import FullscreenButton from "./FullscreenButton";

const FullscreenBox = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>((state) =>
    state.modules.type.find((x) => x.visible === true)
  ) as boolean;

  const handleOnClick = () => {
    dispatch(changeModuleVisibility(MODULE_TYPE.EXPLORER, !isOpen, true));
    dispatch(changeModuleVisibility(MODULE_TYPE.INSPECTOR, !isOpen, true));
    dispatch(changeModuleVisibility(MODULE_TYPE.LIBRARY, !isOpen, true));
    SaveState(!isOpen, MODULE_TYPE.EXPLORER);
    SaveState(!isOpen, MODULE_TYPE.INSPECTOR);
    SaveState(!isOpen, MODULE_TYPE.LIBRARY);
  };

  return (
    <FullscreenButton>
      <img src={FullScreenIcon} alt="fullscreen" onClick={handleOnClick} />
    </FullscreenButton>
  );
};

export default FullscreenBox;
