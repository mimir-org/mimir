import { GetAttributes } from "./helpers";
import { TabComponent } from ".";
import { Attribute, Project } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const InspectorTabs = () => {
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const nodes = project ? project.nodes : [];
  const node = nodes.find((node) => node.isSelected);
  const nodeLabel = node ? node.label : "";

  let adminData: Attribute[] = [];
  let techData: Attribute[] = [];
  let relationData: Attribute[] = [];
  let index = 0;

  if (node) {
    adminData = GetAttributes(node, index++);
    techData = GetAttributes(node, index++);
    relationData = GetAttributes(node, index++);
  }

  return (
    <>
      <TabComponent attributes={adminData} index={0} nodeLabel={nodeLabel} />
      <TabComponent attributes={techData} index={1} />
      <TabComponent attributes={relationData} index={2} />
    </>
  );
};

export default InspectorTabs;
