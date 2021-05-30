import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EyeIcon, ToggleDown, ToggleUp } from "../../../assets/icons";
import { AnimatedInspector, IconWrapper, ButtonBox } from "./styled";
import { TextResources } from "../../../assets/textResources";
import { InspectorBody } from "./styled";
import { InspectorTitle } from "./styled";
import InspectorTabs from "./InspectorTabs";
import { MODULE_TYPE } from "../../../models/project";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { SaveState } from "../../../redux/store/localStorage";

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
    (state) =>
      state.modules.types.find((x) => x.type === MODULE_TYPE.LIBRARY).visible
  ) as boolean;

  const isExplorerOpen = useSelector<RootState>(
    (state) =>
      state.modules.types.find((x) => x.type === MODULE_TYPE.EXPLORER).visible
  ) as boolean;

  const handleClick = () => {
    SaveState(!isInspectorOpen, key);
    dispatch(changeModuleVisibility(key, !isInspectorOpen, true));
  };

  const start = isInspectorOpen ? 37 : 257;
  const stop = isInspectorOpen ? 257 : 37;

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
