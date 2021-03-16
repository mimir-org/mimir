import { InspectorContent } from ".";
import textResources from "../../../textResources";

const InspectorComponent = () => {
  return (
    <div className="inspector_container">
      <div className="heading">
        <p>{textResources.Inspector_Heading}</p>
      </div>
      <InspectorContent />
    </div>
  );
};

export default InspectorComponent;
