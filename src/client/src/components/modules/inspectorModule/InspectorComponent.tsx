import { InspectorContent } from ".";
import textResources from "../../../textResources";
import { useState } from "react";
import {
  AnimatedMenuIn,
  AnimatedMenuOut,
  AnimatedButtonIn,
  AnimatedButtonOut,
} from "./styled/animated/";

const InspectorComponent = () => {
  const [showInspector, setShowInspector] = useState(true);

  const handleClick = () => {
    setShowInspector(!showInspector);
  };

  return showInspector ? (
    <>
      <AnimatedButtonIn onClick={handleClick} height="346">
        {textResources.Inspector_Close}
      </AnimatedButtonIn>
      <AnimatedMenuIn height="346">
        <InspectorContent />
      </AnimatedMenuIn>
    </>
  ) : (
    <>
      <AnimatedButtonOut onClick={handleClick} height="0">
        {textResources.Inspector_Open}
      </AnimatedButtonOut>
      <AnimatedMenuOut height="0">
        <InspectorContent />
      </AnimatedMenuOut>
    </>
  );
};

export default InspectorComponent;
