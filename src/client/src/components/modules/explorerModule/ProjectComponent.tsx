import red from "../../../redux/store";
import { AspectComponent } from "./aspectComponent/AspectComponent";
import { IsAspectNode, IsProduct } from "../../flow/helpers/common";
import { IsBlockView } from "../../flow/helpers/block";

export const ProjectComponent = () => {
  const project = red.store.getState().projectState.project;
  const nodes = project?.nodes ?? [];

  return (
    <>
      {!IsBlockView()
        ? nodes.map((_, i: number) => {
            if (IsAspectNode(nodes[i])) {
              return (
                <AspectComponent
                  key={i}
                  node={nodes[i]}
                  label={nodes[i].label}
                />
              );
            }
            return null;
          })
        : nodes.map((_, i: number) => {
            if (IsAspectNode(nodes[i]) && !IsProduct(nodes[i])) {
              return (
                <AspectComponent
                  key={i}
                  node={nodes[i]}
                  label={nodes[i].label}
                />
              );
            }
            return null;
          })}
    </>
  );
};

export default ProjectComponent;
