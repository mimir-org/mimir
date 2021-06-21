import { TabComponent, TabAdminComponent } from ".";
import { Project, Node } from "../../../models";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { IsBlockView } from "../../flow/helpers/block";

const InspectorTabs = () => {
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const nodes = project?.nodes ?? [];
  let node: Node;

  if (IsBlockView()) {
    node = nodes.find((node) => node.isBlockSelected);
  } else node = nodes.find((node) => node.isSelected);

  return (
    <>
      {node && (
        <>
          <TabAdminComponent node={node} project={project} index={0} />
          <TabComponent node={node} index={1} />
          <TabComponent node={node} index={2} />
          <TabComponent node={node} index={3} />
        </>
      )}
    </>
  );
};

export default InspectorTabs;
