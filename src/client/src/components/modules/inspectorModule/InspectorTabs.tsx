import { TabComponent, TabAdminComponent } from ".";
import { TabEdgeAdminComponent, TabEdgeComponent } from "./edgeInspector";
import { Project, Node } from "../../../models";
import { IsBlockView } from "../../flow/helpers/block";
import { FindSelectedNode } from "../../flow/helpers/common";

interface Props {
  project: Project;
}

const InspectorTabs = ({ project }: Props) => {
  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  let node: Node;
  let edge = edges.find((x) => x.isSelected);

  if (IsBlockView()) {
    node = nodes.find((x) => x.isBlockSelected);
  } else node = FindSelectedNode();

  return (
    <>
      {node && (
        <>
          <TabAdminComponent node={node} project={project} index={0} />
          <TabComponent node={node} index={1} />
          <TabComponent node={node} index={2} />
          <TabComponent node={node} index={3} />
          {/* <TabComponent node={node} index={4} /> //NOTE: comments-tab is not for MVP-release. To be implemented later. */}
        </>
      )}
      {edge && (
        <>
          <TabEdgeAdminComponent edge={edge} project={project} index={0} />
          <TabEdgeComponent edge={edge} index={1} />
        </>
      )}
    </>
  );
};

export default InspectorTabs;
