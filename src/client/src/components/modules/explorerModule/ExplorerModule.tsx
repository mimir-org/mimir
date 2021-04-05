import { projectData } from "./helpers/GetProjectData";
import { ExplorerIcon } from "../../../assets";
import FacilityComponent from "./facilityComponent/FacilityComponent";
import { SwitchViewComponent } from "./switchviewComponent/SwitchViewComponent";
import textResources from "../../../textResources";
import { ToggleExplorerButton } from "../../../assets/buttons/index";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import {
  HeaderWrapper,
  IconWrapper,
  ContentWrapper,
  ExplorerTitle,
  CollapsedIcon,
  FooterWrapper,
} from "./styled";
import { useState } from "react";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

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
      <ContentWrapper visible={isOpen}>
        <FacilityComponent
          name={projectData[0].name}
          id={projectData[0].id}
          aspect={projectData[0].aspect}
        />
      </ContentWrapper>
      <FooterWrapper visible={isOpen}>
        <SwitchViewComponent />
      </FooterWrapper>
    </AnimatedMenu>
  );
};

export default ExplorerModule;
