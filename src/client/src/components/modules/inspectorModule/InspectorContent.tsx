import HeaderFragment from "./fragments/header/HeaderFragment";
import BodyFragment from "./fragments/body/BodyFragment";
import RelationsFragment from "./fragments/relations/RelationsFragment";
import InheritedFragment from "./fragments/inhereted/InheretedFragment";

const InspectorContent = () => {
  return (
    <div className="info_container">
      <HeaderFragment />
      <BodyFragment />
      <RelationsFragment />
      <InheritedFragment />
    </div>
  );
};

export default InspectorContent;
