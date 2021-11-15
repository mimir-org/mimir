import { Size } from "../../compLibrary/size";
import { ExpandIcon, CloseIcon } from "../../assets/icons/controls";
import { OnToggleClick } from "./handlers";
import { FullScreenButton } from "./styled";
import {
  useAppDispatch,
  useAppSelector,
  isOpenSelector,
  libOpenSelector,
  inspectorSelector,
  heightSelector,
} from "../../redux/store";

interface Props {
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
}

const FullScreenComponent = ({ inspectorRef }: Props) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isOpenSelector);
  const isLibOpen = useAppSelector(libOpenSelector);
  const isInspectorOpen = useAppSelector(inspectorSelector);
  let height = useAppSelector(heightSelector);

  if (height === undefined) height = isInspectorOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <FullScreenButton libraryOpen={isLibOpen} height={height}>
      <img src={isOpen ? ExpandIcon : CloseIcon} alt="fullscreen" onClick={() => OnToggleClick(dispatch, isOpen, inspectorRef)} />
    </FullScreenButton>
  );
};

export default FullScreenComponent;
