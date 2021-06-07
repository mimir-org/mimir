import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EyeIcon, ToggleDown, ToggleUp } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/textResources";
import InspectorTabs from "./InspectorTabs";
import { Size } from "../../../componentLibrary";
import { MODULE_TYPE } from "../../../models/project";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { IsExplorerModule, IsLibraryModule } from "../../flow/helpers/common";
import {
  InspectorTitle,
  InspectorBody,
  AnimatedInspector,
  IconWrapper,
  ButtonBox,
} from "../../../componentLibrary/box/inspector";

const InspectorModule = () => {
  const dispatch = useDispatch();
  const key = MODULE_TYPE.INSPECTOR;

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project
  );

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).animate
  ) as boolean;

  const isInspectorOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).visible
  ) as boolean;

  const isLibraryOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsLibraryModule(x.type)).visible
  ) as boolean;

  const isExplorerOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => IsExplorerModule(x.type)).visible
  ) as boolean;

  const handleClick = () => {
    dispatch(changeModuleVisibility(key, !isInspectorOpen, true));
  };

  const start = isInspectorOpen ? Size.ModuleClosed : Size.InspectorModuleOpen;
  const stop = isInspectorOpen ? Size.InspectorModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedInspector
      type={key}
      isLibraryOpen={isLibraryOpen}
      isExplorerOpen={isExplorerOpen}
      start={start}
      stop={stop}
      run={animate}
    >
      <InspectorBody>
        {hasProject && <InspectorTabs />}
        <ButtonBox>
          {isInspectorOpen ? (
            <img src={ToggleDown} alt="toggle-icon" onClick={handleClick} />
          ) : (
            <img src={ToggleUp} alt="toggle-icon" onClick={handleClick} />
          )}
        </ButtonBox>
        <IconWrapper>
          <InspectorTitle>{TextResources.Inspector_Heading}</InspectorTitle>
          <img src={EyeIcon} alt="inspector-icon" />
        </IconWrapper>
      </InspectorBody>
    </AnimatedInspector>
  );
};

export default InspectorModule;
