import { useDispatch } from "react-redux";
import { FullScreenIcon } from "../../assets/icons/controls";
import { MODULE_TYPE } from "../../models/project";
import { changeModuleVisibility } from "../../redux/store/modules/actions";

const FullscreenBox = () => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(changeModuleVisibility(MODULE_TYPE.EXPLORER, false));
    dispatch(changeModuleVisibility(MODULE_TYPE.INSPECTOR, false));
    dispatch(changeModuleVisibility(MODULE_TYPE.LIBRARY, false));
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "462px",
        left: "160px",
      }}
    >
      <img
        src={FullScreenIcon}
        alt="fullscreen"
        onClick={handleOnClick}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default FullscreenBox;
