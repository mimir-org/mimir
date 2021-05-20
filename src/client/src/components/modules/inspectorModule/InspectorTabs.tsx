import { TabComponent, TabAdminComponent } from ".";
import { Attribute, Project, Node } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const InspectorTabs = () => {
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const nodes = project ? project.nodes : [];
  const node = nodes.find((node) => node.isSelected) as Node;

  let techData: Attribute[] = [];
  let relationData: Attribute[] = [];

  if (node) {
    techData = node.attributes;
    relationData = [];
  }

  return (
    <>
      <TabAdminComponent node={node} project={project} index={0} />
      <TabComponent attributes={techData} index={1} />
      <TabComponent attributes={relationData} index={2} />
    </>
  );
};

export default InspectorTabs;
