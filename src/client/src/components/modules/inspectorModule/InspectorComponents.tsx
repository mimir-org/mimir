import { GetNodes } from "../../flow/helpers";
import { GetAttributes } from "./helpers";
import { TabComponent } from "./";
import { Attribute, ATTRIBUTE_TYPE } from "../../../models/project";

const InspectorComponents = () => {
  const nodes = GetNodes();
  const node = nodes.find((node) => node.isSelected);
  const nodeLabel = node !== undefined ? node.label : "";

  let adminData: Attribute[] = [];
  let techData: Attribute[] = [];
  let relationData: Attribute[] = [];

  if (node !== undefined) {
    adminData = GetAttributes(node, ATTRIBUTE_TYPE.ADMIN_INFO);
    techData = GetAttributes(node, ATTRIBUTE_TYPE.TECH_INFO);
    relationData = GetAttributes(node, ATTRIBUTE_TYPE.RELATIONS);
  }

  return (
    <>
      <TabComponent attributes={adminData} index={0} nodeLabel={nodeLabel} />
      <TabComponent attributes={techData} index={1} />
      <TabComponent attributes={relationData} index={2} />
    </>
  );
};

export default InspectorComponents;
