import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { ToggleInspectorButton } from "../../../assets/buttons";
import { useState } from "react";
import { EyeIcon } from "../../../assets";
import { IconWrapper } from "./styled";
import textResources from "../../../textResources";
import { FragmentHeaderWrapper } from "./fragments/styled";
import { InspectorTitle } from "./styled";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";
import InspectorComponents from "./InspectorComponents";

const InspectorModule = () => {
  const key = "inspector";
  const [showInspector, setShowInspector] = useState(loadStateFromStorage(key));
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    saveStateToStorage(!showInspector, key);
    setShowInspector(!showInspector);
    setAnimate(true);
  };

  const startHeight = showInspector ? "38" : "290";
  const stopHeight = showInspector ? "290" : "38";

  return (
    <>
      <AnimatedMenu start={startHeight} stop={stopHeight} run={animate}>
        <FragmentHeaderWrapper>
          <InspectorComponents />
          <ToggleInspectorButton
            visible={showInspector}
            onClick={handleClick}
          />
          <IconWrapper>
            <InspectorTitle>{textResources.Inspector_Heading}</InspectorTitle>
            <img src={EyeIcon} alt="inspector-icon" />
          </IconWrapper>
        </FragmentHeaderWrapper>
      </AnimatedMenu>
    </>
  );
};

export default InspectorModule;
