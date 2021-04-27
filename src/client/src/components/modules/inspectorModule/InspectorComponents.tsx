import { GetNodes } from "../../flow/helpers";
import { Attribute, ATTRIBUTE_TYPE, Node } from "../../../models/project";
import { TabComponent } from "./";

const InspectorComponents = () => {
  const nodes = GetNodes();
  const node: Node = nodes.find((node) => node.isSelected);
  const nodeLabel: string = node !== undefined ? node.label : "";

  let attributesAdmin: Attribute[] = [];
  let attributesTech: Attribute[] = [];
  let attributesRelation: Attribute[] = [];

  if (node !== undefined) {
    attributesAdmin = node.attributes.filter(
      (x) => x.type === ATTRIBUTE_TYPE.ADMIN_INFO
    );

    attributesTech = node.attributes.filter(
      (x) => x.type === ATTRIBUTE_TYPE.TECH_INFO
    );

    attributesRelation = node.attributes.filter(
      (x) => x.type === ATTRIBUTE_TYPE.RELATIONS
    );
  }
  console.log(attributesAdmin);

  return (
    <>
      <TabComponent
        attributes={attributesAdmin}
        index={0}
        nodeLabel={nodeLabel}
      />
      <TabComponent attributes={attributesTech} index={1} />
      <TabComponent attributes={attributesRelation} index={2} />
    </>
  );
};

export default InspectorComponents;
