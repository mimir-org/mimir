import { MutableRefObject } from "react";
import { Size } from "../../compLibrary/size";
import { VisuallyHidden } from "../../compLibrary/util";
import { CloseIcon, ExpandIcon } from "../../assets/icons/controls";
import { TextResources } from "../../assets/text";
import { OnToggleClick } from "./handlers";
import { FullScreenButton } from "./FullScreenComponent.styled";
import {
  heightSelector,
  inspectorSelector,
  isOpenSelector,
  libOpenSelector,
  useAppDispatch,
  useAppSelector,
} from "../../redux/store";

interface Props {
  inspectorRef: MutableRefObject<HTMLDivElement>;
}

const FullScreenComponent = ({ inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isOpenSelector);
  const isLibOpen = useAppSelector(libOpenSelector);
  const isInspectorOpen = useAppSelector(inspectorSelector);
  let height = useAppSelector(heightSelector);

  if (height === undefined) height = isInspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <FullScreenButton libraryOpen={isLibOpen} height={height} onClick={() => OnToggleClick(dispatch, isOpen, inspectorRef)}>
      <VisuallyHidden>{isOpen ? TextResources.Fullscreen_Close : TextResources.Fullscreen_Open}</VisuallyHidden>
      <img src={isOpen ? ExpandIcon : CloseIcon} alt="" />
    </FullScreenButton>
  );
};

export default FullScreenComponent;
