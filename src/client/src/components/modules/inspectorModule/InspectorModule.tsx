import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EyeIcon, ToggleDown, ToggleUp } from "../../../assets/icons";
import { IconWrapper, ToggleButtonWrapper } from "./styled";
import { TextResources } from "../../../assets/textResources";
import { InspectorTabsHeader } from "./styled";
import { InspectorTitle } from "./styled";
import InspectorTabs from "./InspectorTabs";
import { AnimatedModule, Size } from "../../../componentLibrary";
import { MODULE_TYPE } from "../../../models/project";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { SaveState } from "../../../redux/store/localStorage";

const InspectorModule = () => {
  const dispatch = useDispatch();
  const key = MODULE_TYPE.INSPECTOR;

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  );

  const animate = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).animate
  ) as boolean;

  const isOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === key).visible
  ) as boolean;

  const handleClick = () => {
    SaveState(!isOpen, key);
    dispatch(changeModuleVisibility(key, !isOpen, true));
  };

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedModule start={start} stop={stop} run={animate} type={key}>
      <InspectorTabsHeader>
        {hasProject && <InspectorTabs />}
        <ToggleButtonWrapper>
          {isOpen ? (
            <img src={ToggleDown} alt="toggle-icon" onClick={handleClick} />
          ) : (
            <img src={ToggleUp} alt="toggle-icon" onClick={handleClick} />
          )}
        </ToggleButtonWrapper>
        <IconWrapper>
          <InspectorTitle>{TextResources.Inspector_Heading}</InspectorTitle>
          <img src={EyeIcon} alt="inspector-icon" />
        </IconWrapper>
      </InspectorTabsHeader>
    </AnimatedModule>
  );
};

export default InspectorModule;
