import { InspectorContent } from ".";
import textResources from "../../../textResources";
import { useState } from "react";
import { AnimatedMenu, AnimatedToggleButton } from "./styled/animated/";

const InspectorComponent = () => {
  const [showInspector, setShowInspector] = useState(true);

  const handleClick = () => {
    setShowInspector(!showInspector);
  };

  return showInspector ? (
    <>
      <AnimatedToggleButton onClick={handleClick} start="0" stop="346">
        {textResources.Inspector_Close}
      </AnimatedToggleButton>
      <AnimatedMenu start="0" stop="346">
        <InspectorContent />
      </AnimatedMenu>
    </>
  ) : (
    <>
      <AnimatedToggleButton onClick={handleClick} start="346" stop="0">
        {textResources.Inspector_Open}
      </AnimatedToggleButton>
      <AnimatedMenu start="346" stop="0">
        <InspectorContent />
      </AnimatedMenu>
    </>
  );
};

export default InspectorComponent;
