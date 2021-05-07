import { useDispatch } from "react-redux";
import { FullScreenIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { CloseAllModules } from "../../redux/store/localStorage/localStorage";
import { changeModuleVisibility } from "../../redux/store/modules/actions";
import FullscreenButton from "./FullscreenButton";

const FullscreenBox = () => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(changeModuleVisibility(MODULE_TYPE.EXPLORER, false));
    dispatch(changeModuleVisibility(MODULE_TYPE.INSPECTOR, false));
    dispatch(changeModuleVisibility(MODULE_TYPE.LIBRARY, false));
    CloseAllModules();
  };

  return (
    <FullscreenButton>
      <img src={FullScreenIcon} alt="fullscreen" onClick={handleOnClick} />
    </FullscreenButton>
  );
};

export default FullscreenBox;
