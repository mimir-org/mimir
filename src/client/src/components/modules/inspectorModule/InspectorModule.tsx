import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AnimatedInspectorMenu from "./styled/animated/AnimatedInspectorMenu";
import { useState } from "react";
import { EyeIcon, ToggleIconDown, ToggleIconUp } from "../../../assets";
import { IconWrapper, ToggleButtonWrapper } from "./styled";
import textResources from "../../../textResources";
import { InspectorTabsHeader } from "./styled";
import { InspectorTitle } from "./styled";
import InspectorTabs from "./InspectorTabs";
import { Size } from "../../../componentLibrary";
import { MODULE_TYPE } from "../../../models/project";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import {
  LoadState,
  SaveState,
} from "../../../redux/store/localStorage/localStorage";

const InspectorModule = () => {
  const dispatch = useDispatch();
  const key = MODULE_TYPE.INSPECTOR;
  const [isOpen, setIsOpen] = useState(LoadState(key));
  const [animate, setAnimate] = useState(false);

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  );

  const handleClick = () => {
    SaveState(!isOpen, key);
    setIsOpen(!isOpen);
    setAnimate(true);
    dispatch(changeModuleVisibility(key, !isOpen));
  };

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  return (
    <AnimatedInspectorMenu start={start} stop={stop} run={animate}>
      <InspectorTabsHeader>
        {hasProject && <InspectorTabs />}
        <ToggleButtonWrapper>
          {isOpen ? (
            <img src={ToggleIconDown} alt="toggle-icon" onClick={handleClick} />
          ) : (
            <img src={ToggleIconUp} alt="toggle-icon" onClick={handleClick} />
          )}
        </ToggleButtonWrapper>
        <IconWrapper>
          <InspectorTitle>{textResources.Inspector_Heading}</InspectorTitle>
          <img src={EyeIcon} alt="inspector-icon" />
        </IconWrapper>
      </InspectorTabsHeader>
    </AnimatedInspectorMenu>
  );
};

export default InspectorModule;
