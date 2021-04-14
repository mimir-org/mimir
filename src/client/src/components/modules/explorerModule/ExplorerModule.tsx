import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { ExplorerIcon } from "../../../assets";
import ProjectComponent from "./projectComponent/ProjectComponent";
import { SwitchViewComponent } from "./switchviewComponent/SwitchViewComponent";
import textResources from "../../../textResources";
import { ToggleExplorerButton } from "../../../assets/buttons/index";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/LocalStorage";
import {
  HeaderWrapper,
  IconWrapper,
  ContentWrapper,
  ExplorerTitle,
  CollapsedIcon,
  FooterWrapper,
} from "./styled";

export const ExplorerModule = () => {
  const key = "explorer";
  const [isOpen, setIsOpen] = useState(loadStateFromStorage(key));
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    saveStateToStorage(!isOpen, key);
    setIsOpen(!isOpen);
    setAnimate(true);
  };
  const startHeight = isOpen ? "35" : "331";
  const stopHeight = isOpen ? "331" : "35";

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  );

  return (
    <AnimatedMenu start={startHeight} stop={stopHeight} run={animate}>
      <HeaderWrapper>
        <IconWrapper>
          <ExplorerTitle>{textResources.Explorer_view}</ExplorerTitle>
          <img src={ExplorerIcon} alt="explorerIcon" />
        </IconWrapper>
        <ToggleExplorerButton visible={isOpen} onClick={handleClick} />
      </HeaderWrapper>
      <CollapsedIcon visible={isOpen}>
        <img src={ExplorerIcon} alt="explorerIcon" />
      </CollapsedIcon>
      {hasProject && (
        <ContentWrapper visible={isOpen}>
          <ProjectComponent />
        </ContentWrapper>
      )}
      <FooterWrapper visible={isOpen}>
        <SwitchViewComponent />
      </FooterWrapper>
    </AnimatedMenu>
  );
};

export default ExplorerModule;
