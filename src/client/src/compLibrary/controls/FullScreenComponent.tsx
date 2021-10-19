import { Size } from "..";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { OnToggleClick } from "./handlers";
import { heightSelector, isInspectorOpenSelector, isLibOpenSelector, isOpenSelector } from "./selectors";
import { FullScreenButton } from "./styled";

const FullScreenComponent = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isOpenSelector);
  const isLibOpen = useAppSelector(isLibOpenSelector);
  const isInspectorOpen = useAppSelector(isInspectorOpenSelector);
  let height = useAppSelector(heightSelector);

  if (height === undefined) height = isInspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <FullScreenButton libraryOpen={isLibOpen} height={height}>
      <img src={isOpen ? ExpandIcon : CloseIcon} alt="fullscreen" onClick={() => OnToggleClick(dispatch, isOpen)} />
    </FullScreenButton>
  );
};

export default FullScreenComponent;
