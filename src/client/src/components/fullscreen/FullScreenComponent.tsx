import { MutableRefObject } from "react";
import { Size } from "../../compLibrary/size/Size";
import { VisuallyHidden } from "../../compLibrary/util";
import { CloseIcon, ExpandIcon } from "../../assets/icons/controls";
import { TextResources } from "../../assets/text/TextResources";
import { OnToggleClick } from "./handlers/OnToggleClick";
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

/**
 * Component for the fullscreen functionality in Mimir.
 * @param interface
 * @returns a fullscreen button.
 */
export const FullScreenComponent = ({ inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isOpenSelector);
  const isLibOpen = useAppSelector(libOpenSelector);
  const isInspectorOpen = useAppSelector(inspectorSelector);
  let height = useAppSelector(heightSelector);

  if (height === undefined) height = isInspectorOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED;

  return (
    <FullScreenButton libraryOpen={isLibOpen} height={height} onClick={() => OnToggleClick(dispatch, isOpen, inspectorRef)}>
      <VisuallyHidden>{isOpen ? TextResources.FULLSCREEN_CLOSE : TextResources.FULLSCREEN_OPEN}</VisuallyHidden>
      <img src={isOpen ? ExpandIcon : CloseIcon} alt="" />
    </FullScreenButton>
  );
};
