import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { ExplorerIcon, ToggleIconLeft, ToggleIconRight } from "../../../assets";
import ProjectComponent from "./projectComponent/ProjectComponent";
import { SwitchViewComponent } from "./switchviewComponent/SwitchViewComponent";
import textResources from "../../../textResources";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { changeModuleVisibility } from "../../../redux/store/modules/actions";
import { Size } from "../../../componentLibrary";
import {
  LoadState,
  SaveState,
} from "../../../redux/store/localStorage/localStorage";
import {
  HeaderWrapper,
  IconWrapper,
  ContentWrapper,
  ExplorerTitle,
  CollapsedIcon,
  ExplorerFooterWrapper,
} from "./styled";

export const ExplorerModule = () => {
  const dispatch = useDispatch();
  const key = "explorer";
  const [isOpen, setIsOpen] = useState(LoadState(key));
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    SaveState(!isOpen, key);
    setIsOpen(!isOpen);
    setAnimate(true);
    dispatch(changeModuleVisibility(key, !isOpen));
  };

  const start = isOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stop = isOpen ? Size.ModuleOpen : Size.ModuleClosed;

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  );

  return (
    <AnimatedMenu start={start} stop={stop} run={animate}>
      <HeaderWrapper>
        <IconWrapper>
          <ExplorerTitle>{textResources.Explorer_view}</ExplorerTitle>
          <img src={ExplorerIcon} alt="explorerIcon" />
        </IconWrapper>
        <img
          src={isOpen ? ToggleIconLeft : ToggleIconRight}
          alt="toggle-icon"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </HeaderWrapper>
      <CollapsedIcon visible={isOpen}>
        <img src={ExplorerIcon} alt="explorerIcon" />
      </CollapsedIcon>
      {hasProject && (
        <ContentWrapper visible={isOpen}>
          <ProjectComponent />
        </ContentWrapper>
      )}
      <ExplorerFooterWrapper visible={isOpen}>
        <SwitchViewComponent />
      </ExplorerFooterWrapper>
    </AnimatedMenu>
  );
};

export default ExplorerModule;
