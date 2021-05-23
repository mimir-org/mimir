import { TabComponent, TabAdminComponent } from ".";
import { Project, Node } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const InspectorTabs = () => {
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const nodes = project?.nodes ?? [];
  const node = nodes.find((node) => node.isSelected) as Node;

  return (
    <>
      {node && (
        <>
          <TabAdminComponent node={node} project={project} index={0} />
          <TabComponent node={node} index={1} />
          <TabComponent node={node} index={2} />
        </>
      )}
    </>
  );
};

export default InspectorTabs;
