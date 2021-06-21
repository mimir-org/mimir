import red from "../../../redux/store";
import { AspectComponent } from "./aspectComponent/AspectComponent";
import { IsAspectNode, IsProduct } from "../../flow/helpers/common";
import { IsBlockView } from "../../flow/helpers/block";
import { Node } from "../../../models";

export const ProjectComponent = () => {
  const project = red.store.getState().projectState.project;
  const nodes = (project?.nodes as Node[]) ?? [];

  return (
    <>
      {nodes.map((node) => {
        if (IsAspectNode(node)) {
          if (IsBlockView() && IsProduct(node)) return null;
          return (
            <AspectComponent key={node.id} node={node} label={node.label} />
          );
        }
        return null;
      })}
    </>
  );
};

export default ProjectComponent;
