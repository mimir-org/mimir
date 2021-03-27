import { InspectorHeader } from ".";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { ToggleInspectorButton } from "../../../assets/buttons";
import { useState } from "react";
import { EyeIcon } from "../../../assets";
import { IconWrapper } from "./styled";
import textResources from "../../../textResources";
import {
  FragmentHeaderWrapper,
  StyledInspectorTitle,
} from "./fragments/styled";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

const InspectorModule = () => {
  const module = "inspector";
  const [showInspector, setShowInspector] = useState(
    loadStateFromStorage(module)
  );
  const handleClick = () => {
    saveStateToStorage(!showInspector, module);
    setShowInspector(!showInspector);
  };

  const startHeight = showInspector ? "0" : "290";
  const stopHeight = showInspector ? "290" : "38";

  return (
    <>
      <AnimatedMenu start={startHeight} stop={stopHeight}>
        <FragmentHeaderWrapper>
          <InspectorHeader />
          <ToggleInspectorButton
            visible={showInspector}
            onClick={handleClick}
          />
          <IconWrapper>
            <StyledInspectorTitle>
              {textResources.Inspector_Heading}
            </StyledInspectorTitle>
            <img src={EyeIcon} alt="inspector-icon" />
          </IconWrapper>
        </FragmentHeaderWrapper>
      </AnimatedMenu>
    </>
  );
};

export default InspectorModule;
