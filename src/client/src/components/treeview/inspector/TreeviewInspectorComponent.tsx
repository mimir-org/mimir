import { TreeviewInspectorContent } from ".";
import textResources from "../../../textResources";

const InspectorComponent = () => {
  return (
    <div className="inspector_container">
      <div className="heading">
        {/* <p>Inspector</p> */}
        <p>{textResources.Heading_Inspector}</p>
      </div>
      <TreeviewInspectorContent />
    </div>
  );
};

export default InspectorComponent;
