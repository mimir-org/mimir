import { InspectorContent } from ".";
import textResources from "../../../textResources";
import { useState } from "react";
import StyledInspectorComponent from "./styled/StyledInspectorComponent";
import StyledToggleButton from "./styled/StyledToggleButton";
import AnimatedComponent from "./styled/AnimatedContent";

const InspectorComponent = () => {
  const [showInspector, setShowInspector] = useState(true);

  const handleClick = () => {
    setShowInspector(!showInspector);
  };

  return showInspector ? (
    <>
      <StyledToggleButton onClick={handleClick} height="346">
        {textResources.Inspector_Close}
      </StyledToggleButton>
      <StyledInspectorComponent height="346">
        <InspectorContent />
      </StyledInspectorComponent>
    </>
  ) : (
    <>
      <StyledToggleButton onClick={handleClick} height="0">
        {textResources.Inspector_Open}
      </StyledToggleButton>
      <AnimatedComponent height="0">
        <InspectorContent />
      </AnimatedComponent>
    </>
  );
};

export default InspectorComponent;
