import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AnimatedMenu from "./styled/animated/AnimatedMenu";
import { useState } from "react";
import { EyeIcon, ToggleIconDown } from "../../../assets";
import { IconWrapper, ToggleButtonWrapper } from "./styled";
import textResources from "../../../textResources";
import { TabHeaderWrapper } from "./styled";
import { InspectorTitle } from "./styled";
import InspectorComponents from "./InspectorComponents";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";

const InspectorModule = () => {
  const key = "inspector";
  const [showInspector, setShowInspector] = useState(loadStateFromStorage(key));
  const [animate, setAnimate] = useState(false);

  const hasProject = useSelector<RootState>(
    (state) => state.projectState.project !== null
  );

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
        <TabHeaderWrapper>
          {hasProject && <InspectorComponents />}
          <ToggleButtonWrapper>
            {showInspector ? (
              <img
                src={ToggleIconDown}
                alt="toggle-icon"
                onClick={handleClick}
              />
            ) : (
              <img
                src={ToggleIconDown}
                alt="toggle-icon"
                onClick={handleClick}
              />
            )}
          </ToggleButtonWrapper>

          <IconWrapper>
            <InspectorTitle>{textResources.Inspector_Heading}</InspectorTitle>
            <img src={EyeIcon} alt="inspector-icon" />
          </IconWrapper>
        </TabHeaderWrapper>
      </AnimatedMenu>
    </>
  );
};

export default InspectorModule;
