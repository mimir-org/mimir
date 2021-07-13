import { AspectComponent } from "./aspectComponent/AspectComponent";
import { IsAspectNode, IsProduct } from "../../flow/helpers/common";
import { IsBlockView } from "../../flow/helpers/block";
import { Project } from "../../../models";

interface Props {
  project: Project;
}

export const ProjectComponent = ({ project }: Props) => {
  const nodes = project?.nodes ?? [];

  return (
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
};

export default ProjectComponent;
