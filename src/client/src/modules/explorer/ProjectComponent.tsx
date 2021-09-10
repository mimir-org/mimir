import { Project, Node } from "../../models";
import { AspectComponent } from "./aspectComponent/AspectComponent";
import { IsAspectNode, IsProduct } from "../../components/flow/helpers/common";
import { IsBlockView } from "../../components/flow/helpers/block";

interface Props {
  project: Project;
  nodes: Node[];
}

export const ProjectComponent = ({ project, nodes }: Props) => (
  <>
    {nodes.map((node) => {
      if (IsAspectNode(node)) {
        if (IsBlockView() && IsProduct(node)) return null;
        return (
          <AspectComponent
            key={node.id}
            node={node}
            label={node.label}
            project={project}
          />
        );
      }
      return null;
    })}
  </>
);

export default ProjectComponent;
