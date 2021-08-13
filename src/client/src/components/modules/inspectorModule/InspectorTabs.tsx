import { InspectorComponent } from ".";
import { EdgeAdminComponent, EdgeInspectorComponent } from "./edgeInspector";
import { Project, Node } from "../../../models";
import { AdminComponent } from "./tabs";

interface Props {
  project: Project;
  node: Node;
}

const InspectorTabs = ({ project, node }: Props) => {
  const edges = project?.edges ?? [];
  let edge = edges.find((x) => x.isSelected);

  return (
    <>
      {node && (
        <>
          <AdminComponent node={node} project={project} index={0} />
          <InspectorComponent node={node} index={1} project={project} />
          <InspectorComponent node={node} index={2} project={project} />
          <InspectorComponent node={node} index={3} project={project} />
        </>
      )}
      {edge && (
        <>
          <EdgeAdminComponent edge={edge} project={project} index={0} />
          <EdgeInspectorComponent edge={edge} index={1} />
        </>
      )}
    </>
  );
};

export default InspectorTabs;
