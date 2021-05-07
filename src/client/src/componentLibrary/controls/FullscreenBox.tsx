import { useDispatch, useSelector } from "react-redux";
import { FullScreenIcon } from "../../assets/icons/controls";
import { RootState } from "../../redux/store";
import { SaveAllModules } from "../../redux/store/localStorage/localStorage";
import { changeAllModulesVisibility } from "../../redux/store/modules/actions";
import FullscreenButton from "./FullscreenButton";

const FullscreenBox = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>((state) =>
    state.modules.types.find((x) => x.visible === true)
  ) as boolean;

  const handleOnClick = () => {
    dispatch(changeAllModulesVisibility(!isOpen, true));
    SaveAllModules(!isOpen);
  };

  return (
    <FullscreenButton>
      <img src={FullScreenIcon} alt="fullscreen" onClick={handleOnClick} />
    </FullscreenButton>
  );
};

export default FullscreenBox;
