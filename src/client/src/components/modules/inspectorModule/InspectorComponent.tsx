import { InspectorContent } from ".";
import textResources from "../../../textResources";
import { useState } from "react";
import StyledInspectorComponent from "./styled/StyledInspectorComponent";
import StyledToggleButton from "./styled/StyledToggleButton";

const InspectorComponent = () => {
  const [showInspector, setShowInspector] = useState(true);

  const handleClick = () => {
    setShowInspector(!showInspector);
  };

  return showInspector ? (
    <>
      <StyledToggleButton onClick={handleClick} height="20">
        {textResources.Inspector_Close}
      </StyledToggleButton>
      <StyledInspectorComponent height="20">
        <InspectorContent />
      </StyledInspectorComponent>
    </>
  ) : (
    <>
      <StyledToggleButton onClick={handleClick} height="0.5">
        {textResources.Inspector_Open}
      </StyledToggleButton>
      <StyledInspectorComponent height="0">
        <InspectorContent />
      </StyledInspectorComponent>
    </>
  );
};

export default InspectorComponent;
