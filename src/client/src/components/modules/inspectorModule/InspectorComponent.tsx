import { InspectorContent } from ".";
import textResources from "../../../textResources";

const InspectorComponent = () => {
  return (
    <div className="inspector_container">
      <div className="heading">
        <p>{textResources.Treeview_Inspector_Heading}</p>
      </div>
      <InspectorContent />
    </div>
  );
};

export default InspectorComponent;
